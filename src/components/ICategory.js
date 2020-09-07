import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import * as API from '../constants/Api';

export default class FormDialog extends React.Component{
   
   
  state = {
      openx: false,
      ttype:'',
      newChange:false,
  };

handleClickOpen = () =>{
  this.setState({openx: true});
};

  handleClose = () => {
    this.setState({openx: false})
  };

  handleChange = event => {
    this.setState({ ttype: event.target.value });
    console.log(this.state.ttype);
  }

//add new category api
  handleinsert = event => {
    event.preventDefault();
    console.log("dfdf");
    axios.post(API.ADD_INCOME_CATEGORY,JSON.stringify({
      "categoryName": this.state.ttype,
      "userId": this.props.message,
    }), {headers: { "Content-Type":"application/json"}})    
    .then(res => {
      console.log("res="+res);
      this.setState({ openx: false , newChange: true});
      this.props.onNewChange(this.state.newChange);
    })
  }

  render(){

  return (
          <div>
      <Button style={{marginLeft:"2px",paddingTop:"35px",textAlign:"center",position:"justify",padding:"10px",height:"95px",width:"95px",marginTop:"1px",marginBottom:"2px", color:"#69B5FF",backgroundColor:"#e6f3ff",textTransform:"none"}} onClick={this.handleClickOpen}>
      <Typography variant='body2' display="block"> 
             +New 
             </Typography>
      </Button>
      <div></div>
        <Dialog
          open={this.state.openx}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
            
            <form onSubmit={this.handleinsert}>
          
          <DialogContent>
          <DialogContentText style={{color:"#69B5FF"}}>
              Category Name
            </DialogContentText>
          <TextField 
              autoFocus
              required
              margin="dense"
              id="name"
              onChange={this.handleChange}
              fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleClose} style={{color:"#69B5FF"}}>
              Cancel
            </Button>
            <Button style={{color:"#69B5FF"}} type="submit"   >
              Add
            </Button>
          </DialogActions></form>
          </Dialog>
          </div>   
       
  );
  
}
}
