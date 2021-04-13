import React, { Component, Fragment , useState} from 'react';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {Button,Dialog, DialogTitle, DialogContentText, DialogContent,TextField, InputLabel,
    DialogActions, Box,Grid, makeStyles, Card} from '@material-ui/core';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({ 
  dialogPaper: {
    maxWidth: '100vw',
    width: '55vw',
    height: '77vh',
    background: '#2A3E4C',
    font: "#fff"
  },
  inner: {
    color: "#fff"
  },
  innerbody:{
    color: "#97A1A9",
    width: "2vw",
    fontSize: "1vw"
  }
}));

function AddModal(props)
{

    const classes= useStyles();//for styling components

    const [name, setName]= useState("");//dealing with customer name feild
    const [custNo, setCustNo]= useState("");//dealing with customer no feild
    const [invNo, setInvNo]= useState("");//dealing with order number feild
    const [invAmt, setInvAmt]= useState("");//delaing with invoice amount feild
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));//delaing with dates
    const [note, setNote]= useState("");//dealing with  note feild

    const handleName= (event) =>{
        setName(event.target.value);
    }

    const handleCustNo= (event) =>{
        setCustNo(event.target.value);
    }

    const handleInvNo= (event) =>{
        setInvNo(event.target.value);
    }

    const handleInvAmt= (event) =>{
        setInvAmt(event.target.value);
    }

    const handleNote= (event) =>{
        setNote(event.target.value);
    }



    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
//calling the servlet through post to add data to database
    const sendData= React.useCallback(async () => {
        try {
          const res= axios.post('http://localhost:8080/1806405/AddInvoice', {
            name_customer: name,
            cust_number: custNo, 
            doc_id: invNo ,
            invoice_id: invNo,
            total_open_amount: invAmt,
            notes: note,
            due_in_date: selectedDate,
            business_code: "",
            clear_date: "null",
            buisness_year: "2021",
            posting_date: "",
            document_create_date: "",
            document_create_date_1: "",
            invoice_currency: "",
            document_type: "",
            posting_id: 1,
            area_business: "",
            baseline_create_date: "",
            cust_payment_terms: "",
            isOpen: 1        
          })
          .then(function (response) {
            console.log("ADDED",response);
            setName("");
            setCustNo("");
            setInvNo("");
            setInvAmt("");
            setNote("");
          })
          .catch(function (error) {
            console.log("ERR1",error);
          });
        } catch (error) {
          console.log("ERR2",error);
        }
    });
    
    const sendForm =()=>{
        console.log("Send");
        setName("");
        setCustNo("");
        setInvNo("");
        setInvAmt("");
        setNote("");
        sendData();
        props.handleCloseAdd();

    }

    const clearForm =()=>{
        console.log("Clear");
        setName("");
        setCustNo("");
        setInvNo("");
        setInvAmt("");
        setNote("");
    }

    const closeForm =()=>{
        console.log("Close");
        setName("");
        setCustNo("");
        setInvNo("");
        setInvAmt("");
        setNote("");
        props.handleCloseAdd();
    }


    return(
        <Dialog open={props.openAdd} onClose={props.handleCloseAdd} classes={{ paper: classes.dialogPaper }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className={classes.inner}>Add Invoice <hr></hr></DialogTitle>
                <DialogContent >
                  <DialogContentText >
            
                    <Grid container direction="row" alignItems="center">
                    <Grid item >
                    
                      <InputLabel className={classes.inner}>Customer Name* </InputLabel> 
                    </Grid>
                    <Grid item>
                      <TextField id="id" val={name} onChange={handleName} required="true" variant="outlined"  size="small"></TextField>
                  
                    </Grid>
                    <Grid style={{padding: "0 4vw"}}>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker margin="normal" id="date-picker-dialog" format="yyyy-MM-dd" required="true"
                    label="Due Date" value={selectedDate} onChange={handleDateChange} 
                    />
                  </MuiPickersUtilsProvider>
                    </Grid>

                    </Grid>
                    
                    <Grid container direction="row" alignItems="center">
                                   
                    <Grid item>
                    <InputLabel className={classes.inner} >Customer No.*  </InputLabel>
                    </Grid>
                    <Grid item>
                    <TextField id="id" val={custNo} onChange={handleCustNo} required="true" variant="outlined" size="small" ></TextField>
                    </Grid>

                    <Grid style={{padding: "0 4vw"}}>
                  

                  <InputLabel style={{paddingBlock: "2.5vh"}} className={classes.inner}>Notes </InputLabel> 
                  <TextField id="id" val={note} onChange={handleNote} variant="outlined" size="large"></TextField>
                  

                  </Grid>

                  <Grid container direction="row" alignItems="center">
                  
                    <Grid item>
                    <InputLabel style={{paddingBlock: "3vh"}} className={classes.inner}>Invoice Amount* </InputLabel>  
                  </Grid> 
                  <Grid item>
                  <TextField id="id" val={invAmt} onChange={handleInvAmt} required="true" variant="outlined" size="small"></TextField>
                  </Grid>

                  </Grid>
                  </Grid>

            

                 
                  
                 <Grid container direction="row" alignItems="center">
                  <Grid item>
                  <InputLabel style={{paddingBlock: "2.5vh"}} className={classes.inner}>Invoice No.* </InputLabel> 
                  </Grid >
                  <Grid item>
                  <TextField id="id" val={invNo} onChange={handleInvNo} required="true" variant="outlined" size="small"></TextField>
                  
                  </Grid>
                  </Grid>
                  

                
                
                

                  </DialogContentText>
                
                  

                  
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeForm} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={clearForm} color="primary">
                    Clear
                  </Button>
                  <Button  onClick={sendForm} color="primary">
                    Add
                  </Button>
                  </DialogActions>
                </Dialog>  
    );
}

export default AddModal;