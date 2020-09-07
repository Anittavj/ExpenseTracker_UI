import React, {useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import { UserContext} from './Context';
import "react-datepicker/dist/react-datepicker.css";

function YearPickerComp(props) {
    
    const [startDate, setStartDate] = useState(new Date());
    const {setYear}=useContext(UserContext);
    
  const handleChange = date => {
    setStartDate(date);
    setYear(date.getYear()+ 1900);
    console.log(date.getYear()+ 1900);
  };


    return (
      <DatePicker
      selected={startDate}
      onChange={handleChange}
      showYearPicker
      dateFormat="yyyy"
      />
    );
  
}
export default YearPickerComp;

