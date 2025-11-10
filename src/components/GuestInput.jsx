const GuestInput = ({ value, onChange, max }) => {
  const handleGuestsChange = (e) => {
    const val = parseInt(e.target.value) || 1;
    if (val <= max && val >= 1) {
      onChange(val);
    } else if (val > max) {
      onChange(max);
    } else {
      onChange(1);
    }
  };

  return (
    <div className='relative h-full'>
      <input
        type="number"
        className='w-full h-full px-4 appearance-none bg-transparent border-none focus:outline-none text-center'
        style={{ 
          MozAppearance: 'textfield' // Remove arrows in Firefox
        }}
        value={value}
        min="1"
        max={max}
        onChange={handleGuestsChange}
        placeholder={`1-${max}`}
      />
      <style>{`
        input[type=number] {
          -moz-appearance: textfield;
        }
        
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default GuestInput;