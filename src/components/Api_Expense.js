import React, {useState, useEffect,useContext } from 'react';
import './card.css';
import axios from 'axios';
import Cards from './Cards';
import * as API from '../constants/Api';
import {UserContext} from './Context';


export default function Expense(props){

    const[items,setItems]=useState([]);
    const {transactionState,setTransactionState}=useContext(UserContext);
    

    useEffect(() => {
        var  parts;
        let months={"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June",
        "07":"July","08":"August","09":"September","10":"October","11":"November","12":"December"};

        
            const fetchData=async()=>{

                if(props.dataA ){
                const response = await axios.get(API.GET_EXPENSE,{ params: {userId:props.message}});
                for (var key in response.data) {
                    parts=response.data[key].DATE.split("-");
                    response.data[key].DATE = parts[2]+' '+months[parts[1]]+', '+parts[0]
                    response.data[key].AMOUNT = response.data[key].AMOUNT.toFixed(2);
                    response.data[key]["colour"]="#F35B8C";
                }
                setItems(response.data);
                setTransactionState(false);}

                if (props.dataB ){
                    
                          const res = await axios.get(API.GET_INCOME,{ params: {userId:props.message}});
                          for (var key1 in res.data) {
                            parts=res.data[key1].DATE.split("-");
                            res.data[key1].DATE = parts[2]+' '+months[parts[1]]+', '+parts[0]
                            res.data[key1].AMOUNT = res.data[key1].AMOUNT.toFixed(2);
                            res.data[key1]["colour"]="#F35B8C";
                            setTransactionState(false);}

                        setItems(res.data);
                        }
                
                if(props.dataBoth ){
                     
                                const res = await axios.get(API.GET_INCOME_EXPENSE,{ params: {userId:props.message}});
                                        for (var key2 in res.data) {
                                            parts=res.data[key2].DATE.split("-");
                                            res.data[key2].DATE = parts[2]+' '+months[parts[1]]+', '+parts[0]
                                            res.data[key2].AMOUNT = res.data[key2].AMOUNT.toFixed(2);
                                            res.data[key2]["colour"]="#F35B8C";
                                        }
                                        setItems(res.data); 
                                        console.log(res);
                                        setTransactionState(false);}
             
            };
            fetchData();
},[transactionState]);

return(
         
    <div>   
        <Cards items={items}/>
    </div>
    
   )
}
