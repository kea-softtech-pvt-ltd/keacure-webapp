import React from 'react';
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { FaClinicMedical } from 'react-icons/fa';
import AppointmentsApi from '../../services/AppointmentsApi';
import ReportApi from '../../services/ReportApi';
import ReactPaginate from 'react-paginate';


export default function PatientList(props) {
    const { doctorId } = props
    let history = useHistory();
    const [patientList, setPatientList] = useState(null);
    const [show, setShow] = useState(false);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { MedicineReportData, } = ReportApi()
    const { getPatientListDetails, cancelPatientAppointment, updateIncompleteStatus } = AppointmentsApi()

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage])

    const handleCancelShow = (details) => {
        setId(details._id)
        setShow(true)
    }

    const handleClose = () => setShow(false)

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

    const pageSize = 6;
    function getPatientDetails(currentPage) {
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result, i) => {
                const totalPages = result.totalOngoingPages;
                setTotalPages(totalPages)
                setPatientList(result.ongoing)
                const data = result['test']
                data.filter((data) => {
                    const patientAppointmentId = data._id;
                    if (moment(data.selectedDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD ") && data.status !== "Completed" && data.status !== "Cancelled") {
                        const bodyData = {
                            'status': "Incomplete"
                        }
                        updateIncompleteStatus(patientAppointmentId, bodyData)
                    }
                })
            })
    }

    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails(currentPage)
                handleClose()
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1)
    }
    const handleShowProfile = (patientId) => {
        history.push(`/patientdata/${patientId}`)
    }
    return (
        <>
            {patientList ?
                <div className='row'>
                    {patientList.map((details, i) => {
                        return (
                            <>
                                {!details.dependentId ?
                                    <div key={i} className="col-md-4 ">
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
                                                <Link onClick={() => handleCancelShow(details)} >
                                                    <button className='btn btn-default helperBtn'>Cancel</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    : <div key={i} className="col-md-4 ">
                                        <div className="cardDiv">
                                            <div className='cardSpan row'>
                                                <div align='left' className='col-md-8' >
                                                    <i className=' icon-user color patientListIcon' />
                                                    <span className=' patientName'>{details['dependentDetails'][0].name}</span>
                                                </div>
                                                <div className='col-md-3' >
                                                    <span className='dependent'>Dependent</span>
                                                </div>
                                            </div>
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
                                                <Link onClick={() => handleCancelShow(details)} >
                                                    <button className='btn btn-default helperBtn ' >Cancel</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        )
                    })}
                </div >
                : null}

            {patientList ?
                <>
                    <div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={totalPages}
                            previousLabel="< Previous"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={2}
                            containerClassName="pagination "
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </div>
                </>
                : <div className="clinicHistory" ><b>Data is not Available</b></div>}
            <Modal show={show} onHide={handleClose} >
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
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal >

        </>
    )
}