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

    const { doctorId } = useParams()
    let history = useHistory();
    const classes = useStyles();
    const [patientList, setPatientList] = useState([]);
    const [patientListHistory, setPatientListHistory] = useState([]);
    const { getPatientListDetails, MedicineReportData } = AuthApi()
    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientListHistory.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientListHistory.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)

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
        await MedicineReportData(bodyData)
            .then((res) => {
                history.push(`/patientlist/consultation/${item._id}/${res._id}`)
            })
    }
    const date = () => {
        const data = patientList.filter((patient) => {
            if (patient.status === "Ongoing") {
                return patientList;
            }
        })
        setPatientListHistory(data)
    }
    //For Pagination
    function prePage() {
        if (activePageNo !== 1) {
            setActivePageNo(activePageNo - 1)
        }
    }
    function changeCPage(id) {
        setActivePageNo(id)
    }
    function nextPage() {
        if (activePageNo !== nPage) {
            setActivePageNo(activePageNo + 1)

        }
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
                                            {records.map((details, i) => {
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
                                                                <Link
                                                                    onClick={() => saveData(details)}
                                                                    className="patientlistlink">
                                                                    <button className="consultationbtn btn btn-primary">
                                                                        Start Consultation
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <nav aria-label="" className="add_top_20">
                                    <ul className="pagination pagination-sm">
                                        <li className="page-item">
                                            <Link className="page-link"
                                                to="#" onClick={prePage}>
                                                Previous
                                            </Link>
                                        </li>
                                        {
                                            number.map((n, i) => {
                                                return (
                                                    <li className={`page-item ${activePageNo === n ? 'active' : ""}`} key={i}>
                                                        <Link className="page-link"
                                                            to="#" onClick={() => changeCPage(n)}>
                                                            {n}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                        <li className="page-item">
                                            <Link className="page-link"
                                                to="#" onClick={nextPage}>
                                                Next
                                            </Link>
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