import { useState } from "react";
import { Coffee, Utensils, Car, Users, ShoppingCart, Star, Clock, MapPin, Shirt, Wrench, Phone, Newspaper, Footprints } from "lucide-react";

const InRoomServices = () => {
  const [activeTab, setActiveTab] = useState('roomService');
  const [cart, setCart] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('asap');

  const roomServiceItems = [
    { id: 1, name: 'Continental Breakfast', price: 25.00, category: 'Breakfast', image: '/placeholder-food.jpg' },
    { id: 2, name: 'Full English Breakfast', price: 32.00, category: 'Breakfast', image: '/placeholder-food.jpg' },
    { id: 3, name: 'Club Sandwich', price: 18.50, category: 'Lunch', image: '/placeholder-food.jpg' },
    { id: 4, name: 'Caesar Salad', price: 16.00, category: 'Lunch', image: '/placeholder-food.jpg' },
    { id: 5, name: 'Grilled Salmon', price: 35.00, category: 'Dinner', image: '/placeholder-food.jpg' },
    { id: 6, name: 'Ribeye Steak', price: 42.00, category: 'Dinner', image: '/placeholder-food.jpg' },
    { id: 7, name: 'Chocolate Cake', price: 12.00, category: 'Dessert', image: '/placeholder-food.jpg' },
    { id: 8, name: 'Fresh Fruit Platter', price: 14.50, category: 'Dessert', image: '/placeholder-food.jpg' }
  ];

  const additionalServices = [
    { id: 1, name: 'Laundry Service', price: 15.00, description: 'Per bag of laundry', icon: <Shirt size={20} /> },
    { id: 2, name: 'Dry Cleaning', price: 12.00, description: 'Per item', icon: <Wrench size={20} /> },
    { id: 3, name: 'Ironing Service', price: 8.00, description: 'Per item', icon: <Wrench size={20} /> },
    { id: 4, name: 'Shoe Shine', price: 10.00, description: 'Per pair', icon: <Footprints size={20} /> },
    { id: 5, name: 'Wake-up Call', price: 0.00, description: 'Free service', icon: <Phone size={20} /> },
    { id: 6, name: 'Newspaper Delivery', price: 5.00, description: 'Daily newspaper', icon: <Newspaper size={20} /> }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    console.log('Placing order:', { cart, orderNote, deliveryTime });
    alert('Order placed successfully! It will be delivered to your room.');
    setCart([]);
    setOrderNote('');
  };

  const renderRoomService = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roomServiceItems.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <span className="font-medium text-accent">${item.price.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => addToCart(item)}
                className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm"
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdditionalServices = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {additionalServices.map(service => (
        <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{service.icon}</span>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
              </div>
              <span className="font-medium text-accent">
                {service.price > 0 ? `$${service.price.toFixed(2)}` : 'Free'}
              </span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => addToCart(service)}
                className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm"
              >
                Request Service
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">In-Room Services</h2>
        </div>

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
            <h3 className="text-xl font-primary text-accent mb-4">Your Order</h3>
            
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2"
                    >
                      +
                    </button>
                    <span className="font-medium text-accent">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Remove
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

              <button
                onClick={placeOrder}
                className="w-full bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-6 rounded-md tracking-widest"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InRoomServices;