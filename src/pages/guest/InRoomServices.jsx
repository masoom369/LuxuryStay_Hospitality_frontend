import { useState, useEffect } from "react";
import { Utensils, Users, ShoppingCart, Loader, AlertCircle, Trash, Plus, Minus } from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const InRoomServices = () => {
  const {
    fetchRoomServiceMenu,
    fetchAdditionalServices,
    placeRoomServiceOrder,
    placeServiceRequest
  } = useDashboardContext();

  const [activeTab, setActiveTab] = useState('roomService');
  const [cart, setCart] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [customTime, setCustomTime] = useState('');
  const [roomServiceItems, setRoomServiceItems] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [menuData, servicesData] = await Promise.all([
        fetchRoomServiceMenu(),
        fetchAdditionalServices()
      ]);
      
      setRoomServiceItems(menuData);
      setAdditionalServices(servicesData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem._id === item._id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item._id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const orderData = {
        items: cart.map(item => ({
          itemId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        notes: orderNote,
        deliveryTime: deliveryTime === 'custom' ? customTime : deliveryTime,
        totalAmount: calculateTotal()
      };

      if (activeTab === 'roomService') {
        await placeRoomServiceOrder(orderData);
      } else {
        await placeServiceRequest(orderData);
      }

      alert('Order placed successfully! It will be delivered to your room.');
      setCart([]);
      setOrderNote('');
      setDeliveryTime('asap');
      setCustomTime('');
    } catch (err) {
      setError(err.message);
      alert('Failed to place order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderRoomService = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-accent" size={48} />
        </div>
      );
    }

    if (roomServiceItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No room service items available at the moment.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomServiceItems.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category || 'Food & Beverage'}</p>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  )}
                </div>
                <span className="font-medium text-accent">${item.price.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm flex items-center"
                >
                  <Plus size={14} className="mr-1" />
                  Add to Order
                </button>
                {item.availability === false && (
                  <span className="text-xs text-red-600">Currently Unavailable</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAdditionalServices = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-accent" size={48} />
        </div>
      );
    }

    if (additionalServices.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No additional services available at the moment.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {additionalServices.map(service => (
          <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                </div>
                <span className="font-medium text-accent">
                  {service.price > 0 ? `$${service.price.toFixed(2)}` : 'Free'}
                </span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => addToCart(service)}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm flex items-center"
                >
                  <Plus size={14} className="mr-1" />
                  Request Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">In-Room Services</h2>
          <button
            onClick={loadServices}
            disabled={loading}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md flex items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Loading...
              </>
            ) : (
              'Refresh'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('roomService')}
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'roomService'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Utensils className="w-4 h-4 mr-2" />
              Room Service
            </div>
          </button>
          <button
            onClick={() => setActiveTab('additionalServices')}
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'additionalServices'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Additional Services
            </div>
          </button>
        </div>

        {/* Content based on active tab */}
        <div>
          {activeTab === 'roomService' && renderRoomService()}
          {activeTab === 'additionalServices' && renderAdditionalServices()}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-primary text-accent flex items-center">
                <ShoppingCart className="mr-2" size={24} />
                Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h3>
              <button
                onClick={() => setCart([])}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                    <span className="font-medium text-accent w-20 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-accent text-lg">${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions</label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Any special instructions for delivery..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                >
                  <option value="asap">As soon as possible</option>
                  <option value="30min">In 30 minutes</option>
                  <option value="60min">In 1 hour</option>
                  <option value="custom">Custom time</option>
                </select>
              </div>

              {deliveryTime === 'custom' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Time</label>
                  <input
                    type="datetime-local"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
              )}

              <button
                onClick={placeOrder}
                disabled={submitting}
                className="w-full bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-6 rounded-md tracking-widest disabled:opacity-50 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <Loader className="animate-spin mr-2" size={16} />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InRoomServices;