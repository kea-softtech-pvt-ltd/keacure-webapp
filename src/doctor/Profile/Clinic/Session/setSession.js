import { API } from "../../../../config";
import { React } from 'react';
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { SetTiming } from "./setTiming";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaVideo, FaWalking, FaRupeeSign } from "react-icons/fa"
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming } from "../../../../recoil/atom/SetDoctorSessionTiming";
import { updateSession } from '../../../../recoil/atom/setUpdateSession'
// import ModalHeader from "react-bootstrap/esm/ModalHeader";
import SetUpdateTime from "./setUpdateTime";
import AuthApi from "../../../../services/AuthApi";
function SetSession(props) {
    const { doctorId } = useParams();
    const { clinicId } = props;
    // const [clinicIds] = useState(clinicId);
    const [dayName, setDayNames] = useState();
    const [showtime, setShowTime] = useState(false);
    const [updateTime, setUpdateTime] = useState(false);
    const [fetchTime, setfetchTime] = useRecoilState(SetDoctorSessionTiming);
    const [fetchUpdateTime, setfetchUpdateTime] = useRecoilState(updateSession);
    const [updateItem, setUpdateItem] = useState();
    const { allSessions } = AuthApi()
    const dayList = {
        "sun": "Sunday",
        "mon": "Monday",
        "tue": "Tuesday",
        "wed": "Wednesday",
        "thu": "Thursday",
        "fri": "Friday",
        "sat": "Saturday",
    }
    const daysKeys = Object.keys(dayList)

    const handleClose = () => setShowTime(false);

    const handleShow = (e, day) => {
        console.log("day----------", day)
        e.preventDefault();
        setShowTime(true)
        setDayNames(day)
    };
    //setTiming component
    const handleTimeClick = () => {
        handleClose();
    };

    const handleUpdateClose = () => setUpdateTime(false);

    const handleUpdate = (e, item) => {
        e.preventDefault();
        setUpdateTime(true);
        setUpdateItem(item)
    }
    const handleUpdateTimeClick = () => {
        handleUpdateClose();
    }

    useEffect(() => {
        getAllSession()
    }, [])

    async function getAllSession() {
        const dataId = {
            doctorId: doctorId,
            clinicId: clinicId
        }
        await allSessions(dataId)
            .then(jsonRes => {
                let byDay = jsonRes.reduce((allDayData, singleDayData) => {
                    allDayData[singleDayData.day] = [...allDayData[singleDayData.day] || [], singleDayData];
                    return allDayData;
                }, {});
                setfetchTime(byDay)
                setfetchUpdateTime(byDay)
            });
    }
    return (
        <div className="container">
            <ul>
                {daysKeys.map((item, index) =>
                    <li className="sessionlink" key={index}>
                        <div className="col-lg-12 ml-auto">
                            <div className="row">
                                <div className="col-md-2">
                                    {dayList[item]}
                                </div>
                                {fetchUpdateTime[item]
                                    ? <div className="col-md-10">
                                    {/* {console.log("fetchUpdateTime[item]",fetchUpdateTime[item])} */}
                                        <Link onClick={(e) => handleUpdate(e, fetchUpdateTime[item])} >
                                            <span>
                                                {new Date(fetchUpdateTime[item][0].fromTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                                                -
                                                {new Date(fetchUpdateTime[item][0].toTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                                                <FaRupeeSign />
                                                {fetchUpdateTime[item][0].fees}/-  {(fetchUpdateTime[item][0].Appointment === "VideoAppointment")
                                                    ? <FaVideo />
                                                    : <FaWalking />}
                                            </span>
                                        </Link>
                                    </div>
                                    : (
                                        <>
                                            {fetchTime[item]
                                                ? <div className="col-md-10">
                                                    <Link onClick={(e) => handleUpdate(e, fetchTime[item])} >
                                                        <span>
                                                            {new Date(fetchTime[item][0].fromTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                                                            -
                                                            {new Date(fetchTime[item][0].toTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                                                            <FaRupeeSign />
                                                            {fetchTime[item][0].fees}/-  {(fetchTime[item][0].Appointment === "VideoAppointment")
                                                                ? <FaVideo />
                                                                : <FaWalking />}
                                                        </span>
                                                    </Link>
                                                </div>
                                                : <Link to="#" onClick={(e) => handleShow(e, item)} className="sessionlistlink">
                                                    Set Session Timing
                                                </Link>
                                            }</>
                                    )
                                }

                            </div>
                        </div>
                    </li>
                )}
            </ul>

            <Modal show={showtime} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SetTiming clinicId={clinicId} day={dayName} onSubmit={handleTimeClick} />
                </Modal.Body>
            </Modal>
            <Modal show={updateTime} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SetUpdateTime day={dayName} update={updateItem} onSubmit={handleUpdateTimeClick} />
                </Modal.Body>
            </Modal>
        </div>
    )
}
export { SetSession }