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
import { MainNav } from '../../mainComponent/mainNav';
import UserLinks from './partial/uselinks';
import { Wrapper } from '../../mainComponent/Wrapper';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
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
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    const { getPatientListDetails, MedicineReportData, cancelPatientAppointment } = AuthApi()

    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientList.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientList.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)

    useEffect(() => {
        getPatientDetails();
    }, [])

    async function saveData(item) {
        const bodyData = {
            "doctorId": doctorId,
            "patientId": item.patientId,
            'patientAppointmentId': item._id,
            'clinicId': item.clinicId,
            "fees": item.fees
        }
        await MedicineReportData(bodyData)
            .then((res) => {
                history.push(`/consultation/${res._id}`, { data: { fees: item.fees } })
            })
    }
    async function getPatientDetails() {
        const result = await getPatientListDetails({ doctorId });
        patientData(result)
    }
    const patientData = (list) => {
        const data = list.filter((patient) => {
            if (patient.status === "Ongoing") {
                return patient;
            }
        })
        setPatientList(data)
    }
    async function cancelAppointment(details) {
        const id = details._id
        await cancelPatientAppointment(id)
        getPatientDetails()
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
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Appoinment</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="common_box">
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
                                                        onClick={() => cancelAppointment(details)}
                                                        className="patientlistlink">
                                                        <button className="consultationbtn btn btn-primary">
                                                            Cancel
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="linklist">
                                                    {/* {setPatientFees(details.fees)} */}
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
        </Wrapper>
    )
}