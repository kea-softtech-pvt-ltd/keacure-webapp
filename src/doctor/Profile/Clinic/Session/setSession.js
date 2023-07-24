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
import Confirmation from "../../Confirmation"
import { Icon } from '@material-ui/core';
function SetSession(props) {
    const { doctorId } = useParams();
    const { clinicId } = props;
    // const [clinicIds] = useState(clinicId);
    const [dayName, setDayNames] = useState();
    const [showtime, setShowTime] = useState(false);
    const [updateTime, setUpdateTime] = useState(false);
    const [fetchTime, setfetchTime] = useRecoilState(SetDoctorSessionTiming);
    // console.log("=====fetchTime>>>>", fetchTime)
    const [fetchUpdateTime, setfetchUpdateTime] = useRecoilState(updateSession);
    // console.log("=====>fetchUpdateTime>>>", fetchUpdateTime)
    const [updateItem, setUpdateItem] = useState();
    const [deleteItem, setDeleteItem] = useState([]);
    const { allSessions, deleteSlot } = AuthApi()
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
        console.log("======item", item)
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
            clinicId: clinicId,
            isDeleted: false
        }
        await allSessions(dataId)
            .then(jsonRes => {
                console.log("======json", jsonRes)
                setDeleteItem(jsonRes)
                let byDay = jsonRes.reduce((allDayData, singleDayData) => {
                    allDayData[singleDayData.day] = [...allDayData[singleDayData.day] || [], singleDayData];
                    return allDayData;
                }, {});
                setfetchTime(byDay)
                setfetchUpdateTime(byDay)
            });
    }



    const deleteSlotData = async (item) => {
        const deleteData = deleteItem.filter((i) => {
            if (i.day === item) {
                return i
            }
        })
        const slotId = deleteData[0]._id
        await deleteSlot(slotId)
        getAllSession()
    }
    return (
        <div className="container">
            <ul>
            <Confirmation/>
                {daysKeys.map((item, index) =>
                    <li className="" key={index}>
                        <div className="my-2 ">
                            <div className="row">
                                <div className="col-md-5">
                                    {dayList[item]}
                                </div>
                                {fetchUpdateTime[item]
                                    ?
                                    <>
                                        <div className="col-md-5" >
                                            <Link onClick={(e) => handleUpdate(e, fetchUpdateTime[item])} >
                                                <span>
                                                    {fetchUpdateTime[item][0].fromTime}
                                                    -
                                                    {fetchUpdateTime[item][0].toTime}
                                                    <FaRupeeSign />
                                                    {fetchUpdateTime[item][0].fees}/- 
                                                     {/* {(fetchUpdateTime[item][0].Appointment === "VideoAppointment") */}
                                                        {/* ? <FaVideo /> */}
                                                         <FaWalking />
                                                </span>
                                            </Link>
                                        </div>

                                        <span className="col-md-2 ">
                                            <Link to="#" onClick={() => deleteSlotData(item)}>
                                                <Icon className="icon-trash-2" style={{ fontSize: 17 }} ></Icon>
                                            </Link>
                                        </span>
                                    </>


                                    : (
                                        <>
                                            {fetchTime[item]
                                                ?
                                                <> <div className="col-md-6" >
                                                    <Link onClick={(e) => handleUpdate(e, fetchTime[item])} >
                                                        <span>
                                                            {fetchTime[item][0].fromTime}
                                                            -
                                                            {fetchTime[item][0].toTime}
                                                            <FaRupeeSign />
                                                            {fetchTime[item][0].fees}/-  
                                                            {/* {(fetchTime[item][0].Appointment === "VideoAppointment") */}
                                                                {/* ? <FaVideo /> */}
                                                                : <FaWalking />
                                                        </span>
                                                    </Link>

                                                </div>
                                                </>
                                                :
                                                <div className="col-md-6">
                                                    <Link to="#" onClick={(e) => handleShow(e, item)} className="">
                                                        Set Session Timing
                                                    </Link>
                                                </div>
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