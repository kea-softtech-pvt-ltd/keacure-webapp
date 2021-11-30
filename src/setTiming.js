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
import moment from 'moment';

function SetTiming(props){
    const { doctorId } = useParams();
    const { clinicId, day } = props;
    const [ error , setError] = useState("");
    const [ fromTime, setFromTime ] = useState(new Date())
    const [ toTime, setToTime ] = useState()
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

    function checkTime(from, to) {
        if(from.getTime() >= to.getTime()) {
            setError("please select valid time")
        }
        else{
            setError("")
        }
    }

    const handleFromTimeSelection =(time)=> {
        checkTime(sessionTime.fromTime ,time)
        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['fromTime']:time
            }
        })
    }
 
    const handleToTimeSelection =(time)=>{
        const interval = sessionTime.timeSlot;
        const fromTime = sessionTime.fromTime;
        const toTime = sessionTime.toTime;

        const startedTime = new Date()
        const endedTime = new Date()
        var exactFromTime = startedTime.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Kolkata'})
        var exactToTime = endedTime.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Kolkata'})
        console.log(exactFromTime,exactToTime);
    
        let slots = {
            slotInterval: interval,
            openTime: fromTime,
            closeTime: toTime
        };
          
        //Format the time
        let startTime = moment(slots.openTime, "HH:mm");
        
        //Format the end time and the next day to it 
        let endTime = moment(slots.closeTime, "HH:mm").add(1, 'days');
        
        //Times
        let allTimes = [];
        
        //Loop over the times - only pushes time with 30 minutes interval
        while (startTime < endTime) {
        //Push times
        allTimes.push(startTime.format("HH:mm")); 
        //Add interval of 30 minutes
        startTime.add(slots.slotInterval, 'minutes');
        }
        setSessionTime(allTimes)
        console.log(allTimes);

        checkTime(sessionTime.toTime, time)
        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['toTime']:time
            }
        })

        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['fromTime']:fromTime
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
                {toTime ?
                <div className="row">
                    <div className="btn_1">
                        
                    </div>
                </div> 
                :null} 

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
