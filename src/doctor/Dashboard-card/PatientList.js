import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams, useHistory } from "react-router-dom";
import moment from 'moment';
import AuthApi from "../../services/AuthApi";
// import { MainNav } from '../../mainComponent/mainNav';
// import UserLinks from './partial/uselinks';
// import { Wrapper } from '../../mainComponent/Wrapper';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { FaClinicMedical } from 'react-icons/fa';
// import { Icon } from '@material-ui/core';

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

export default function PatientList(props) {
    const { doctorId } = props
    let history = useHistory();
    const classes = useStyles();
    const [patientList, setPatientList] = useState([]);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [showDelete, setShowDelete] = useState(false);
    const [id, setId] = useState()
    const [active, setActive] = useState(false)
    const { getPatientListDetails, MedicineReportData, cancelPatientAppointment } = AuthApi()

    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 6;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientList.slice(firstIndex, lastIndex)
    console.log("===records", records)
    const nPage = Math.ceil(patientList.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)

    useEffect(() => {
        getPatientDetails();
    }, [])

    const handleDeleteShow = (details) => {
        setId(details._id)
        setShowDelete(true)
    }

    const handleDeleteClose = () => setShowDelete(false)

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
        console.log("===>>>>>", result)
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
    async function cancelAppointment(id) {
        await cancelPatientAppointment(id)
        getPatientDetails()
        handleDeleteClose()
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
        // <Wrapper>
            <>
            {/* <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Appoinment</li>
                    <li>
                        <Link onClick={() => setActive(true)} >
                            <Icon className="addiconbutton " style={{ fontSize: 50 }}>add</Icon>
                        </Link>
                    </li>
                </ul>
            </MainNav> */}
            {/* <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                /> */}
                {/* <div className="common_box"> */}
                    <div className='row'>
                        {records.map((details, i) => {
                            return (
                                <>
                                    <div className="col-md-4 ">
                                        <div className="cardDiv">
                                            <span className='cardSpan '>
                                                <i className='icon-user color patientListIcon' />
                                                <span className='patientName'>{details['patientDetails'][0].name}</span>
                                            </span>
                                            <span className='cardSpan'>
                                                <i className='icon-mobile-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details['patientDetails'][0].mobile}</span>
                                            </span>
                                            <span className='cardSpan '>
                                                <i className=' color patientListIcon ml-1 mr-2' ><FaClinicMedical /> </i>
                                                <span className='patinetInfo '> {details['clinicList'][0].clinicName}</span>
                                            </span>
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span className='slotTime'>{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                                    <span className='timeSlot'>
                                                        <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                        {details.timeSlot} Min.
                                                    </span>
                                                </span>
                                            </span>

                                            <div className='cardSpan appointmentBtn'>
                                                <Link to="#" onClick={() => saveData(details)}>
                                                    <button className="btn appColor helperBtn ">Start Consultation</button>
                                                </Link>
                                                <Link onClick={() => handleDeleteShow(details)} >
                                                    <button className='btn btn-default helperBtn ' >Cancel</button>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>

                                </>
                            )

                        })}
                    </div>
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
                    <Modal show={showDelete} onHide={handleDeleteClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are You Sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="alert alert-danger">You Want To Delete This Appoinment. </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" className='appColor' onClick={() => cancelAppointment(id)}>
                                Yes
                            </Button>
                            <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                                No
                            </Button>

                        </Modal.Footer>
                    </Modal>
                {/* </div > */}
            {/* </div> */}
        </>
        // </Wrapper>
    )
}