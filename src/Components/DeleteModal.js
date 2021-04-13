import React, { Component } from 'react';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {Button,Dialog, DialogTitle, DialogContentText, DialogContent,TextField, InputLabel,makeStyles,
    DialogActions} from '@material-ui/core';
    import { connect } from "react-redux";
import {delMore} from "../Action";


const useStyles = makeStyles((theme) => ({ 
  dialogPaper: {
    width: '60vw',
    height: '50vh',
    background: '#2A3E4C',
  },
  inner: {
    color: "white"
  },
  danger: {
    color: "red"
  }
}));

//calling api with post method and sending order id to delete from db
function DeleteModal(props)
{

  const classes= useStyles();

    const delApiData = React.useCallback(async (arr) => {
        try {
          const res= axios.post('http://localhost:8080/1806405/Delete', {
            docIds: [...arr]
          })
          .then(function (response) {
            console.log("POSTED",response);
          })
          .catch(function (error) {
            console.log("ERRD",error);
          });
        } catch (error) {
          console.log("ERRD",error);
        }
    });

    const handleDelete = () => {

        const arr= props.records.checks.map((item)=>(item.doc_id))
        //setDelIds(props.records.checks.map((item)=>(item.doc_id)))
        delApiData(arr);
        props.delMore(props.records.checks);
        console.log("DEL IDs:",props.records.checks);
        props.handleCloseDel();
    }


    return(
        <Dialog open={props.openDel} onClose={props.handlecloseDel} classes={{ paper: classes.dialogPaper }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className={classes.inner}>Delete record(s)? <hr></hr></DialogTitle><tr></tr>
                <DialogContent style={{paddingBlock: "3vh"}}>
                  <DialogContentText className={classes.inner}>
                  You will lose all your record(s) after this action. We can't recover them
                  once you delete.<p/>
                  Are you sure you want to <i className={classes.danger}>permanently</i> delete them?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={props.handleCloseDel} varient="outlined" color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} style={{background: "#14AFF1", color:"white"}} color="primary">
                    Delete
                  </Button>
                </DialogActions>
        </Dialog>  
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
    delMore: (data) => dispatch(delMore(data))  
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);