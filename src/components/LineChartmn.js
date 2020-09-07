import React, {useState, useEffect,useContext } from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { Grid } from "@material-ui/core";
import { UserContext } from './Context';

function LineChartmn(props) {

  const {monthval,yearval,year,transactionState,setTransactionState}=useContext(UserContext);
  const [Data, setData] = useState({labels:'',
                                     datasets:[ { data:'',
                                     fill: '',
                                     lineTension: 0,
                                     backgroundColor: '',
                                     borderColor: "",
                                     pointBorderColor : '',
                                     borderWidth: '', } ] });


  // const [errorMessage, seterrorMessage] = useState('');
  

  useEffect(() => {
    const fetchData=async()=>{
    const response = await axios.get(props.api,{params:{userId: props.message,year:yearval,month:monthval,YEAR:year}});
    console.log(response);
    console.log(response.data);
    let label=[];
    let amount = [];
    Array.from(response.data).forEach(element => {
          label.push(element.label);
          amount.push(element.TotalExpense); });

    setData({...Data, 
        labels:label,
        datasets:[
           {
              data: amount,
              fill: false,
              lineTension: 0,
              backgroundColor: '#ffffff',
              borderColor: "#F35B8c",
              pointBorderColor : '#000000',
              borderWidth: 2,
            
           }
        ]
     
     });
     console.log(Data);
     setTransactionState(false);
    };
   fetchData();},[monthval,yearval,year,transactionState]);


    return (
    
      <Grid>
        <Line 
        data={Data} 
        options={chartoptions} />
      
      </Grid>
    );
}
export default LineChartmn; 

const chartoptions = {
  
    legend: {
      display: false,
   },
    scales: {
        xAxes: [{
          gridLines: {
              display: true,
              drawBorder: true, drawOnChartArea: false
          }
      }],
        yAxes: [{
            display: false,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              drawBorder: false,
            }   
        }]
    },
    responsive: true,
}
