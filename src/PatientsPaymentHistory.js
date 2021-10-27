import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import constants from "./constant";
import {  useState ,useEffect } from "react";
import { Link} from "react-router-dom";

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
        backgroundColor: "#fff"
      },
  }));

export default function PatientsPaymentHistory(){
    const classes = useStyles();
     //fetch patient data 
     let[patientPayment ,setPatientPayment] = useState([2])
     //const[rowsPerPage, setRowsPerPage] = useState([10]);

     useEffect(()=>{
         const result = axios(
             constants.PATIENTPAYMENT_DATA
         );
         setPatientPayment(result.data)
     },[])

//   const handleChangePage = (event, newPage) => {
//     setPatientPayment(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPatientPayment(0);
//   };
    return(
    <main>
        <div className="container margin_120_95">
            <div className="row">
                <div className="col-lg-12 ml-auto">
                    <nav id="secondary_nav">
                        <div className="container">
                            <span>Patient Payment List</span>
                        </div>
                    </nav>
                
                    <div className="box_form">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="box_form">
                                    <TableContainer>
                                        <Table className={classes.table} size="medium" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="right"><b>Patient Name</b></TableCell>
                                                    <TableCell align="right"><b>Patient Id</b></TableCell>
                                                    <TableCell align="right"><b>Payment History</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {patientPayment.map((page) => (
                                                    <TableRow key={page.id}>
                                                        <TableCell align="right">{page.name}</TableCell>
                                                        <TableCell align="right">{page.patientid}</TableCell>
                                                        <TableCell align="right">{page.payment}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        {/* <TablePagination
                            component="Div"
                            count={20}
                            page={patientPayment}
                            onChangePage={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                           /> */}
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

    )
}