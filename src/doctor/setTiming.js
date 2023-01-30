import { API } from "../config";
import React from 'react';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useParams }from "react-router-dom";
import { TimePicker , MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming}  from "../recoil/atom/SetDoctorSessionTiming";
import { MainButtonInput} from "../mainComponent/mainButtonInput";
import { MainInput, MainInputBox } from '../mainComponent/mainInput';
import { MainSelect } from '../mainComponent/mainSelect';
import moment from 'moment';

function SetTiming(props){
    const { doctorId } = useParams();
    const { clinicId, day } = props;
    const [ error , setError] = useState("");
    const [ coilSessionTimining ,setCoilSessionTimining] = useRecoilState(SetDoctorSessionTiming)
    const [ selectedSlots ,setSelectedSlots] = useState([])
    const [showSelectedSlots ,setShowSelectedSlots] = useState([])
    
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

    const handleChange = (event) =>{
        console.log(event.target.checked)
        let temp = []
        temp = showSelectedSlots
        const { name, value } = event.target;
        if(event.target.checked) {
            temp.push({
                slotTime: value,
                status: 0
            })
            
        } else {
            let time = temp.filter(function(item, index){
                return (item.slotTime != value)
            })
            temp = time
        }
        setShowSelectedSlots(temp)
    }

    const handleFromTimeSelection =(time)=> {
        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['fromTime']:time
            }
        })
    }

    const handleToTimeSelection =(time)=>{
        setSessionTime(sessionTime =>{
            return{
                ...sessionTime,
                ['toTime']:time
            }
        })

        //for time slots
        const interval = sessionTime.timeSlot;
        const fromTime = sessionTime.fromTime;
        const toTime = sessionTime.time;
        console.log("fromTime",fromTime)
        console.log("totime",time)
       
        const startTime = moment(fromTime, "HH:mm");
        const endTime = moment(time, "HH:mm")
        
        const allTimes = [];
        //Loop over the times - only pushes time with 20 or 30 minutes interval
        while (startTime < time) {
            allTimes.push(startTime.format("HH:mm")); //Push times
            startTime.add(interval, 'minutes');//Add interval of selected minutes
        }
        setSelectedSlots(allTimes)
    }

    async function handleTimeClick(e){
        e.preventDefault();
        const setTimeData  = {
            clinicId          :   clinicId,
            doctorId          :   sessionTime.doctorId,
            fromTime          :   sessionTime.fromTime,
            toTime            :   sessionTime.toTime,
            timeSlot          :   sessionTime.timeSlot,
            showSelectedSlots :   showSelectedSlots,
            Appointment       :   sessionTime.Appointment,
            fees              :   sessionTime.fees,
            day               :   sessionTime.day
        }
        const res = await axios.post(`${API}/setSession`, setTimeData)
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

                {selectedSlots ?
                    <section className="borderSlots"> 
                    {selectedSlots.map((item,index)=>(
                        <div key={index}>
                            <MainInputBox type="checkbox" onChange={handleChange} value={item} name="selectedSlots" ><label className="btn_1">{item}</label></MainInputBox>
                        </div>
                    ))}
                    </section>
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
