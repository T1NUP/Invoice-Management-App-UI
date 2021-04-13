import React, { Component } from 'react';
<<<<<<< HEAD
import UpdateModal from './UpdateModal';
import { withStyles } from "@material-ui/core/styles";
import { Paper,TableHead ,lighten, makeStyles,TableContainer, Table,CircularProgress,
  TableRow,TableCell,TableBody,Button,Checkbox, 
  Dialog, DialogTitle, DialogContentText, DialogContent,TextField, InputLabel, Grid,
  DialogActions} from '@material-ui/core';
import axios from "axios";
import { connect } from "react-redux";
import "./Inner.css";
import pen from '../Assets/Pen.svg';
import glass from '../Assets/search.svg';
import { addRecords, addChecked, addRecord, delMore } from "../Action";
import InfiniteScroll from "react-infinite-scroll-component";
import UpdateMoadl from './UpdateModal';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import Correspondance from './Correspondance';


const useStyles = makeStyles((theme) => ({
  
  btnUnactive: {margin: "1vw", border: ".1vh solid grey",color: "white", height: "7.5vh"},
  btnActive: {margin: "1vw", border: ".1vh solid #14AFF1",color: "white",height: "7.5vh", fontFamily: "Arial"},
  btnPredict: {margin: "1vw", background: "grey", color: "white"},
  inputSearch: {margin: "1vw", border: ".1vh solid blue"},
  hcell:{ background: "#273D49CC", margin: "0 1vw" ,fontSize: "1.9vh", padding: "1vw 0",color: "#97A1A9", width: "13vw", textAlign: "center", zIndex:"1" },
  rcell:{ background: "#273D49CC", fontSize: "1.9vh", width: "13vw", margin: "0 1vw",color: "white", textAlign: "center",textAlign: "center", padding: "0 3.75vw"},
  clearcell: { background: "#273D49CC", fontSize: "3vh", width: "12vw", margin: "0 8vw", color: "white",padding:"0 5vw"}
}));

