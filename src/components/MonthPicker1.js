// import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import React, {useContext, useState, useRef } from 'react';
// import { Grid } from '@material-ui/core';
// import Icon from '@material-ui/core/Icon';
// import Picker from 'react-month-picker';
// import './Date.css';
// import {UserContext} from './Context';




//   function MonthBox(props) {

//     const [value,setValue]=useState(props.value || 'N/A');
    
//     const componentWillReceiveProps=(nextProps)=>{
//     setValue(nextProps.value || 'N/A')
//     };

//    const  _handleClick=(e)=> {
//       props.onClick && props.onClick(e);
//     }

  
//       return (
    
//         <Grid item  alignItems="flex-start" justify="flex-end" direction="row" onClick={_handleClick}>
//             <ArrowLeftIcon style={{fill: "#A4A1FB"}}/>
//             <Icon>{value}</Icon> <ArrowRightIcon style={{fill: "#A4A1FB"}}/>
//         </Grid>
//       );
    

   
// }


// function YearMonthPicker(props) {

//   const {monthval,yearval,setMonthval,setYearval}=useContext(UserContext);

//   let [mvalue,setMvalue]=useState({year:new Date().getFullYear(),month:new Date().getMonth()+1});

//   const[value,setValue]=useState(0);
//   const pickAMonth = useRef(mvalue);

//   const componentWillReceiveProps=(nextProps)=>
//     {
//       setValue(nextProps.value || 'N/A');
//      };
//   const pickerLang = {months : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']};
//   const makeText = (m) => {
//           if (m && m.year && m.month) 
//           return (pickerLang.months[m.month-1] + ' ' + m.year)
//           return '?' };

//   const handleAMonthDissmis=(value)=> {
//     console.log(value); 
//   let newv = {year:new Date().getFullYear(),month:new Date().getMonth()+2};
//    setMvalue(newv);
//    setMonthval(value.month);
//    setYearval(value.year);
 
//   };
//     // const {year,month}=value;
//     // setMvalue(prevState=>({...prevState, 
//     //                         year: year,
//     //                        month: month}));
//         //  const monthval = value.month.useContext(DateContext); 
//         //  const yearval = value.year.useContext(DateContext);
            
//   const handleClickMonthBox=(e)=> { pickAMonth.current.show();};
//   const handleAMonthChange=(value,text) =>
//   { 
//   //  let nevalue={year:new Date().getFullYear(),month:new Date().getMonth()+2};
//   //   console.log(value);
//   //   setMvalue(nevalue);

//   };
  
//   return (
//            <Grid> 
//                 <Picker ref={pickAMonth}
//                           years={[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]}
//                           value={mvalue}
//                           lang={pickerLang.months}
//                           onChange= {{handleAMonthChange}}
//                           onDismiss={handleAMonthDissmis}>
//                           <MonthBox value={makeText(mvalue)} onClick={handleClickMonthBox} />
//                       </Picker>
//                       {/* </DateConsumer> */}
//                    </Grid>
//       );
      
// };
// export default YearMonthPicker;

import React, {useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import { UserContext} from './Context';
import "react-datepicker/dist/react-datepicker.css";


function YearMonthPicker(props) {
    
    const [startDate, setStartDate] = useState(new Date());
    const {setMonthval,setYearval}=useContext(UserContext);

  const handleChange = date => {
    setStartDate(date);
    setMonthval(date.getMonth()+1);
    setYearval(date.getYear()+ 1900);
    console.log(date.getMonth()+1);
    console.log(date.getYear()+ 1900);
  };


    return (
      <DatePicker 
      selected={startDate}
      onChange={handleChange}
      dateFormat="MMMM yyyy"
      showMonthYearPicker
      />
    );
  
}
export default YearMonthPicker;

