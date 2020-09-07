import React, {useContext, useState} from 'react';
import axios from 'axios';
import {TextField,Button} from '@material-ui/core/';
import './Style.css';
import { makeStyles} from '@material-ui/core/styles';
//import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { Icon } from 'semantic-ui-react';
import * as API from '../constants/Api';
import {UserContext} from './Context';

var newDate = new Date();
var moment = require('moment');
var dateIn = moment(newDate);
var formatedDate=dateIn.format("YYYY-MM-DD");


//Adding js styles
const useStyles = makeStyles( (theme) => ({
  container: {
      display: 'flex',    
      flexWrap: 'wrap',
      height: "100%",
  },
  datepickerx:{
      width: "35%",
      marginLeft: "20%",
      underline: {
          "&&&:before": {
          color: "white"
          },
          "&&:after": {
          color: "white"
          }
          },
          '&& .MuiInput-root:hover::before': {
              borderColor: 'white',
          },
          '& .MuiInput-input':{ color: "white"},
       
          color: "white",
          textEmphasisColor: "white",
          '& .MuiInput-underline:before': {
          borderBottomColor: "white",
          '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
          },
          '& .MuiInput-underline:before': {
              borderBottomColor: 'white',
          },
          multilineColor:{
              color:'white'
          },
          '& label.Mui-focused': {
              color: 'white',
          },
          '& label': {
              color: 'white',
          },
          '&:hover fieldset': {
              borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
              borderColor: 'white',
          },
          
          
          },
      },
  Button:{
      marginLeft:"1%",
      marginRight: "1%",
      background: 'grey',
      border: 0,
      borderRadius: 3,
      color: "white",
      padding:"3%",
      width:"90%",
      marginTop:"7%",
      textTransform: 'none',
      backgroundColor: '#37364b',
      borderColor: '#007bff',
      '&:hover': {
      backgroundColor: 'black',
      borderColor: '#0062cc',
      },
      '&:active': {
      boxShadow: 'none',
      backgroundColor: 'black',
      borderColor: '#005cbf',
      
      },
      '&:focus': {
      boxShadow: 'black',
      },
      
      
  },
  textField: {
    marginLeft:"1%",
    marginRight: "1%",
    width:"90%",
    paddingTop: "1%",
    marginTop: "4%",
    color: "white",
    '& .MuiInput-input':{ color: "white"},
    multilineColor:{
    color:'white'
    },
    '& label.Mui-focused': {
    color: 'white',
    },
    '& label': {
    color: 'white',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
    },
    
    '&:hover fieldset': {
    borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
    borderColor: 'white',
    },
    '&& .MuiInput-root:hover::before': {
    borderColor: 'white',
    } 
    },
  
  }));
  

    //Included with material ui code for Numberbox
    function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
          }}
          thousandSeparator
          prefix="₹"
        />
      );
    }
    
    NumberFormatCustom.propTypes = {
      inputRef: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
    };

export default function InsertIncome(props){

    const[date,setDate]=useState(formatedDate);
    const[item,setItem]=useState('');
    const[amount,setAmount]=useState('');
    const[open,setOpen]=useState(false);
    const {openi,setOpeni,selex,setSelex,icatName,setIcatname,setTransactionState}=useContext(UserContext);
   

   const handleClose = () => {
        setOpen(false);
      };
    
      const  handleChange1 = event => {
        setDate(event.target.value);
      }
    
      const  handleChange2 = event => {
        setItem(event.target.value);
      }
    
      const  handleChange3 = event => {
        setAmount(event.target.value);
        
      }
    
      const handleOpeni = () =>{
        setOpeni(true);
        console.log(openi);
      }
    
      const  handleSubmit = event => {
    
        event.preventDefault();
        console.log("dfdf");
        const fetchData=async()=>{
        const res = await axios.post(API.ADD_INCOME,JSON.stringify({
            "userId":props.message,
            "item" : item,
            "categoryId":selex,
            "amount":amount,
            "transactionDate":date,
          }), {headers: { "Content-Type":"application/json"}});
        
          console.log("res="+res);
          setOpen(true);
          setAmount('');
          setItem('');
          setSelex('');
          setIcatname('');
          setDate(formatedDate); 
          setTransactionState(true);} 
          fetchData();
        }

          // const    updateCategory = category  =>{
          //     setSelex(category.ID);
          //     setCatname(category.CATEGORY_NAME);
          //     }
              

              // console.log("xxxxxxxx",options);
            //   console.log(this.context);
            const classes = useStyles();

            return (
                
      
                <div className="textdiv">
                  {/* form starts here */}
                  <form onSubmit={handleSubmit}  >
                 
                      {/* Datepicker */}
                      <label className="labelclass" style={{ marginLeft: "1%"}}> 
                      Date            
                              <TextField
                              onChange={handleChange1}
                              name="date" 
                              type="date"
                              value={date}
                              className={classes.datepickerx}
                              required                    
                              />
                              <Icon name='calendar outline' style={{ fontSize: 20, paddingLeft:"20%" }}  />
                      </label>
          
                      {/* Item Field */}
                      <TextField 
                        required
                        InputLabelProps={{required: false}}  
                        className={classes.textField} 
                        label="Item" 
                        name="item" 
                        value={item}
                        onChange={handleChange2}/>
          
                      {/* Amount field */}
                      <TextField
                        className={classes.textField}
                        label="Amount"
                        required
                        InputLabelProps={{required: false}}  
                        name="amount"
                        value={amount}
                        onChange={handleChange3}
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                  />
                      
                      {/* Category Field */}

            <TextField label="Category" name='category' id='category' autoComplete="off"
            required InputLabelProps={{required:false}}
            value={icatName}          
            className={classes.textField} onClick={handleOpeni}  />
                      
                      {/* Submit button */}
          
                      <div> 
                       <Button className={classes.Button}  variant="contained" disableElevation type="submit">
                            Add Income
                       </Button>
                        <Snackbar
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            autoHideDuration={1000}
                            variant="success"
                            message={<span  id="message-id">Income Insertion Successfull</span>}
                      /> 
                     </div>
                  </form>
                </div>
              );

}



