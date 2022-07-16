import { API } from "../config";
import { React } from 'react';
import { Link } from "react-router-dom";
import { Modal} from "react-bootstrap";
import { SetTiming } from "./setTiming";
import { useState,useEffect } from "react";
import { useParams }from "react-router-dom";
import { FaVideo, FaWalking, FaRupeeSign } from "react-icons/fa"
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming}  from "../recoil/atom/SetDoctorSessionTiming";

function SetSession(props){
    const { doctorId } = useParams();
    const { clinicId } = props;
    const [clinicIds] = useState(clinicId);
    const [dayName, setDayNames] = useState();
    const [showtime, setShowTime] = useState(false);
    const [fetchTime, setfetchTime] = useRecoilState(SetDoctorSessionTiming);

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

    const handleShow = (e, dayName) =>{
        e.preventDefault();
        setShowTime(true)
        setDayNames(dayName)
    };
    
    //setTiming component
    const handleTimeClick = (e) => {
        handleClose();
    };
    
    useEffect(()=>{
        getAllSession()
    },[])

    function getAllSession(){
        fetch(`${API}/fetchtime`, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            doctorId: doctorId,
            clinicId: clinicId
            })
            }).then(res =>{
                if(res){
                    return res.json()
                }
            }).then(jsonRes => {
                let byDay = jsonRes.reduce((r, a) => {
                    r[a.day] = [...r[a.day] || [], a];
                    return r;
                }, {});
                setfetchTime(byDay)
            });
    }
return(
    <div className="container">
        <ul>
            {daysKeys.map((item ,index)=>
                <li className="sessionlink" key ={index}>
                    <div className="col-lg-12 ml-auto">
                        <div className="row">
                            <div className="col-md-2">
                                {dayList[item]}
                            </div>
                            
                            {fetchTime[item]
                                ?<div className="col-md-10">
                                    <span>
                                        {new Date(fetchTime[item][0].fromTime).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit',timeZone: 'Asia/Kolkata'})}
                                        - 
                                        {new Date(fetchTime[item][0].toTime).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Kolkata'})}  
                                        <FaRupeeSign/>
                                        {fetchTime[item][0].fees}/-  {(fetchTime[item][0].Appointment ==="VideoAppointment")
                                            ?<FaVideo/>
                                            :<FaWalking/>}
                                    </span>
                                </div>
                                : <Link to ="#" onClick={e => handleShow(e, item)} className="sessionlistlink">
                                    Set Session Timing
                                </Link>
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
                <SetTiming clinicId={clinicIds} day={dayName} onSubmit={handleTimeClick} />
            </Modal.Body>
        </Modal>
    </div>
    )
}
export {SetSession}