import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/datepicker.css';

const CheckOut = ({ selectedDate, onDateChange, startDate }) => {
  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <div><Calendar className='text-accent text-base' /></div>
      </div>
      <DatePicker
        className='w-full h-full px-4'
        selected={selectedDate}
        placeholderText='Check-out'
        onChange={(date) => onDateChange(date)}
        minDate={startDate ? new Date(startDate) : new Date()}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default CheckOut;