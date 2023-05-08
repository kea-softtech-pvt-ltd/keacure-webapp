import React from 'react';
import { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams, useHistory } from "react-router-dom";
import moment from 'moment';
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
    // console.log("PatientId---------",patientId)
    const { doctorId } = useParams()
    //for datepicker
    const [value, onChange] = useState(new Date());
    let history = useHistory();
    const classes = useStyles();
    //for fetch json data
    const [patientList, setPatientList] = useState([]);
    // let { url } = useRouteMatch();
    const [patientListHistory, setPatientListHistory] = useState([]);
    const { getPatientListDetails, MedicineReportData } = AuthApi()
    useEffect(() => {
        getPatientDetails();
        date();
    }, [patientList])

    async function getPatientDetails() {
        const result = await getPatientListDetails({ doctorId });
        setPatientList(result)
    }

    async function saveData(item) {
        const bodyData = {
            "doctorId": doctorId,
            "patientId": item.patientId,
            'patientAppointmentId': item._id,
            'clinicId': item.clinicId
        }
        console.log("--------------------------", bodyData)
        await MedicineReportData(bodyData)
            .then((res) => {
                history.push(`/patientlist/consultation/${item._id}/${res._id}`)
            })
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
                                                                <Link onClick={() => saveData(details)} className="patientlistlink">{<button className="consultationbtn btn btn-primary">Start Consultation </button>}</Link>
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