import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/datepicker.css';

const CheckIn = ({ selectedDate, onDateChange }) => {
  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <div><Calendar className='text-accent text-base' /></div>
      </div>
      <DatePicker
        className='w-full h-full px-4'
        selected={selectedDate}
        placeholderText='Check-in'
        onChange={(date) => onDateChange(date)}
        minDate={new Date()}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default CheckIn;