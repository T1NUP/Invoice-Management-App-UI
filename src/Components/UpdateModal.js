import React, { Component } from 'react';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {Button,Dialog, DialogTitle, DialogContentText, DialogContent,TextField, InputLabel,
    DialogActions, Grid, makeStyles,} from '@material-ui/core';
import { connect } from "react-redux";
import { addRecords, addChecked, addRecord ,delData} from "../Action";


const useStyles = makeStyles((theme) => ({ 
  dialogPaper: {
    width: '30vw',
    height: '60vh',
    background: '#2A3E4C',
    color: "#fff"
  },
  ia: {
    margin: "0 0 0 0",
    padding: "1vh 0vw",
    color: "#fff"
  },
  ib:{
   color: "#fff"
  }
}));

function UpdateModal(props)
{

  const textRef = React.useRef("");//
  const initId = React.useRef("");//dealing with order id
  const notes= React.useRef("");//dealing with notes
  const [intAmt, setAmtId] = React.useState("");//deling with amount
  const [textNote, setTextNode] = React.useState("");//delaing with notes
  const [res,setRes]= React.useState(null);
  const classes= useStyles();//for styling component

  //calling the data with post method to update the data in database
  const updApiData = React.useCallback(async () => {
    try {
      const res= axios.post('http://localhost:8080/1806405/Edit', {
        doc_id: initId.current,
        total_open_amount: intAmt,
        notes: textNote,
      })
      .then(function (response) {
        console.log("POSTED",response);
        setAmtId("");
        setTextNode("");
        props.delData(props.records.checks[0]);
        props.handleCloseUpd();
      })
      .catch(function (error) {
        console.log("ERR1",error);
      });
    } catch (error) {
      console.log("ERR2",error);
    }
  });

  //function to fetch and set order id of selected
  const setId=()=>{
    if(props.openUpd)
    {
    var id= ((typeof(props.records.checks[0])==="undefined") ? "+" : (props.records.checks[0].total_open_amount));
    var n= (typeof(props.records.checks[0])==="undefined") ? "Lorem Ipsum..." : ((props.records.checks[0].notes)==="null") ? "Lorem Ipsum...": (props.records.checks[0].notes);
    //intAmt.current= id;
    initId.current= props.records.checks[0].doc_id;
    setAmtId(id);
    setTextNode(n);
    notes.current= n;
    //setAmtId(id);
    console.log("YES",id);
    }
    return(
      id
    )
  }

  const changeId=(event)=>{
  
    setAmtId(event.target.value);
  }

  const changeNote=(event)=>{
    setTextNode(event.target.value);
  }

  React.useEffect(() => {
   
    return () => {
    setAmtId("");
    setTextNode("");
    }
  }, []);



  const upd= () =>{

    updApiData();
    console.log("inv", initId.current);
  }

  const reset= () =>{

    var id= ((typeof(props.records.checks[0])==="undefined") ? "+" : (props.records.checks[0].total_open_amount));
    var n= (typeof(props.records.checks[0])==="undefined") ? "Lorem Ipsum..." : ((props.records.checks[0].notes)==="null") ? "Lorem Ipsum...": (props.records.checks[0].notes);
    //intAmt.current= id;
    initId.current= props.records.checks[0].doc_id;
    setAmtId(id);
    setTextNode(n);
    notes.current= n;

  }

  const close= () =>{

    initId.current="";
    setAmtId("");
    setTextNode("");
    props.handleCloseUpd();
  } 


    return(
        <div>
        
          {console.log("TR", textRef, intAmt)}
              <Dialog open={props.openUpd} onClose={props.handlecloseUpd} classes={{ paper: classes.dialogPaper }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Invoice<hr></hr></DialogTitle>
                <DialogContent style={{paddingBlock: "7vh"}}>
                  <DialogContentText >
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                  <InputLabel className={classes.ia}>Invoice Amount   </InputLabel>
                  </Grid>
                  <Grid item>
                  <TextField id="id" onChange={changeId} value={(((intAmt)===""))? setId(): intAmt}  variant="outlined" size="small"></TextField>
                  </Grid>
                 </Grid>

                 <Grid container direction="row" alignItems="center">
                    <Grid item> 
                  <InputLabel className={classes.ib}>Notes  </InputLabel>
                  </Grid>
                  <Grid  item>
                  <TextField id="outlined-basic" onChange={changeNote} value={textNote} size="large"  variant="outlined" style={{height: "13vh", padding: "4vh 7vh"}}></TextField>
                  </Grid>
                  </Grid>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={close} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={reset} color="primary">
                    Reset
                  </Button>
                  <Button onClick={upd} color="primary">
                    Save
                  </Button>
                  </DialogActions>
                </Dialog>  
    </div>

    )
}

const mapStateToProps = (state) => {
  console.log("INIT", state);
  return {
    records: state.records,
    selected: state.checks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  delData: (data) => dispatch(delData(data)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal);