import React, { useEffect, useState, useContext }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormDialog from '../components/ECategory';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles( (theme) => ({
 
  drawerPaper:{
   width:"67%",
   backgroundColor:"#F35B8C",
   marginLeft:"31.5%",
   //marginRight:"50px",
   height:"100%",
  },
 

  root: {
    flexGrow: 1,
    marginLeft:"45px",
    marginRight:"35px",
    width:"470px",
  },

  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"35px",
    textAlign:"center",
    position:"justify",
    color:"#F35B8C",
    // padding:"10px",
    height:"95px",width:"95px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#ffcce6"
    //backgroundColor:"#ecc1c1"
  },
}));
  
export default  function ExpenseCategory(props) {

  const [openNew,setOpennew] = useState(false);
  const [ttype,setTtype] = useState('');
  const [newCat,setNewcat] = useState(false);
  const {opend,setOpend,setEcatname,setSelex} = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(API.CAT_LIST_EXPENSE,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[newCat]);



 const onPaperClick = (text) =>{
    console.log({text});
 setEcatname(text.CATEGORY_NAME);
 setSelex(text.ID);
 setOpend(false); 
  }

  const classes = useStyles();
 

const handleClose = () =>{
    setOpend(false);
}
  ///////////////////////////////////////

const handleClickOpen = () =>{
setOpennew(true);
};

const handleClosenew = () => {
  setOpennew(false)
};

const handleChange = event => {
  setTtype(event.target.value);
}

// save new category

const handleinsert = event => {
  event.preventDefault();
  console.log("dfdf");
  axios.post(API.ADD_EXPENSE_CATEGORY,JSON.stringify({
    "categoryName": ttype,
    "userId": props.message,
  }), {headers: { "Content-Type":"application/json"}})    
  .then(res => {
    console.log("res="+res);
   setOpennew(false);
   setNewcat(true);
    
  })
}
// display category names
  const list = (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor='top' open={opend} onClose={handleClose} > 
    <div className={classes.categorylist}>
          <p style={{marginTop:"55px",color:"#f1f1f1",marginLeft:"90px"}}> Select Category</p>
          {/* <DeleteIcon className={classes.delete} onClick={deleteCategory}/> */}
          <Grid container className={classes.root} >
      <Grid item xs={10}>
        <Grid container justify="center" spacing={0.5}>
          {data.map((text) => (
            <Grid key={text.ID} item>
              <Paper  className={classes.paper} onClick={() =>onPaperClick(text)} >     
              <Typography  variant='body2'> {text.CATEGORY_NAME} </Typography>
                </Paper>
            </Grid>
          ))}
        
      <Button style={{marginLeft:"2px",paddingTop:"10px",textAlign:"center",position:"justify",height:"95px",width:"95px",marginTop:"1px",marginBottom:"2px", color:"#F35B8C",backgroundColor:"#ffcce6",textTransform:"none"}} onClick={handleClickOpen}>
      <Typography variant='body2' display="block"> +New </Typography>
      </Button>
      
        <Dialog
          open={openNew}
          onClose={handleClosenew}
          aria-labelledby="form-dialog-title"
        >
            
            <form onSubmit={handleinsert}  >
          
          <DialogContent>
          <DialogContentText style={{color:"#F35B8C"}}>
              Category Name
            </DialogContentText>
          <TextField 
             
              autoFocus
              required
              margin="dense"
              style={{color: "white"}}
              id="name"
              onChange={handleChange}
              fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClosenew} style={{color:"#F35B8C"}}>
              Cancel
            </Button>
            <Button style={{color:"#F35B8C"}} type="submit">
              Add
            </Button>
          </DialogActions></form>
          </Dialog>   
        </Grid>
      </Grid>
     </Grid>
    </div>
    </Drawer>
    </div>
  );

  return (
    <div>
     
        <React.Fragment >

            {list}
       
        </React.Fragment>
   
     
    </div>
  );
  
}