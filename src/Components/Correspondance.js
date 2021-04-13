import React, { Component } from 'react';
import axios from "axios";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import {Button,Dialog, DialogTitle, DialogContentText, DialogContent,TextField, InputLabel,Card,
    DialogActions, Table, TableRow,TableCell,TableBody,TableHead,Box, makeStyles} from '@material-ui/core';
    import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({ 
      dialogPaper: {
        maxWidth: '80vw',
        width: '100vw',
        height: '80vh',
        background: '#2A3E4C',
        padding: '2vh 2vw'
      },
      inner: {
        color: "white"
      },
      btton : {
        width: '3vw',
        height: '3vh',
        background: '#2A3E4C',
      }
}));


function Correspondance(props)
{

  const classes= useStyles();//For styling component

  //Function to download correspondance in pdf format
    const download =()=>{

        
        const ele= document.getElementById("tab_customers");
        

        const string = renderToString(<Dialog />);
        const pdf = new jsPDF("landscape");
        console.log("JSPDF",ele.offsetParent.innerHTML);

        pdf.fromHTML(ele.offsetParent.innerHTML,{
          x: 0,
          y: 0,
          width: 200
       });

       pdf.save();
    }

    //calculates total of invoices  
    const addition = () =>{

      var s=0;
      for(var obj in (props.list)){
        if(obj>0)
        s=s+props.list[obj]['total_open_amount'];
        //console.log("I", props.list[0]['total_open_amount'])
      }
        return s;
    }

    

    return(
        <div id="Target">
       

        <Dialog open={props.cpd} onClose={props.openCpd} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
            
      
            

    
        <span id="tab_customers">

        
            <DialogTitle id="form-dialog-title" className={classes.inner}>View Correspondance {console.log("DYNA", props.list)}<hr></hr></DialogTitle>
            
            <br/><br/>
            <DialogContentText className={classes.inner}>
            Dear Sir/Madam,<br></br>
            Greetings!! <br></br>

            This is to remind that there are one or more invoices on your Account. Please provide at ypur earliest convenience an update on the<p></p>
            payment details or clarify the reason for the delay. If you have any specific issue with the invoices please let us know so that<p></p>
            we can address it to the correct department.<p></p>
            Please find the details of invoices below:
            </DialogContentText>

        <Table>
         
          
          <TableHead>
            {/* <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Po Number</TableCell> 
              <TableCell>Order Date</TableCell> 
              <TableCell>Due Date</TableCell> 
              <TableCell>Currency</TableCell>
            </TableRow> */}
            
          </TableHead>
          
          {props.list.map((row)=>(
            <TableRow>
              <TableCell className={classes.inner}>{row["doc_id"]}</TableCell>
              <TableCell className={classes.inner}>{(row["po"])? row["po"]: row["doc_id"] }</TableCell>
              <TableCell className={classes.inner}>{row["baseline_create_date"]}</TableCell>
              <TableCell className={classes.inner}>{row["due_in_date"]}</TableCell>
              <TableCell className={classes.inner}>{row["invoice_currency"]}</TableCell>
              <TableCell className={classes.inner}>{row["total_open_amount"]}</TableCell>
            </TableRow>
          ))}
        
        </Table>
            <p></p>
            <p></p>
        <DialogContentText className={classes.inner}>
            <b>Total Amount to be paid: </b>{addition()} <br></br>
            Incase you have already made a mayment of above items. Please send us the details to ensure  <br></br>
            the payment is posted. Let us know if we can be of any further assistance. Looking forward to hearing from you.
            <p></p>
            Kinds Regards,<br></br>
            [Sender First name][Sender Last Name],<br></br>
            Phone: [If any],<br></br>
            Email: [senders's Email Address],<br></br>
            Company Name[Sender's Company Name]

            <br></br><br></br><br></br>
            <Button onClick={props.closeCpd} className={classes.btton} color="primary">
            Cancel
             </Button>
            <Button onClick={download}  style={{background: "#14AFF1", color:"white", float: "right"}} color="primary">
            Download
            </Button>
        </DialogContentText>


        
        
    

        </span>

        
    
    
    
    </Dialog>
        </div>
    )
}

export default Correspondance;