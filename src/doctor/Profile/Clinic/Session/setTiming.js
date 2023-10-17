import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming } from "../../../../recoil/atom/SetDoctorSessionTiming";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput, MainInputBox } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import moment from 'moment';
import AuthApi from "../../../../services/AuthApi";
import SessionApi from '../../../../services/SessionApi';
function SetTiming(props) {
    const { doctorId } = useParams();
    const { clinicId, day } = props;
    const [error, setError] = useState("");
    const [coilSessionTimining, setCoilSessionTimining] = useRecoilState(SetDoctorSessionTiming)
    const [selectedSlots, setSelectedSlots] = useState([])
    const [showSelectedSlots, setShowSelectedSlots] = useState([])
    const { setSessionTimeData } = SessionApi()
    const [sessionTime, setSessionTime] = useState({
        clinicId: clinicId,
        doctorId: doctorId,
        fromTime: (moment(new Date()).format('HH:mm')),
        toTime: (moment(new Date()).format('HH:mm')),
        timeSlot: 20,
        fees: "",
        day: day,
        Appointment: " "
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
    };

    const handleFromTimeSelection = (time) => {
        setSessionTime(sessionTime => {
            return {
                ...sessionTime,
                ['fromTime']: time
            }
        })
    }
    const handleToTimeSelection = (time) => {
        setSessionTime(sessionTime => {
            return {
                ...sessionTime,
                ['toTime']: time
            }
        })

        //for time slots
        const interval = sessionTime.timeSlot;
        const fromTime = sessionTime.fromTime;
        const startTime = moment(fromTime, "HH:mm");
        const allTimes = [];
        //Loop over the times - only pushes time with 20 or 30 minutes interval
        while (startTime < time) {
            allTimes.push({ time: startTime.format("HH:mm"), status: true }); //Push times
            startTime.add(interval, 'minutes');//Add interval of selected minutes
        }
        setSelectedSlots(allTimes)
    }
    const handleChange = (event,index) => {
        // event.preventDefault()
        const { name, value } = event.target;
        setSelectedSlots( {...selectedSlots , name: [value]});
        const slots = [...selectedSlots]
        slots[index]["status"] = !selectedSlots[index]["status"]
        //setChecked(data)
        console.log("====data", slots)
        //const { name, value } = event.target;
        // if (event.target.checked) {
        //     temp.push({
        //         time: value,
        //         status: 0
        //     })
        // } else {
        //     let time = temp.filter(function (item, index) {
        //         return (item.slotTime !== value)
        //     })
        //     temp = time
        // }
        // setShowSelectedSlots(temp)
    }
     function handleTimeClick(e) {
        e.preventDefault();
        const setTimeData = {
            clinicId: clinicId,
            doctorId: sessionTime.doctorId,
            fromTime: moment(sessionTime.fromTime).format("HH:mm"),
            toTime: moment(sessionTime.toTime).format("HH:mm"),
            timeSlot: sessionTime.timeSlot,
            showSelectedSlots: showSelectedSlots,
            Appointment: 'InClinicAppointment',
            fees: sessionTime.fees,
            day: sessionTime.day,
        }
        if (sessionTime.fromTime < sessionTime.toTime) {
             setSessionTimeData(setTimeData)
                .then(res => {
                    let setTime = {}
                    setTime[sessionTime.day] = [res.data]
                    setCoilSessionTimining({ ...coilSessionTimining, ...setTime })
                    props.onSubmit();
                });
        } else {
            setError("Please enter valid time");
        }
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={handleTimeClick}>
                <h5>{day}</h5>
                <div className="row">
                    <div className="col-lg-6">
                        <label><b>Select Time Slot</b></label>
                        <MainSelect
                            name="timeSlot"
                            defaultValue="20 min"
                            onChange={handleInputChange}
                            value={sessionTime.timeSlot}>
                            <option selected="selected" value={20}> 20 min</option>
                            <option value={15}> 15 min</option>
                            <option value={30}> 30 min</option>
                        </MainSelect>
                    </div>

                    <div className="col-lg-6">
                        <label><b>Clinic Fees</b></label>
                        <MainInput
                            type="text"
                            name="fees"
                            onChange={handleInputChange}
                            value={sessionTime.fees}
                            placeholder="Enter fees">
                        </MainInput>
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
                                        minutesStep={5}
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
                                    minutesStep={5}
                                    onChange={handleToTimeSelection}
                                />
                            </MuiPickersUtilsProvider>
                            {error && (<span className="validation"> {error} </span>)}
                        </div>
                    </div>
                </div>

                {selectedSlots ?
                    <section className="borderSlots">
                        {selectedSlots.map((item, index) => (
                            <div key={index}>
                                <MainInputBox
                                    type="checkbox"
                                    // onChange={() => handleChange(index, event)}
                                    onChange={(e) => handleChange(e,index)}
                                    value={item}
                                    name="selectedSlots"
                                    checked={item.status ? true : false}>
                                    <label className="btn_1">
                                        {item.time}
                                    </label>
                                </MainInputBox>
                            </div>
                        ))}
                    </section>
                    : null}

                {/* <div className="options">
                    <div className="row"> */}
                {/* <div className="col-lg-6">
                            <MainInputBox type="radio" name="Appointment" value="VideoAppointment" onChange={handleInputChange} label="Video Appointment">
                                <b>Video Appointment</b>
                            </MainInputBox>
                        </div> */}

                {/* <div className="col-lg-6 p-2 ml-2">
                            <MainInputBox
                                type="radio"
                                name="Appointment"
                                value="InClinicAppointment"
                                onChange={handleInputChange}
                                label="In Clinic Appointment">
                                <b className="p-2">In Clinic Appointment</b>
                            </MainInputBox>
                        </div> */}
                {/* </div>
                </div> */}

                <div className="text-center p-2  add_top_30">
                    <MainButtonInput>Set</MainButtonInput>
                </div>
            </form>
        </div>
    )
}
export { SetTiming }
