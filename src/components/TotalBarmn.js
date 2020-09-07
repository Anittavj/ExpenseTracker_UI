import React, {useState, useEffect,useContext} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Grid } from "@material-ui/core";
//import * as API from '../constants/Api';
import { UserContext } from './Context';

function TotalBarmn(props){
  const {monthval,yearval,year,transactionState,setTransactionState}=useContext(UserContext);
  const [Data, setData] = useState({labels:[],
                                     datasets:[ { data:'',
                                                   borderColor:'',
                                                   backgroundColor:[] } ] });
                                                   console.log(transactionState);
 // const [errorMessage, seterrorMessage] = useState('');

  
//  const endpoint = this.props.month ?API.TOTALMN_ENDPT:API.TOTALYR_ENDPT; 
//         // const api_url=API.BAR_URL + endpoint;
//         // const params= {userId: this.props.message, year:this.props.year};
//         // if (this.props.month){
//         //   params.month=this.props.month;
//         // }

  useEffect(() => {
    
    
    const fetchData=async()=>{

    const response = await axios.get(props.api,{params:{userId: props.message,year:yearval,month:monthval,YEAR:year}});
    console.log(response);
    console.log(response.data);
    let amount=[];
    amount.push(response.data.TotalIncome);
    amount.push(response.data.TotalExpense);
    console.log(amount);

    setData({...Data, 
        labels:['Income','Expense'],
        datasets:[
           {
              data: amount,
              borderColor: '  rgb(255, 255, 255)',
              backgroundColor:["#69B5FF","#F35B8c"]
            
           }
        ]
        
     });
     setTransactionState(false);
     console.log(Data);
  };

  console.log(transactionState);
  fetchData();},[monthval,yearval,year,transactionState]);
    
     return(
      <Grid>
        <datapass></datapass>
          <HorizontalBar
            data = {Data}
            options = {chartoptions}
            width= {400} 
            plugins={[ChartDataLabels]} />
            </Grid>
      );
    
}
export default TotalBarmn;  

const chartoptions = {

  tooltips:{
    yPadding : 0.1,
    xPadding  : 0.1
},
barValueSpacing : 1,       
barDatasetSpacing : 1,

responsive: true,
   legend: {
    display: false,
 },
  scales:{
    xAxes:[{
      categorySpacing: 0,
      ticks: {
        display:false,
        beginAtZero: true
    },
  gridLines:{
    display:false,
    color: "rgba(0, 0, 0, 0)"
  }
}],
      yAxes:[{
        barPercentage: 0.9,
          
          ticks: {
              display:false,
              backdropPaddingX: -10,
              beginAtZero: true
             
          },
          categoryPercentage: 1,
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
    anchor: 'start',
    backgroundColor: null,
    borderColor: null,
    borderRadius: 4,
    borderWidth: 1,
    color: '#ffffff',
    font: {
      size: 25,
      weight: 600
    },
    offset: 4,
    padding: 0,
    formatter: function(value) {
      return Math.round(value * 10) / 10
    }
  }
}
}

 
// .catch(error => {console.log(error)
//   seterrorMessage({errorMessage:"Error in retrieving data"});
// });
// },[]);