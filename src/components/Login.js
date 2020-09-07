import React, {Component} from 'react';
import '../styles/Login.css';
import Background from '../image/background.jpg';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {browserHistory} from 'react-router';
import WebFont from 'webfontloader';
import * as API from '../constants/Api';


WebFont.load({
    google: {
      families: ['Source Sans Pro']
    }
  });

 
var errormsg='';
class Login extends Component {   
    static displayName = 'RememberMe' 
state = {
    username:'',
    password:'',
    User : [],
    showError: false,
    isChecked: false,
};

componentDidMount() {
    if (localStorage.checkbox && localStorage.username  !== "") {
        this.setState({
            
            isChecked: true,
            username: localStorage.username,
            password: localStorage.password,
            
        })
    }
}
        onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        }
        onChangeCheckbox = event => {
            this.setState({
                isChecked: event.target.checked
            })
        }   
    validate = (state) =>{
        var uname = this.state.username;
        var pass =  this.state.password;
        // var isChecked  =  this.state.isChecked ;
        //console.log(errormsg)
        const { username, password, isChecked } = this.state
            if (isChecked && uname !== "") {
                localStorage.username = username
                localStorage.password = password
                localStorage.checkbox = isChecked
            }
        if(uname===null || uname === '' || pass===null || pass==='')
            {
                errormsg="Username / Password Missing!!!";
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
            }
            
        else {
            
             //browserHistory.push('/Home');
            var uri = API.REGISTER;
            var loginUrl= uri + uname +'/'+ pass;
            axios.get(loginUrl)
            .then(response => (response.data))
            .then((data)=>{
            this.setState({User:data})
            console.log(this.state.User);
            if(this.state.User.length === 0)
              {
                errormsg="Username / Password Incorrect!!!";
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
              }
              else{
                this.setState((prevState, props) => {
                    return { showError: false }
                  })


                this.state.User.map((userlist)=>
         (
            browserHistory.push("/Home/" + userlist.id + "/" + userlist.name)
             
         ))
                  
                
              }  
            })
            .catch(error => {
                errormsg='Error fetching and parsing data'+ error;
                this.setState((prevState, props) => {
                    return { showError: true }
                  })

              });           
        }
    }
   
    render(){
        const { username, password, isChecked } = this.state
      //  const preventDefault = (event) => event.preventDefault();
        return (
            <div>
            <div className="split left">
                <img src={Background} alt="Background"/>
            </div>
            <div className="split right">
            <div>
                {this.state.showError && <div className="error-message">{errormsg}</div>}        
            </div>
                <div className='rightcontainer' >
                <h1 WebFont>DEX Expenses</h1>
                    <h2 style={{fontFamily:WebFont,fontSize:'100%',fontWeight:'normal'}}>Please login to your account</h2>
                    <form onSubmit={this.submitted} >
                        <Input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username" 
                            inputProps={{ 'aria-label': 'description' }}
                            value={username}
                            
                            style={{width: '100%', height: '93%',fontFamily:WebFont,fontSize:'100%',fontWeight:'normal',textDecoration:'none'}} 
                            onChanged={(evt) => { this.setState.username = evt.target.value; }}
                            onChange={this.onChangeValue}
                            onFocus={{border:"2px solid #37364B"}}/>
                        <div className="space"></div>
                        <Input 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password" 
                            inputProps={{ 'aria-label': 'description' }}
                            value={password}
                            
                            style={{width: '100%', height:'93%',fontFamily:WebFont,fontSize:'100%',fontWeight:'normal',textDecoration:'none'}} 
                            onChanged={(evt) => { this.setState.password =  evt.target.value; }}
                            onChange={this.onChangeValue}
                            onFocus={{border:"2px solid #37364B"}}/>
                        <div className="space"></div>  
                        <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="check"
                            color="#37364B"
                            control={<Checkbox color="#000000" />}
                            checked={isChecked}
                            name="IsRememberMe"
                            onChange={this.onChangeCheckbox}
                            label="Remember me"
                            onclick="lsRememberMe()"
                            labelPlacement="Remember me"
                            style={{fontFamily:WebFont,fontSize:'100%',fontWeight:'normal', color:"#37364B"}}
                        />
                        <div className="space1"></div>
                        <Link 

                        component="button"
                        variant="body2"
                        style={{fontFamily:WebFont,paddingLeft:"10px", fontSize:'100%',fontWeight:'normal', textDecoration: 'none',border: '0px', color:"#37364B"}}
                        onClick={()=>browserHistory.push("/forgotpassword")}>
                         {'Forgot Password'}
                        </Link>
                        
                        </FormGroup>
                        <div className="space2"></div>
                        <FormGroup aria-label="position" row>
                        <Button variant="contained" WebFont color="primary" 
                        style={{backgroundColor: "#37364B", marginTop:'5%',width:'30%', height: '50%',fontFamily:WebFont,fontSize:'100%',textTransform:'none'}} 
                        onClick={this.validate}>
                            Login
                        </Button>
                        <div className="area"></div>
                        <Button variant="contained"
                        style={{backgroundColor: "#FFFFFF",  marginTop:'5%', width:'30%', height: '50%',fontFamily:WebFont,fontSize:'100%', border:"1px solid #37364B", textTransform:'none'}}
                        onClick={()=>browserHistory.push("/Register")}>
                            {'Sign Up'}
                        </Button>
                        </FormGroup>
                    </form>
                    </div>
            </div>
            
        </div>
        )
    }
}
export default Login;