import React, {useState, useEffect,useContext } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from "chart.js";
import { Grid } from "@material-ui/core";
import { UserContext } from './Context';

Chart.plugins.unregister(ChartDataLabels);


function Categorybarmn(props) {
  
  const {monthval,yearval,year,transactionState,setTransactionState}=useContext(UserContext);
  const [Data, setData] = useState({labels:'',
                                     datasets:[ {
                                      data: '',
                                      borderColor: '',
                                      backgroundColor:'' } ] });


  // const [errorMessage, seterrorMessage] = useState('');
  console.log(monthval,yearval,year);

  useEffect(() => {
    const fetchData=async()=>{
    const response = await axios.get(props.api,{params:{userId: props.message,year:yearval,month:monthval,YEAR:year}});
    console.log(response);
    
    let category=[];
    let amount = [];
    Array.from(response.data).forEach(element => {
          category.push(element.CATEGORY_NAME);
          amount.push(element.SUMAMOUNT);
        });

    setData({...Data, 
        labels:category,
        datasets:[
           {
            data: amount,
            borderColor: '  rgb(255, 255, 255)',
            backgroundColor:"#F35B8C"
           }
        ]
     
     });
     console.log(Data);
     setTransactionState(false);
    };
   fetchData();},[monthval,yearval,year,transactionState]);
       
     return(
      
      <Grid>
          <HorizontalBar
            data = {Data}
            options = {chartoptions} 
            width= {350}
            height={100} 
            plugins={[ChartDataLabels]}/>
        
        </Grid>
      )
   }
   export default Categorybarmn; 


const chartoptions = {
  tooltips:{
    yPadding : 0.1,
    xPadding  : 0.1
},
barValueSpacing : 1,       
barDatasetSpacing : 1,
   legend: {
    display: false,
 },
  scales:{
    xAxes:[{
      ticks: {
          display: false,
          beginAtZero : true
      },
      responsive: true,
      gridLines: {
          display:false,
          color: "rgba(0, 0, 0, 0)"
      }
  }],
      yAxes:[{
    
        ticks: {
            display: false,
            beginAtZero : true,
            //padding: -680,
            fontSize: 15,
            
        },
        categoryPercentage: 0.8,
        barPercentage: 1,
         minBarLength: 2,
        gridLines: {
            display:false,
            color: "rgba(0, 0, 0, 0)"
        }   
    }]
},
plugins: {
  datalabels: {
    align: function(context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      return value < 1 ? 'right' : null
    },
    anchor: 'end',
    backgroundColor: null,
    borderColor: null,
    borderRadius: 4,
    borderWidth: 1,
    color: '#000000',
    font: {
      size: 15,
      weight: 300
    },
    offset: 4,
   
    formatter: function(value, context) {
      return context.chart.data.labels[context.dataIndex];
    }
  }
}


}