function InnerComponent(props)
{
    const classes= useStyles();//For styling
    const [data, setData] = React.useState([]);//for storing data in this component
    const [pointer, setPointer] = React.useState(0);//
    const [selected, setSelected] = React.useState([]);//for marking selected items
    const count = React.useRef(0);//count for limit setting in AllShow sevlet
    const qcount= React.useRef(10);//count for limit setting in Search Sevlet
    const resCount= React.useRef(0);//size of response
    const [openUpd, setOpenUpd] = React.useState(false);//For opening componet UpdateModal
    let debounceTimer = null;//timer for debouncing
    const [search, setSerch]= React.useState(false);//For letting ui know that it is showing serchrd data
    const [searchValue, setSearchValue] = React.useState("");//value being serched
    const [searchResults, setResults] = React.useState([]);//result data fetched
    const [openAdd, setOpenAdd] = React.useState(false);//For opening componet AddModal
    const [delIds, setDelIds]= React.useState([]);
    const [openDel, setOpenDel]= React.useState(false);//For opening componet DeleteModasl
    const [cpd, setCpd]= React.useState(false);//For opening componet Correspondance
    const [pred, setPred]= React.useState(null);//For setting flag on the records for prediction
    const predicted= React.useRef([]);//storing predicted data

    
    const getApiData = React.useCallback(async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/1806405/AllShow", {

              params: {
                top: count.current,
                down: count.current+10
              }
            }
          );
          var f= count.current+20;
          
          props.addRecord(response.data);
          
          setData({data: [...props.records.records]});
          console.log("DATA",data);
          console.log("PROP",props.records.records);
          count.current += 10;
         
        } catch (error) {
          console.log(error);
        }
    });



    const handleClick = (event) => {
        
        props.addChecked(event);
    }

    const update = () => {


    }

    const handleOpenUpd = () => {
      console.log(props.checks);
      
      if((props.records.checks.length)===1)
      setOpenUpd(true);
    };
  
    const handleCloseUpd = () => {

     
      setOpenUpd(false);
    };

    const handleOpenAdd = () => {
      setOpenAdd(true);
    }

    const handleCloseAdd = () => {
      setOpenAdd(false);
    }

    const handleCheck= (cond) =>{
        return (!cond);
    }
    const isSelected = (name) => selected.indexOf(name) !== -1;

    //http://localhost:8080/SQLDB/MyServlet
    const getSearchResults = React.useCallback(async (sv) => {
      try {

        const response = await axios.get(
          "http://localhost:8080/1806405/Search", {

            params: {
              
              doc_Id: sv,
              limit: qcount.current
            }
          }
        );

        if((qcount.current)<15)
        {
          console.log("less 15 & response:", [...response.data]);
         
          setResults([...response.data]);
          setSerch(true);
          console.log(searchResults);
        }
        else
        {
         
          setResults([...searchResults,...response.data]);
          console.log("MORE", searchResults);
        }

        console.log("WHAT is SV", searchValue)
        if(sv==="")
        {
          setSerch(false)
        
          setSearchValue(sv);
          console.log("SETCALLED ''", search)
        }
        else if(sv.trim().length===0)
        {
          console.log("SETCALLED ''", search)
        }
        else
        {
        setSearchValue(sv);
       
        console.log("setunCalled", search)
        }
        
        qcount.current += 10;
        resCount.current= response.data.length;
        console.log("SEAR",search,searchResults);
  
      } catch (error) {
        setResults([])
        setSerch(false);
        console.log("ERR::nf",error );
      }
  });
  
    const handleSearchValueChange = (event) => {
      const newSearchVal = event.target.value;
     
       
        console.log("SVal::",searchValue);
       
        clearTimeout(debounceTimer);
        qcount.current=10;
        debounceTimer = setTimeout(() => {
          console.log("TTT");
          
         getSearchResults(newSearchVal);
        }, 3000);
      
        

       
    };

    

    const handleOpenDel= () => {
      setOpenDel(true);
    }

    const handleCloseDel= () => {
      setOpenDel(false);
    }

    const openCpd= ()=>{

      setCpd(true);
    }

    const closeCpd= () =>{
      setCpd(false);
    }

  
    //Flask server is running at port 5000, this api call fetches predicted data from model 
    const fetchPredictions= () =>{
      axios.post("http://127.0.0.1:5000/predict", {

          id: 1806405,
          data: props.records.checks
              },
        {
          headers: { 'Content-Type': 'text/plain' }                
        }).then((response) => {
          console.log("Response Data", response.data);
          setPred([...response.data]);
        })
        .then((error) => {
          console.log("Error", error);
        });
    }  

    const predict= () =>{
        console.log("To Predict",props.records.checks);
        fetchPredictions();
        console.log("PREDICTED",predicted.current,pred);
    }

    React.useEffect(() => {
        getApiData();    
      }, []);

        return(
            <div className="Page" style={{margin: "0 auto"}}>
                {/* {console.log("PREDICTED RENDER",pred)} */}

            <Grid container >
            <Grid container xs={12} justify="space-between" >
              <Grid container xs={4}  alignContent="space-between" >
                 
              <Button variant="outlined" color="primary" className={((props.records.checks.length)===0)? classes.btnUnactive : classes.btnPredict} onClick={predict} disabled={((props.records.checks.length)===0)}>
                Predict
            </Button> 

            <Button variant="outlined" color="primary" className={((props.records.checks.length)===0)? classes.btnUnactive: classes.btnActive} onClick={openCpd} disabled={((props.records.checks.length)===0)}>
                View Correspondance
            </Button>

            </Grid>

            <Grid container xs={6}  direction="row" justify="flex-end" > 

            <Button variant="outlined" color="primary" style={{margin: "1vw"}} onClick={handleOpenAdd}>
               <b>+</b> Add
            </Button>

            <Button variant="outlined" color="primary" className={((props.records.checks.length)!==1)? classes.btnUnactive: classes.btnActive} onClick={handleOpenUpd} disabled={((props.records.checks.length)!==1)}>
            <img className="penLogo" src={pen}/> Edit
            </Button> 
           

            <Button variant="outlined" color="secondary" className={((props.records.checks.length)===0)? classes.btnUnactive: classes.btnActive} onClick={handleOpenDel} disabled={((props.records.checks.length)===0)}>
              <b>-</b>Delete
            </Button>
            

           
           

            <TextField variant="outlined" onChange={handleSearchValueChange} id="search-textarea" label={(<><img className="penLogo" src={glass}/></>)}
                placeholder="Search" color="secondary" size="small" style={{margin: "1vw"}}  />


            </Grid>
            </Grid>
            </Grid>

            <UpdateMoadl openUpd={openUpd} handleCloseUpd={handleCloseUpd} handleOpenUpd={handleOpenUpd} recId={props.records.checks}></UpdateMoadl>

            <AddModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} handleOpenAdd={handleOpenAdd}></AddModal>

            <DeleteModal openDel={openDel} handleCloseDel={handleCloseDel} handleOpenDel={handleOpenDel}></DeleteModal>

            <Correspondance cpd={cpd}  openCpd={openCpd} closeCpd={closeCpd} list={[{doc_id: "Invoice Number",po: "PO Number", baseline_create_date : "Order Date", due_in_date: "Due Date" ,invoice_currency: "Currency",total_open_amount : "Open Amount($)"},...props.records.checks]}/> 

            
            {console.log("HERE",searchResults)}
             <Paper style={{rounded: true}}>
             
             <TableContainer id="test-table" component={Paper}
                style={{height: "65vh",overflowY: "scroll", background: "#273D49CC"
             }}
             >
                 <InfiniteScroll
          scrollableTarget="test-table"
          dataLength={(search) ? searchResults.length : props.records.records.length}
          
          loader={
            <div style={{width: "100px", height: "100px", margin: "auto",padding: "50px"}}>
              <CircularProgress color="primary"/><p>Loading</p>
            </div>
             }
            
            hasMore={(search)? ((searchResults.length)>5) : true}
            next={(search) ? (()=>getSearchResults(searchValue)) : getApiData}
            >
            <Table stickyHeader={true} style={{width: '80vw', height: '50vh'}}>
            <TableHead style={{width: "80vw",paddingRight: "5vw",fontSize: ".05vh"}}>
              
              <TableRow style={{ width: '95vw',position: "fixed", margin: "0 3vh 0 0"}}>
              <TableCell style={{background: "#273D49CC"}} ><input type="checkbox"></input></TableCell>
              <TableCell className={classes.hcell} >Customer Name</TableCell>
              <TableCell className={classes.hcell} >Customer#</TableCell> 
              <TableCell className={classes.hcell} >Order#</TableCell> 
              <TableCell  className={classes.hcell} >Order Amount</TableCell> 
              <TableCell  className={classes.hcell} >Due Date</TableCell> 
              <TableCell className={classes.hcell} >Predicted Payment Date</TableCell>  
              <TableCell className={classes.hcell} >Predicted Aging Bucket</TableCell> 
              <TableCell className={classes.hcell} >Notes</TableCell> 
              </TableRow>
            </TableHead>
            <br></br><br></br><br></br>
            <TableBody>
              {(search) ? 
              searchResults.map((row) => {
                var x= row;
                const isItemSelected = isSelected(row.doc_id);
                console.log(isItemSelected)
//
                
                if(pred!==null){
                  var l= pred.map((item)=> item['doc_id']);
                  if(l.includes(row['doc_id']))
                  {
                    var p= pred.filter((item)=> item['doc_id']===row['doc_id'])
                    console.log("P",row['doc_id']," ",l,p[0]);
                    return (
                      <TableRow
                      hover
                      onClick={() => handleClick(x)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      // key={row.name}
                      // selected={isItemSelected}
                      ><TableCell style={{background: "#273D49CC"}} padding="checkbox">
                     
                      <input type="checkbox"></input>
                      </TableCell>
                        
                        <TableCell className={classes.rcell}>{p[0]['name_customer']}</TableCell>
                        <TableCell className={classes.rcell}>{p[0]['cust_number']}</TableCell>
                        <TableCell className={classes.rcell}>{p[0]['doc_id']}</TableCell>
                        <TableCell className={classes.rcell}>{(p[0]['total_open_amount']/1000).toFixed(2)}K</TableCell>
                        <TableCell className={classes.rcell}>
                          {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', dateStyle: 'long' }).format(new Date(row['due_in_date']))}  
                        </TableCell>
                        <TableCell className={classes.rcell}>
                        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', dateStyle: 'long' }).format(new Date(p[0]['clear_date']))}  
                        </TableCell>
                        <TableCell className={classes.rcell}>
                        { (p[0]['predictions']<=15) ? "0-15 Days" :
                          ((p[0]['predictions']>15)&&(p[0]['predictions']<=30)) ? "16-30 Days" :
                          ((p[0]['predictions']>30)&&(p[0]['predictions']<=45)) ? "31-45 Days" :
                          ((p[0]['predictions']<15)&&(p[0]['predictions']<15)) ? "46-60 Days" : "Greater than 60 Days"
                        }
                            
                        </TableCell>
                        <TableCell className={classes.rcell}>{(row['notes']==='null') ?  "Lorem Ipsum" : row['notes']}</TableCell>

                      </TableRow>
                    )
                  }}

                
//
  
                return (
              <TableRow
              hover
              onClick={() => handleClick(x)}
              role="checkbox"
              
              tabIndex={-1}
              
              ><TableCell style={{background: "#273D49CC"}} padding="checkbox">
             
              <input type="checkbox" ></input>
              </TableCell>
               
                <TableCell className={classes.rcell}>{row['name_customer']}</TableCell>
                <TableCell className={classes.rcell}>{row['cust_number']}</TableCell>
                <TableCell className={classes.rcell}>{row['doc_id']}</TableCell>
                <TableCell className={classes.rcell}>{(row['total_open_amount']/1000).toFixed(2)}K</TableCell>
                <TableCell className={classes.rcell}>
                    {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', dateStyle: 'long' }).format(new Date(row['due_in_date']))}  
                  </TableCell>
                <TableCell className={classes.clearcell}>--</TableCell>
                <TableCell className={classes.clearcell}>--</TableCell>
                <TableCell className={classes.rcell}>{(row['notes']==='null') ?  "Lorem Ipsum" : row['notes']}</TableCell>

              </TableRow>
                )})
               : props.records.records.map((row) => {
                  var x= row;
                  const isItemSelected = isSelected(row.doc_id);
                  console.log(isItemSelected)
//  
                  if(pred!==null){
                  var l= pred.map((item)=> item['doc_id']);
                  if(l.includes(row['doc_id']))
                  {
                    var p= pred.filter((item)=> item['doc_id']===row['doc_id'])
                    console.log("P",row['doc_id']," ",l,p[0]);
                    return (
                      <TableRow
                      hover
                      onClick={() => handleClick(x)}
                      role="checkbox"
                      
                      tabIndex={-1}
                      
                      ><TableCell style={{background: "#273D49CC"}} padding="checkbox">
                     
                      <input type="checkbox"></input>
                      </TableCell>
                       
                        <TableCell className={classes.rcell}>{p[0]['name_customer']}</TableCell>
                        <TableCell className={classes.rcell}>{p[0]['cust_number']}</TableCell>
                        <TableCell className={classes.rcell}>{p[0]['doc_id']}</TableCell>
                        <TableCell className={classes.rcell}>{(p[0]['total_open_amount']/1000).toFixed(2)}K</TableCell>
                        <TableCell className={classes.rcell}>
                          
                          {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', dateStyle: 'long' }).format(new Date(row['due_in_date']))}  
                        </TableCell>
                        <TableCell className={classes.rcell}>
                        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', dateStyle: 'long' }).format(new Date(p[0]['clear_date']))}  
                        </TableCell>
                        <TableCell className={classes.rcell}>
                        { (p[0]['predictions']<=15) ? "0-15 Days" :
                          ((p[0]['predictions']>15)&&(p[0]['predictions']<=30)) ? "16-30 Days" :
                          ((p[0]['predictions']>30)&&(p[0]['predictions']<=45)) ? "31-45 Days" :
                          ((p[0]['predictions']<15)&&(p[0]['predictions']<15)) ? "46-60 Days" : "Greater than 60 Days"
                        }
                            
                        </TableCell>
                        <TableCell className={classes.rcell}>{(row['notes']==='null') ?  "Lorem Ipsum" : row['notes']}</TableCell>
      
                      </TableRow>
                    )
                  }}
//                 

                  return (
                <TableRow
                hover
                onClick={() => handleClick(x)}
                role="checkbox"
               
                tabIndex={-1}
                
                ><TableCell style={{background: "#273D49CC"}} padding="checkbox">
               
                <input type="checkbox"></input>
                </TableCell>
                  
                  <TableCell className={classes.rcell}>{row['name_customer']}</TableCell>
                  <TableCell className={classes.rcell}>{row['cust_number']}</TableCell>
                  <TableCell className={classes.rcell}>{row['doc_id']}</TableCell>
                  <TableCell className={classes.rcell}>{(row['total_open_amount']/1000).toFixed(2)}K</TableCell>
                  <TableCell className={classes.rcell}>
                    {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', dateStyle: 'long' }).format(new Date(row['due_in_date']))}  
                  </TableCell>
                  <TableCell className={classes.clearcell}>--</TableCell>
                  <TableCell className={classes.clearcell}>--</TableCell>
                  <TableCell className={classes.rcell}>{(row['notes']==='null') ?  "Lorem Ipsum" : row['notes']}</TableCell>

                </TableRow>
              )})}
            </TableBody>
            </Table>

            </InfiniteScroll>
            </TableContainer>
            </Paper>
=======
import './innerCompoment.css';
import { Paper,TableHead ,lighten, makeStyles} from '@material-ui/core';

function InnerComponent()
{


        return(
            <div className="Page">
             <Paper>
                 <TableHead>
                 </TableHead>
             </Paper>
>>>>>>> 3b8ae91a9eb9b70badcdddc3ca45e7ae08e26776
            </div>
        )

}

<<<<<<< HEAD
const mapStateToProps = (state) => {
  console.log("INIT", state);
  return {
    records: state.records,
    selected: state.checks,
  };
};

const mapDispatchToProps = (dispatch) => ({
 
  addRecord: (data) => dispatch(addRecord(data)),
  addChecked: (data) => dispatch(addChecked(data)),
  delMore: (data) => dispatch(delMore(data))  
  
});
export default connect(mapStateToProps, mapDispatchToProps)(InnerComponent);

//The logic of the displaying data is simple, if nothing is searched a false flag is set and it displays whole data
//from calling AllShow api, When something is searched it is a true flag is set and all matching data is shown after 
//calling Search Api.
//Redux strore is maintained in the whole App to deal with selected and unselected data/records/table row.
=======
export default InnerComponent;
>>>>>>> 3b8ae91a9eb9b70badcdddc3ca45e7ae08e26776
