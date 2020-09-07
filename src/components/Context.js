import React, {createContext, useState} from "react";
const UserContext = createContext();


const UserProvider = (props) => {

 const [transactionState, setTransactionState] = useState(false);
 const [monthval, setMonthval] = useState(new Date().getMonth()+1);
 const [yearval, setYearval] = useState(new Date().getFullYear());
 const [year, setYear] = useState(new Date().getFullYear());
 const[catName, setCatname] = useState('');
 const[selex, setSelex] = useState('');
 const[opend, setOpend] = useState(false);    //open expense category drawer
 const[openi, setOpeni] = useState(false);    //open incomecategory drawer


 return (
   <UserContext.Provider value={{
     transactionState,monthval,
             yearval,
             year,catName,setCatname,selex,setSelex,opend,setOpend,openi,setOpeni,
             setTransactionState,
             setMonthval,
             setYearval,
             setYear   
           }}>
     {props.children}
   </UserContext.Provider>
 );
}
export { UserContext, UserProvider };



