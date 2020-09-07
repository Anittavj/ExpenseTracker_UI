import React, { useEffect, useState , useContext}  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:"55px",
    marginRight:"20px",
    width:"450px",
    
  },
  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"35px",
    textAlign:"center",
    color:"#69B5FF",
    padding:"10px",
    height:"95px",width:"95px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#e6f3ff",
  },
  drawerPaper:{
    width:"67%",
    backgroundColor:"#69B5FF", 
    marginLeft:"31.5%",
    height:"100%",
   },
textField: {
  marginLeft: -5,
  marginRight: theme.spacing.unit,
  width: 470,
  paddingTop: 10,
  marginTop: 20,
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
  



export default  function  IncomeCategory(props) {
 
  const [openNew,setOpennew] = useState(false);
  const [ttype,setTtype] = useState('');
  const [newCat,setNewcat] = useState(false);
  const {openi,setOpeni,setIcatname,setSelex} = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(API.CAT_LIST_INCOME,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[newCat]);



 const onPaperClick = (text) =>{
    console.log({text});
 setIcatname(text.CATEGORY_NAME);
 setSelex(text.ID);
 setOpeni(false); 
  }

  const classes = useStyles();
 

const handleClose = () =>{
    setOpeni(false);
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
  axios.post(API.ADD_INCOME_CATEGORY,JSON.stringify({
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
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor='top' open={openi} onClose={handleClose} > 
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
        
      <Button style={{marginLeft:"2px",paddingTop:"10px",textAlign:"center",position:"justify",height:"95px",width:"95px",marginTop:"1px",marginBottom:"2px", color:"#69B5FF",backgroundColor:"#e6f3ff",textTransform:"none"}} onClick={handleClickOpen}>
      <Typography variant='body2' display="block"> +New </Typography>
      </Button>
      
        <Dialog
          open={openNew}
          onClose={handleClosenew}
          aria-labelledby="form-dialog-title"
        >
            
            <form onSubmit={handleinsert}  >
          
          <DialogContent>
          <DialogContentText style={{color:"#69B5FF"}}>
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
            <Button onClick={handleClosenew} style={{color:"#69B5FF"}}>
              Cancel
            </Button>
            <Button style={{color:"#69B5FF"}} type="submit">
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
