import { API } from "../config";
import { useEffect, useState  } from "react";
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import constants from "../common/constant";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import DatePicker from 'react-date-picker';
import { CSVLink } from "react-csv";
import { Link, useRouteMatch ,useParams} from "react-router-dom";

  //for table
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    table: {
        minWidth: 650,
      },
      
  }));
   
export default function PatientList({}){
    const {patientId} = useParams()
    console.log(patientId)
    //for datepicker
    const [value, onChange] = useState(new Date());
    
    const classes = useStyles();
    //for fetch json data
    const [patientList ,setPatientList] =useState([])
    console.log(patientList)
    let { url } = useRouteMatch();
	// useEffect(()=>{
	// 	const result = axios(
	// 		constants.PATIENTLIST_DATA
	// 	);
	// 	setRows(result.data);
	// },[]);

    useEffect(()=>{
        getPatientDetails()
    },[])

    async function getPatientDetails(){
        const result = await axios.get(`${API}/patientById/${patientId}`);
        setPatientList(result.data)
    }
    return(
        <div>
            <main>
                <div className="container margin_120_95">			
                    <div className="row">
                        <div className="col-lg-12 ml-auto">
                            <nav id="secondary_nav">
                                <div className="container">
                                    <span>Patients List</span>
                                </div>
                            </nav>
                            <div className="box_form">
                                <div className="row">
                                    <div className="col-lg-2 "> 
                                    <label>From Date</label>
                                        <DatePicker
                                            className="datepicker"
                                            onChange={onChange}
                                            value={value}
                                            clearIcon= {null} 
                                        />
                                    </div>
                                    <div className="col-lg-2"> 
                                    <label>To Date</label>
                                        <DatePicker
                                            className="datepicker"
                                            onChange={onChange}
                                            value={value}
                                            clearIcon= {null}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <FormControl
                                         className={classes.formControl} >
                                            <NativeSelect className={classes.selectEmpty}>
                                            <option>Walk-In</option>
                                            <option>Ten</option>
                                            <option>Twenty</option>
                                            <option>Thirty</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div> 
                                    <div className="col-lg-3 ">
                                        <CSVLink data={patientList} filename={"my-file.csv"}
                                        className="btn_1"
                                        >
                                        Export CSV
                                    </CSVLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 ml-auto">
                            <div className="box_form">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="medium" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right"><b>Patient Name</b></TableCell>
                                                <TableCell align="right"><b>Appointment Date</b></TableCell>
                                                <TableCell align="right"><b>Patient Contact</b></TableCell>
                                                <TableCell align="right"><b>Mode of Appointment</b></TableCell>
                                                <TableCell align="right"><b>Mode of Payment</b></TableCell>
                                                <TableCell align="right"><b>Action</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {/* {patientList.map((row) => ( */}
                                            <TableRow>
                                                <TableCell align="right">{patientList.name}</TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right">{patientList.mobile}</TableCell>
                                                <TableCell align="right">{patientList.Appointment}</TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right">
                                                    <div className="linklist">
                                                        <Link className="patientlistlink"  to={`OPD/${patientList.id}`}>{<i className="icon_pencil-edit" title="print"></i>}</Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        {/* ))} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                     
                                <nav aria-label="" className="add_top_20">
                                    <ul className="pagination pagination-sm">
                                        <li className="page-item disabled">
                                            <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
                                        </li>
                                        <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                        <li className="page-item">
                                            <Link className="page-link" to="#">Next</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}