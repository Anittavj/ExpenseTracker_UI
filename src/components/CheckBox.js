import React, {useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './card.css';
import SimpleMenu from './Menus';
import Expense from './Api_Expense';


function CheckBox(props){


const[isCheckedA,setIsCheckedA]=useState(true);
const[isCheckedB,setIsCheckedB]=useState(false);

  
 const handleCheckedA =()=> { setIsCheckedA(!isCheckedA); }
 const handleCheckedB =()=> { setIsCheckedB(!isCheckedB); }

    let expense,income,both;
  
    if ((!isCheckedB &&  isCheckedA)) {expense = <Expense dataA={isCheckedA} message = {props.message} />;}
    if ((isCheckedB &&  !isCheckedA)) { income = <Expense dataB={isCheckedB} message = {props.message}/>; }
    if ((isCheckedB &&  isCheckedA) )  { both = <Expense dataBoth={isCheckedA} message = {props.message}/>; }
 
    return(
      <div>
        <header style={{paddingTop:"30px", paddingBottom:"50px", }}>
          <div class="row" id="id">
            <div class="block"><FormControlLabel className="expense1"
                control={<Checkbox  defaultChecked style={{color:"#F35B8C", visibility:"visible",}} name="checkedA" onChange={ handleCheckedA }/>}
                label="Expense" />
             
                </div>
               
            <div class="block"><FormControlLabel className="income1"
                control={<Checkbox  style={{color:"#69B5FF",  }} name="checkedB" onChange={ handleCheckedB } />}
                label="Income"/></div>

            <div class="block"><SimpleMenu/></div>
          </div>
        </header>
        <div style={{marginTop:"10px"}}> {expense}    </div>   
        <div style={{marginTop:"10px"}}> {income}    </div>   
        <div style={{marginTop:"10px"}}> {both}    </div>             
      </div>                     
    );
  
}

export default CheckBox;