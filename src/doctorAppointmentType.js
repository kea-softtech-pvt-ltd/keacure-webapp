import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaWalking} from "react-icons/fa";
import {ShowDoctorVideoAppointment} from "./showDoctorVideoAppointment";
import {ShowDoctorInClinicAppointment} from "./showDoctorInClinicAppointment";
import axios from "axios";

const DoctorAppointmentType = (props)=>{
    const { _id,doctorId } = props.clinicData
    const [showVideoSlot ,setShowVideoSlot] = useState(false)    
    const [showClinicSlot ,setShowClinicSlot ] = useState(false)
    const [clinicSession , setClinicSession] = useState([[],[]])

    const getVideoSlot =(e)=>{
        e.preventDefault();
        setShowVideoSlot(true)
    }
    const getInClinicSlot =(e)=>{
        e.preventDefault();
        setShowClinicSlot(true)
    }
    useEffect(()=>{
        fetchSessionData()
    },[])

    const fetchSessionData = async () =>{
        const result = await axios.get( `http://localhost:9000/api/fetcSessionSlots/${doctorId}/${_id}`); 
        let tempSessions = [] 
        const videoClinics = getDataBySpeciality(result.data, "VideoAppointment") 
        tempSessions.push(videoClinics)
        const inClinics = getDataBySpeciality(result.data, "InClinicAppointment") 
        tempSessions.push(inClinics)
        console.log(tempSessions)
        setClinicSession(tempSessions)    
    }

    function getDataBySpeciality(data, flag) {
        console.log("getDataBySpeciality", flag)
        const result = data.filter(function(val, key){
            return (val.Appointment == flag)
        })
        return result;
    }

    return (
        <>
        <div className="box_list home">
            {clinicSession[0].length > 0 ?(   
                <ul> 
                    <li><Link to="" onClick={getVideoSlot}><FaVideo/>  Book Video Appointment</Link></li>
                    {showVideoSlot === true?
                        <ShowDoctorVideoAppointment setSessions ={clinicSession[0]}/>
                    :null}
                </ul>
            ):"Slots Not Available"}    
        </div>  
        <div className="box_list home">
            {clinicSession[1].length > 0 ?(   
                <ul>     
                    <li><Link to="" onClick={getInClinicSlot}><FaWalking/>  Book InClinic Appointment</Link></li>
                    {showClinicSlot === true?
                        <ShowDoctorInClinicAppointment setSessions = {clinicSession[1]}/>
                    :null}
                </ul>
            ):"Slots Not Available"} 
        </div>
        </>
    )
}
export {DoctorAppointmentType}