import React, { useEffect, useState, useContext }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import FormDialog from '../components/Category';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';

const useStyles = makeStyles( (theme) => ({
 
  drawerPaper:{
   width:"62.5%",
   backgroundColor:"#F35B8C",
   marginLeft:"425px",
   //marginRight:"50px",
   height:"100%",
  },
 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 445,
    paddingTop: 10,
    marginTop: 20,
    color: "black",
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
  root: {
    flexGrow: 1,
    marginLeft:"30px",
    marginRight:"35px",
    width:"470px",
  },
  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"10px",
    textAlign:"center",
    position:"justify",
    color:"#F35B8C",
    padding:"10px",
    height:"75px",width:"75px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#ecc1c1"
  },
}));
  
export default  function  SelectCategory(props) {
  const [count,setCount] = useState(1);
  const {opend,setOpend,setCatname,setSelex} = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API.CAT_LIST_EXPENSE,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[count,props.message]);

  const addCategory = () =>{
    setCount(count+1);
  }

 const onPaperClick = (text) =>{
    console.log({text});
 setCatname(text.CATEGORY_NAME);
 setSelex(text.ID);
 setOpend(false); 
  }

  const classes = useStyles();
 

const handleClose = () =>{
    setOpend(false);
}
  
  const list = (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor='top' open={opend} onClose={handleClose} > 
    <div className={classes.categorylist}>
          <p style={{marginTop:"55px",color:"#f1f1f1",marginLeft:"75px"}}> Select Category</p>
          <Grid container className={classes.root} >
      <Grid item xs={10}>
        <Grid container justify="center" spacing={0.5}>
          {data.map((text) => (
            <Grid key={text.ID} item>
              <Card className={classes.paper} onClick={() =>onPaperClick(text)} >
          <h6>{text.CATEGORY_NAME}</h6>
                </Card>
            </Grid>
          ))}
          <FormDialog message={props.message} onNewChange = {addCategory}/>
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