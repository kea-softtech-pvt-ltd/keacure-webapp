import { useEffect, useState } from "react";
import AppointmentsApi from "../../../services/AppointmentsApi";
import moment from 'moment';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import Sharing from "./Sharing";

const { getStorage, ref, getDownloadURL } = require("firebase/storage");

export default function CompletedAppointment(props) {
    const {doctorId} = props;
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getPatientListDetails, downloadPrescription } = AppointmentsApi()

    const storage = getStorage();

    useEffect(() => {
        getPatientHistory(currentPage);
    }, [currentPage])
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    // function changeCPage() {
    //     setCurrentPage(currentPage * 15)
    // }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    function getPatientHistory() {
        const pageSize = 6;
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result) => {
                console.log('==---==', result)
                const totalPages = result.totalCompletedPages;
                setTotalPages(totalPages)
                setPatientHistoryData(result.completed)
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
    return (
        <>
            <div className='row'>
                {patientHistoryData.map((details, i) => {
                    console.log('===details.medicalReportId',details)
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
                                            <Sharing reportId={details.medicalReportId} />
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
                                            <Sharing reportId={details.medicalReportId} />
                                        </div>
                                    </div>
                                </div>}
                        </>
                    )

                })}
            </div>
            <ul className="pagination pagination-sm">
                <li className="page-item">
                    <Link className="page-link"
                        to="#" onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Link>
                </li>

                {/* <li className='page-item '>
                    <Link className="page-link"
                        to="#" onClick={() => changeCPage()}>
                        {currentPage}
                    </Link>
                </li> */}

                <li className="page-item">
                    <Link className="page-link"
                        to="#" onClick={handleNextPage}
                        disabled={currentPage === totalPages}>
                        Next
                    </Link>
                </li>

            </ul>
        </>
    )
}