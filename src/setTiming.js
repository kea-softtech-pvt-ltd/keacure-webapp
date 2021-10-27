import React from 'react';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useParams }from "react-router-dom";
import { TimePicker , MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming}  from "./recoil/atom/SetDoctorSessionTiming";
import { MainButtonInput} from "./mainComponent/mainButtonInput";
import { MainInput, MainInputBox } from './mainComponent/mainInput';
import { MainSelect } from './mainComponent/mainSelect';

function SetTiming(props){
    const { doctorId } = useParams();
    const { clinicId, day } = props;
    const [ error , setError] = useState("");
    const [ toTime, setToTime ] = useState(new Date())
    const [ coilSessionTimining ,setCoilSessionTimining] = useRecoilState(SetDoctorSessionTiming)
    const [ sessionTime ,setSessionTime]= useState({
        clinicId:clinicId,
        doctorId:doctorId,
        fromTime:new Date(),
        toTime:new Date(),
        timeSlot:20,
        fees:"",
        day:day,
        Appointment:" "
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
    };

    const handleFromTimeSelection =(time)=> {
        const timeStep = sessionTime.timeSlot
        const toTime = new Date(  time.getTime()  + timeStep*60000);
        setToTime(toTime)
        checkTime(time, toTime)
        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['fromTime']:time
            }
        })

        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['toTime']:toTime
            }
        })
    }

    function checkTime(from, to) {
        if(from.getTime() >= to.getTime()) {
            setError("please select valid time")
        }
        else{
            setError("")
        }
    }
    
    const handleToTimeSelection =(time)=>{
        checkTime(sessionTime.toTime, time)
        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['toTime']:time
            }
        })
    }

    async function handleTimeClick(e){
        e.preventDefault();
        const setTimeData  = {
            clinicId      :   clinicId,
            doctorId      :   sessionTime.doctorId,
            fromTime      :   sessionTime.fromTime,
            toTime        :   sessionTime.toTime,
            timeSlot      :   sessionTime.timeSlot,
            Appointment   :   sessionTime.Appointment,
            fees          :   sessionTime.fees,
            day           :   sessionTime.day
        }
        const res = await axios.post(`http://localhost:9000/api/setSession`, setTimeData)
        .then(res =>{
            let setTime = {}
            setTime[sessionTime.day] = [res.data]
            setCoilSessionTimining({...coilSessionTimining, ...setTime}) 
            props.onSubmit();
        });
    }
    
    return(
        <div className="col-lg-12">
            <form onSubmit={handleTimeClick}>    
                <h5>{day}</h5>
                <div className="row">
                    <div className="col-lg-6">
                        <label><b>Select Time Slot</b></label>
                        <MainSelect name="timeSlot" defaultValue="20 min" onChange={handleInputChange} value={sessionTime.timeslot} >
                            <option selected="selected" value={20}> 20 min</option>
                            <option value={30}> 30 min</option>
                        </MainSelect>
                    </div>

                    <div className="col-lg-6">
                        <label><b>Clinic Fees</b></label>
                        <MainInput type="text" name="fees" onChange={handleInputChange} value={sessionTime.fees} placeholder="Enter fees" ></MainInput>
                    </div>  
                </div> 

                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <div className="k-widget k-timepicker">
                                <label><b>From Time</b></label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    renderInput={(props) => <TextField {...props} />} 
                                    value={sessionTime.fromTime} 
                                    name="fromTime" 
                                    ampm={false} 
                                    minutesStep= {5}
                                    onChange={handleFromTimeSelection}
                                />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </div> 

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label><b>To Time</b></label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker 
                                    renderInput={(props) => <TextField {...props} />}
                                    value={sessionTime.toTime}   
                                    ampm={false} 
                                    name="toTime" 
                                    minutesStep= {5}
                                    onChange={handleToTimeSelection} 
                                />
                            </MuiPickersUtilsProvider>
                            {error && (<span className="validation"> {error} </span>)}
                        </div>
                    </div>   
                </div>
                 
                <div className="options">
                    <div className="row">
                        <div className="col-lg-6">
                            <MainInputBox type="checkbox"  name="Appointment"  value="VideoAppointment" onChange={handleInputChange} label="Video Appointment">
                                <b>Video Appointment</b>
                            </MainInputBox>
                        </div>
                        <div className="col-lg-6">
                            <MainInputBox type="checkbox"  name="Appointment"  value="InClinicAppointment" onChange={handleInputChange} label="In Clinic Appointment">
                                <b>In Clinic Appointment</b>
                            </MainInputBox>
                        </div>
                    </div>  
                </div>
                <div className="text-center add_top_30">
                    <MainButtonInput>Set</MainButtonInput>
                </div> 
            </form>
        </div>
    )
}
export {SetTiming}
