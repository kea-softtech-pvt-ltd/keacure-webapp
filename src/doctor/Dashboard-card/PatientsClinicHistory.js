import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import moment from 'moment';
import AuthApi from "../../services/AuthApi";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import Sharing from './partial/Sharing';
import AppointmentsApi from '../../services/AppointmentsApi';

const { getStorage, ref, getDownloadURL } = require("firebase/storage");


export default function PatientsClinicHistory() {
    const { doctorId } = useParams();
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    const { getPatientListDetails, downloadPrescription } = AppointmentsApi()
    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)

    const recordsPerPage = 5;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientHistoryData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientHistoryData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)
    const storage = getStorage();

    useEffect(() => {
        getPatientHistory();
    }, [])

    async function getPatientHistory() {
        getPatientListDetails({ doctorId })
            .then((result) => {
                const data = result.filter((patientData) => {
                    if (patientData.status === "Completed") {
                        return result;
                    }
                    setPatientHistoryData(data)
                })
            })
    }

    const downloadPdf = (details) => {
        const reportId = details.medicalReportId
        downloadPrescription(reportId)
            .then((result) => {
                let alink = document.createElement('a');
                alink.href = result;
                alink.setAttribute("target", "_blank")
                alink.download = 'Prescription.pdf';
                alink.click();
            })
    }
    // const sharePdf = async (details) => {
    //     const reportId = details.medicalReportId
    //     const result = await downloadPrescription(reportId)
    //     let alink = document.createElement('a');
    //     alink.href = result;
    //     alink.setAttribute("target", "_blank")
    //     alink.download = 'Prescription.pdf';
    //     alink.click();
    //     setIsVisible(true)
    // }

    // const handleHide = () => {
    //     setIsVisible(false)
    // }
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
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Appoinment History</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="common_box">
                    <div className='row'>
                        {records && records.map((details, i) => {
                            return (
                                <>
                                    {!details.dependentId ?
                                        <div key={i} className="col-md-4 ">
                                            <div className="cardDiv">
                                                <span className='cardSpan'>
                                                    <i className='icon-user color patientListIcon' />
                                                    <span className=' patientName'>
                                                        {details['patientDetails'][0].name}
                                                    </span>
                                                </span>
                                                <span className='cardSpan'>
                                                    <i className='icon-mobile-1 color patientListIcon' />
                                                    {details['patientDetails'][0].mobile}
                                                </span>
                                                <span className='cardSpan '>
                                                    <i className='icon-hospital-1 color patientListIcon' />
                                                    {details['clinicList'][0].clinicName}
                                                </span>
                                                <span className='cardSpan time'>
                                                    <i className='pe-7s-date m-1 color patientListIcon' />
                                                    <span className='slotTime'>
                                                        {moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                                        <span className=' timeSlot'>
                                                            <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                            {details.timeSlot} Min.
                                                        </span>
                                                    </span>
                                                </span>

                                                <div className='cardSpan appointmentBtn historyBtn'>
                                                    <Link to={`/patient-history/${details.medicalReportId}`}>
                                                        <Button className="appColor helperBtn" > View</Button>
                                                    </Link>
                                                    <Button className="appColor helperBtn" onClick={() => downloadPdf(details)}> Download</Button>
                                                    {/* <Button className="appColor helperBtn" onClick={sharePdf(details)}>
                                                        <i className="pe-7s-share" style={{ fontSize: 20 }} />
                                                    </Button> */}
                                                    {/* {
                                                        isVisible !== true ?
                                                            <Button className="appColor helperBtn" onClick={() => sharePdf(details)}>
                                                                <i className="pe-7s-share" style={{ fontSize: 20 }} />
                                                            </Button>
                                                            : */}
                                                    <Sharing reportId={details.medicalReportId} />
                                                    {/* } */}
                                                </div>

                                            </div>
                                        </div>
                                        : <div className="col-md-4 ">
                                            <div className="cardDiv">
                                                <span className='cardSpan'>
                                                    <i className='icon-user color patientListIcon' />
                                                    <span className=' patientName'>
                                                        {details['dependentDetails'][0].name}
                                                    </span>
                                                </span>
                                                <span className='cardSpan'>
                                                    <i className='icon-mobile-1 color patientListIcon' />
                                                    {details['patientDetails'][0].mobile}
                                                </span>
                                                <span className='cardSpan '>
                                                    <i className='icon-hospital-1 color patientListIcon' />
                                                    {details['clinicList'][0].clinicName}
                                                </span>
                                                <span className='cardSpan time'>
                                                    <i className='pe-7s-date m-1 color patientListIcon' />
                                                    <span className='slotTime'>
                                                        {moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                                        <span className=' timeSlot'>
                                                            <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                            {details.timeSlot} Min.
                                                        </span>
                                                    </span>
                                                </span>

                                                <div className='cardSpan appointmentBtn historyBtn'>
                                                    <Link to={`/patient-history/${details.medicalReportId}`}>
                                                        <Button className="appColor helperBtn" > View</Button>
                                                    </Link>
                                                    <Button className="appColor helperBtn" onClick={() => downloadPdf(details)}> Download</Button>
                                                    {/* {
                                                        isVisible !== true ?
                                                            <Button className="appColor helperBtn" onClick={() => sharePdf(details)}>
                                                                <i className="pe-7s-share" style={{ fontSize: 20 }} />
                                                            </Button>
                                                            : */}
                                                    <Sharing reportId={details.medicalReportId} />
                                                    {/* // } */}
                                                </div>
                                            </div>
                                        </div>}
                                </>
                            )

                        })}
                    </div>
                    {records.length > 0 ?
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
                        : <div className="clinicHistory" ><b>Data is not Available</b></div>}
                </div>
            </div>
        </Wrapper>
    )
}