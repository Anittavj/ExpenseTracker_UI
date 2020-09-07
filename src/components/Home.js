import React, {Component} from 'react';
import './Style.css';
import './card.css';
import FullWidthTabs from './CenterTab';
import CustomizedTabs from './Tab';
import CheckBox from './CheckBox';
import { UserProvider } from './Context';
import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';
import SettingsIcon from '@material-ui/icons/Settings';
import { Icon } from 'semantic-ui-react'
 import {browserHistory} from 'react-router';
// import { createHashHistory } from 'history';
// export const history = createHashHistory()

class Home extends Component{
  constructor(props){
    super(props)
    this.state={open:true}
  }
  

  onClicklogout = () => {
 browserHistory.push("/Login");
  // this.props.history.push({
  //   pathname: "\Login " ,
  //   state: {
  //     logged:   "true",
  //   },
  // })
//  this.props.callback(this.state.open);
  

  };

    render()
    
    {
        return(
        <div>
          <UserProvider>
        <div className="split1 left1"> <FullWidthTabs message = {this.props.params.id} /> 
        </div>
        
        <div className="split1 center1"style={{overflowX:"hidden", overflowY:"scroll"}} >
        <div className="split1 style"><CheckBox  message = {this.props.params.id} /></div>
        <ExpenseCategory message = {this.props.params.id}  />
        <IncomeCategory message = {this.props.params.id}  />
       </div>
      
       <div className="split1 right1"> 
      
      <div  className = "rowheader" style={{width:"100%"}}>  
     <div className = "settings" style={{width:"10%"}}> <SettingsIcon /> </div> 
      <div className = "header" style={{width:"80%"}}> {this.props.params.name}  </div>
      <div className = "exit" style={{width:"10%"}}> <Icon name='sign-out' size='large' style={{color:"#9370DB"}} 
                                  onClick = {this.onClicklogout}/> </div>
      </div>
         
         <CustomizedTabs  message = {this.props.params.id}/> </div> 
        </UserProvider>
       </div> 
  
        );
    }
}
export default Home;


