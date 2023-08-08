import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from 'moment';
import AuthApi from "../../services/AuthApi";
import { MainNav } from '../../mainComponent/mainNav';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const config = require("../../firebase.config");
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
    const { doctorId } = useParams();
    const classes = useStyles()
    const history = useHistory()
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [drId, setDrId]=useState('')
    const { getPatientListDetails } = AuthApi()
    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientHistoryData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientHistoryData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)
    initializeApp(config.firebaseConfig);
    const storage = getStorage();
    useEffect(() => {
        getPatientHistory();
    }, [])

    async function getPatientHistory() {
        const result = await getPatientListDetails({ doctorId });
        const data = result.filter((patientData) => {
            if (patientData.status === "Completed") {
                return result;
            }
        })
        setPatientHistoryData(data)
    }

    const downloadPdf = async (details) => {
        const reportId = details.medicalReportId
        await getDownloadURL(ref(storage, `files/invoice-64b8c47f1f0a4e0428803442.pdf`))
            .then((url) => {
                // console.log("---->>>>>", url)
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                // console.log("----xhr>>>>>", xhr)

                xhr.responseType = 'blob';
                xhr.open('GET', url);
                xhr.onload = function () {
                    var blob = new Blob([xhr.response], { type: 'application/pdf' });
                    // console.log("----xhr>>>>>", blob)
                    // if (this.status == 200) {
                    //     var blob = new Blob([xhr.response], { type: 'application/pdf' });
                    //     console.log("----xhr>>>>>", blob)

                    // var link = document.createElement('a');
                    // link.href = url;
                    // link.download = "document.pdf";
                    // link.click();
                    // console.log("Nice!");
                    // } else {
                    //     console.log("Error. Estatus " + this.status + ".");
                    // }
                }
                xhr.open('GET', url);
                xhr.send()
            })
            .catch((error) => {
                console.log("error", error)
            });
    }
    const patientHistory = (details) => {
        console.log("========details", details)
        // console.log("======//////", details)
        // setReportId(details.medicalReportId)
        history.push(`/patient-history/${details.medicalReportId}`, { data: { doctorId: details.doctorId } })
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
                        {/* {records && records} */}
                        {records.map((details, i) => {
                            return (
                                <>
                                    {
                                        details.dependentId ? (
                                            <div className="col-md-4">
                                                <div className="cardDiv">
                                                    <span className='cardSpan'>
                                                        <i className='icon-user color patientListIcon' />
                                                        <span className=' patientName'>
                                                            {details['dependentDetails'][0].name}
                                                        </span>
                                                    </span>
                                                    <span className='cardSpan'>
                                                        <i className='icon-mobile-1 color patientListIcon' />
                                                        {details['dependentDetails'][0].mobile}
                                                    </span>
                                                    <span className='cardSpan '>
                                                        <i className='icon-hospital-1 color patientListIcon' />
                                                        {details['clinicList'][0].clinicName}
                                                    </span>
                                                    <span className='cardSpan time'>
                                                        <i className='pe-7s-date m-1 color patientListIcon' />
                                                        {moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                                        <span className=' timeSlot'>
                                                            <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                            {details.timeSlot} Min.
                                                        </span>
                                                    </span>

                                                    <div className='cardSpan appointmentBtn historyBtn'>
                                                        <Link to="#" onClick={() => patientHistory(details)}>
                                                            <Button className="appColor helperBtn" > View</Button>
                                                        </Link>
                                                        <a className='helperBtn' target="blank" onClick={() => downloadPdf(details)} download>
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="col-md-4 ">
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
                                                        <Link to="#" onClick={(e) => patientHistory(details, e)}>
                                                            <Button className="appColor helperBtn" > View</Button>
                                                        </Link>
                                                        <a className='helperBtn' target="blank" onClick={() => downloadPdf(details)} download>
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
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
                </div>
            </div>
        </Wrapper>
    )
}