import React, { useEffect, useState } from "react";
import { API } from "../config";
import { Link } from "react-router-dom";
import { FaVideo, FaWalking} from "react-icons/fa";
import {ShowDoctorVideoAppointment} from "../doctor/showDoctorVideoAppointment";
import {ShowDoctorInClinicAppointment} from "../doctor/showDoctorInClinicAppointment";
import axios from "axios";

const DoctorAppointmentType = (props)=>{
    const { _id,doctorId } = props.clinicData;
    const [showVideoSlot ,setShowVideoSlot] = useState(false)    
    const [showClinicSlot ,setShowClinicSlot ] = useState(false)
    const [clinicSession , setClinicSession] = useState([[],[]])

    console.log("clinicSession=====",clinicSession)
    
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

    const fetchSessionSlots = (`${API}/fetcSessionSlots/${doctorId}/${_id}`)

    const fetchSessionData = async () =>{
        const result = await axios.get(fetchSessionSlots); 
        let tempSessions = [] 
        const videoClinics = getDataBySpeciality(result.data, "VideoAppointment") 
        tempSessions.push(videoClinics)
        const inClinics = getDataBySpeciality(result.data, "InClinicAppointment") 
        tempSessions.push(inClinics)
        setClinicSession(tempSessions)    
    }

    function getDataBySpeciality(data, flag) {
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
                        <ShowDoctorVideoAppointment clinicId={_id} setSessions ={clinicSession[0]}/>
                    :null}
                </ul>
            ):"Slots Not Available"}    
        </div>  
        <div className="box_list home">
            {clinicSession[1].length > 0 ?(   
                <ul>     
                    <li><Link to="" onClick={getInClinicSlot}><FaWalking/>  Book InClinic Appointment</Link></li>
                    {showClinicSlot === true?
                        <ShowDoctorInClinicAppointment clinicId={_id} setSessions = {clinicSession[1]}/>
                    :null}
                </ul>
            ):"Slots Not Available"} 
        </div>
        </>
    )
}
export {DoctorAppointmentType}