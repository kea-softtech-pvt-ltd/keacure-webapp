import React from 'react';
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { FaClinicMedical } from 'react-icons/fa';
import AppointmentsApi from '../../services/AppointmentsApi';
import ReportApi from '../../services/ReportApi';


export default function PatientList(props) {
    const { doctorId } = props
    let history = useHistory();
    const [patientList, setPatientList] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState();
    const { MedicineReportData, } = ReportApi()
    const { getPatientListDetails, cancelPatientAppointment, updateIncompleteStatus } = AppointmentsApi()

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage])

    const handleDeleteShow = (details) => {
        setId(details._id)
        setShowDelete(true)
    }

    const handleDeleteClose = () => setShowDelete(false)

    function saveData(item) {
        const bodyData = {
            "doctorId": doctorId,
            "patientId": item.patientId,
            'patientAppointmentId': item._id,
            'clinicId': item.clinicId,
            "fees": item.fees,
            'dependentId': item.dependentId
        }
        MedicineReportData(bodyData)
            .then((res) => {
                history.push(`/consultation/${res._id}`, { data: { fees: item.fees } })
            })
    }

    function getPatientDetails(currentPage) {
        const pageSize = 6;
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result, i) => {
                const totalPages = result.totalOngoingPages;
                setTotalPages(totalPages)
                setPatientList(result.ongoing)
                result['test'].filter((data) => {
                    const patientAppointmentId = data._id;
                    if (moment(data.selectedDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD ") && data.status !== "Completed" && data.status !== "Cancelled") {
                        const  bodyData= {
                            'status': "Incomplete"
                        }
                        console.log('==bodyData=', bodyData)
                        updateIncompleteStatus(patientAppointmentId,bodyData)
                    }

                    // setPatientAppointmentId(patientAppointmentId)

                })
            })
    }

    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails(currentPage)
                handleDeleteClose()
            })
    }
    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    function changeCPage() {
        setCurrentPage(currentPage * totalPages)
    }
    const handleNextPage = () => {
        if (currentPage === totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleShowProfile = (patientId) => {
        history.push(`/patientdata/${patientId}`)
    }
    return (
        <>

            <div className='row'>
                {patientList.map((details, i) => {
                    return (
                        <>
                            {!details.dependentId ?
                                <div className="col-md-4 ">
                                    <div className="cardDiv">
                                        <span className='cardSpan'>
                                            <i className='icon-user color patientListIcon' />
                                            <span className='patientName '>
                                                <Link to="#" className='underLine' onClick={() => handleShowProfile(details.patientId)}>
                                                    {details['patientDetails'][0].name}
                                                </Link>
                                            </span>
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
                                            <span className='slotTime'>
                                                {moment(details.selectedDate).format('YYYY-MM-DD').toString()},
                                                {details.slotTime}
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
                                                <button className='btn btn-default helperBtn'>Cancel</button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                                : <div className="col-md-4 ">
                                    <div className="cardDiv">
                                        <span className='cardSpan '>
                                            <i className='icon-user color patientListIcon' />
                                            <Link to="#" className='underLine' onClick={() => handleShowProfile(details.dependentId)}>
                                                <span className='patientName'>{details['dependentDetails'][0].name}</span>
                                            </Link>
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
                                                <button className="btn appColor helperBtn">Start Consultation</button>
                                            </Link>
                                            <Link onClick={() => handleDeleteShow(details)} >
                                                <button className='btn btn-default helperBtn ' >Cancel</button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>}
                        </>

                    )

                })}
            </div >

            <ul className="pagination pagination-sm">
                <li className="page-item">
                    <Link className="page-link"
                        to="#" onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Link>
                </li>

                <li className='page-item '>
                    <Link className="page-link"
                        to="#" onClick={() => changeCPage()}>
                        {currentPage}
                    </Link>
                </li>

                <li className="page-item">
                    <Link className="page-link"
                        to="#" onClick={handleNextPage}
                        disabled={currentPage === totalPages}>
                        Next
                    </Link>
                </li>

            </ul>

            <Modal show={showDelete} onHide={handleDeleteClose} >
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
            </Modal >

        </>
    )
}