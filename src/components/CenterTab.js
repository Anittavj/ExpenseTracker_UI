import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InsertExpense from './InsertExpense';
import InsertIncome from './InsertIncome';
import './Style.css';


//Imported code for fullwidth tabs from material UI

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

//minor changes in default styles
const useStyles = makeStyles((theme) => ({
  root: {
   // backgroundColor: '#F35B8C',
    height:100,
    fontSize:35,
    color: "white",
    textTransform: 'none',
    font: "Bold 35px/37px source sans pro",

   
   
  },
  
}));

const useStyles1 = makeStyles((theme) => ({
    root: {
      backgroundColor: '#69B5FF',
      
      textTransform: 'none',
      font: "Bold 35px/37px source sans pro",

    
    color: "white",
    '&:hover': {
      backgroundColor: '#69B5FF',
      borderColor: '#69B5FF',
      textColor:"white"
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#69B5FF',
      borderColor: '#69B5FF',
      textColor:"white"

    },
    '&:focus': {
      boxShadow: '#69B5FF',
    },

    
     
    },
  }));

export default function FullWidthTabs(props) {

 
  const classes = useStyles();
  const classes1 = useStyles1();

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div >
      <AppBar position="static" color='transparent' >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="white"
          textColor="white"
          variant="fullWidth"
          aria-label="full width tabs example"
          color ='transparent'
        >
          {/* Tab header names */}
          <Tab className={classes.root}  label="Expense" {...a11yProps(0)} />
          <Tab className={classes1.root} label="Income" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar >
      <SwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >

          {/* Specifying Tab contents */}
        <TabPanel className="reddiv"  value={value} index={0} dir={theme.direction}>
        <InsertExpense message={props.message}/>

        </TabPanel>
        <TabPanel className="bluediv"  value={value} index={1} dir={theme.direction}>
        <InsertIncome message={props.message} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
