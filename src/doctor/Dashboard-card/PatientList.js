import { API } from "../../config";
import { useEffect, useState } from "react";
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
import constants from "../../common/constant";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import DatePicker from 'react-date-picker';
import { CSVLink } from "react-csv";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import moment from 'moment';
import { getMonth } from "date-fns";
import AuthApi from "../../services/AuthApi";
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

export default function PatientList() {
    // const {patientId} = useParams()
    const { doctorId } = useParams()
    //for datepicker
    const [value, onChange] = useState(new Date());

    const classes = useStyles();
    //for fetch json data
    const [patientList, setPatientList] = useState([]);
    // let { url } = useRouteMatch();
    const [patientListHistory, setPatientListHistory] = useState([]);
    const { getPatientListDetails } = AuthApi()
    useEffect(() => {
        getPatientDetails();
        date();
    }, [patientList])

    async function getPatientDetails() {
        const result = await getPatientListDetails({doctorId});
        setPatientList(result)
    }
    const date = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDay(),
            year = '' + d.getFullYear();
        if (month.length < 2)
            month = '0' + month
        if (day.length < 2)
            day = '0' + day
        const newDate = [year, month, day].join('-');
        const data = patientList.filter((patient) => {
            if (patient.status === "Ongoing") {
                return patientList;
            }
        })
        setPatientListHistory(data)
    }
    return (
        <div>
            <main>
                <div className="container margin_120_95">
                    <div className="row">
                        <div className="col-lg-12 ml-auto">
                            <nav id="secondary_nav">
                                <div className="container">
                                    <span>Appointment</span>
                                </div>
                            </nav>
                            {/* <div className="box_form">
                                <div className="row">
                                    <div className="col-lg-2 ">
                                        <label>From Date</label>
                                        <DatePicker
                                            className="datepicker"
                                            onChange={onChange}
                                            value={value}
                                            clearIcon={null}
                                        />
                                    </div>
                                    <div className="col-lg-2">
                                        <label>To Date</label>
                                        <DatePicker
                                            className="datepicker"
                                            onChange={onChange}
                                            value={value}
                                            clearIcon={null}
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
                                    </div> */}
                                    {/*                                     
                                    <div className="col-lg-2 ">
                                        <label>Appointment Date</label>
                                        
                                    </div> 
                                    <div>
                                        <text> {patientList.data.date} </text>
                                        </div>
                                    <div className="col-lg-2 ">
                                    <label>Mode of Appointment</label>
                                    </div> */}
                                    {/* <div className="col-lg-3 ">
                                        <CSVLink data={patientList} filename={"my-file.csv"}
                                            className="btn_1"
                                        >
                                            Export CSV
                                        </CSVLink>
                                    </div> */}
                                {/* </div> */}
                            {/* </div> */}
                        </div>
                        <div className="col-lg-12 ml-auto">
                            <div className="box_form">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="medium" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><b>Patient Name</b></TableCell>
                                                <TableCell align="center"><b>Appointment Date & Time</b></TableCell>
                                                <TableCell align="center"><b>Mobile Number</b></TableCell>
                                                <TableCell align="center"><b>Age</b></TableCell>
                                                <TableCell align="center"><b>Clinic Name</b></TableCell>
                                                <TableCell align="center"><b>Paid Fees</b></TableCell>
                                                <TableCell align="center"><b>Consultation</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {patientList.map((row) => ( */}
                                            {patientListHistory.map((details, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell align="center">{details['patientDetails'][0].name}</TableCell>
                                                        <TableCell align="center">{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}</TableCell>
                                                        <TableCell align="center">{details['patientDetails'][0].mobile}</TableCell>
                                                        <TableCell align="center">{details['patientDetails'][0].age}</TableCell>
                                                        <TableCell align="center">{details['clinicList'][0].clinicName}</TableCell>
                                                        <TableCell align="center">{details.fees}</TableCell>
                                                        <TableCell align="center">
                                                            <div className="linklist">
                                                                <Link className="patientlistlink" to={`/patientlist/consultation/${details._id}`}>{<button  className="consultationbtn btn btn-primary"> Consultation Add</button>}</Link>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}

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