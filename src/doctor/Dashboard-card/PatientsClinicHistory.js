import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import AuthApi from "../../services/AuthApi";
import axios from 'axios';
import { API } from '../../config';
import FileDownload from 'js-file-download';

import {
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableCell
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120
    },
    selectEmpty: {
    },
    table: {
        minWidth: 650
    }
}))

export default function PatientsClinicHistory() {
    const { doctorId } = useParams()
    const classes = useStyles()
    const history = useHistory()
    const [patientDetails, setPatientDetails] = useState([]);
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const { getPatientListDetails } = AuthApi()
    const [reportId, setReportId]=useState()
    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientHistoryData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientHistoryData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)

    useEffect(() => {
        getPatientHistory();
        date();
    }, [patientDetails])

    async function getPatientHistory() {
        const result = await getPatientListDetails({ doctorId });
        setPatientDetails(result)
        setReportId(result[0].medicalReportId)
    }
    const date = () => {
        const data = patientDetails.filter((patientData) => {
            if (patientData.status === "Completed") {
                return patientDetails;
            }
        })
        setPatientHistoryData(data)
    }

    const patientHistory = (details) => {
        history.push(`/patient-history/${details._id}`)
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
    //for PDF Download

    const download =async (e) => {
        e.preventDefault();
        const result = await axios({
            url:(`${API}/createprescriptionpdf/${reportId}`),
            method:'GET',
            responseType:"blob"
        }).then((res)=>{
            console.log("-----res-======", res)
           FileDownload(res.data,'invoice.pdf')
        })
        return result;
        console.log("------======", result)
    }
    return (
        <main>
            <div className="container margin_120_95">
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        <nav id="secondary_nav">
                            <div className="container">
                                <span>Patient History</span>
                            </div>
                        </nav>
                        <div className="box_form">
                            <TableContainer component={Paper}>
                                <Table className={classes.table} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>Patient Name</b></TableCell>
                                            <TableCell align="center"><b>Appoinment Date & Time</b></TableCell>
                                            <TableCell align="center"><b>Mobile No.</b></TableCell>
                                            <TableCell align="center"><b>Age</b></TableCell>
                                            <TableCell align="center"><b>Clinic Name</b></TableCell>
                                            <TableCell align="center"><b>Paid Fees</b></TableCell>
                                            <TableCell align="center"><b>Actions</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {records && records.map((details, id) => {
                                        return (
                                            <TableRow key={id}>
                                                <TableCell align="center">{details['patientDetails'][0].name}</TableCell>
                                                <TableCell align="center">{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}</TableCell>
                                                <TableCell align="center">{details['patientDetails'][0].mobile}</TableCell>
                                                <TableCell align="center">{details['patientDetails'][0].age}</TableCell>
                                                <TableCell align="center">{details["clinicList"][0].clinicName}</TableCell>
                                                <TableCell align="center">{details.fees}</TableCell>
                                                <TableCell align="center">
                                                    <Link
                                                        onClick=
                                                        {() => patientHistory(details)}>
                                                        <button className="consultationbtn btn btn-primary mx-3" title="print">View</button>
                                                    </Link>
                                                    <a target="blank" href="http://localhost:9000/storage/invoice-123123.pdf" download>
                                                        Download
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
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
    )
}