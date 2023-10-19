import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
// import { useParams }from "react-router-dom";
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState } from 'recoil';
import { updateSession } from "../../../../recoil/atom/setUpdateSession";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput, MainInputBox } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import moment from 'moment';
import SessionApi from '../../../../services/SessionApi';
function SetUpdateTime(props) {
    // const { doctorId, clinicId, ItemId } = useParams();
    const { update } = props;
    const { doctorId, clinicId, _id, day } = props.update[0];
    const [error, setError] = useState("");
    const [updateSessionTime, setUpdateSessionTime] = useRecoilState(updateSession)
    const [selectedSlots, setSelectedSlots] = useState([])
    const [sessionTime, setSessionTime] = useState([])
    const [showSelectedSlots, setShowSelectedSlots] = useState([])
    const { updateSessionData, getUpdatedSessionSlotData } = SessionApi()
    const handleInputChange = event => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
    };
    useEffect(() => {
        UpdatedData()
    }, [])

    const UpdatedData = () => {
        getUpdatedSessionSlotData(_id)
            .then((res) => {
                setSessionTime(res[0])
            })
    }
    const handleChange = (event) => {
        let temp = []
        temp = showSelectedSlots
        const { name, value } = event.target;
        if (event.target.checked) {
            temp.push({
                time: value,
                status: false
            })

        } else {
            let time = temp.filter(function (item, index) {
                return (item.time !== value)
            })
            temp = time
        }
        setShowSelectedSlots(temp)
    }

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
        const toTime = sessionTime.time;

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

    function handleTimeClick(e) {
        e.preventDefault();
        const setTimeData = {
            clinicId: clinicId,
            doctorId: doctorId,
            fromTime: moment(sessionTime.fromTime).format("HH:mm"),
            toTime: moment(sessionTime.toTime).format("HH:mm"),
            timeSlot: sessionTime.timeSlot,
            showSelectedSlots: showSelectedSlots,
            Appointment: 'InClinicAppointment',
            fees: sessionTime.fees,
            day: day
        }
        if (sessionTime.fromTime < sessionTime.toTime) {
            updateSessionData(_id, setTimeData)
                .then((response) => {
                    console.log("===>>>", response)
                    let setTime = {}
                    setTime[day] = [response]
                    setUpdateSessionTime({ ...updateSessionTime, ...setTime })
                    props.onSubmit();
                });
        } else {
            setError("please enter valid time")
        }
    }

    return (

        <div className="col-lg-12" >
            <form onSubmit={handleTimeClick}>
                <h5>{day}</h5>
                <div className="row">
                    <div className="col-lg-6">
                        <label><b>Select Time Slot</b></label>
                        <MainSelect
                            name="timeSlot"
                            defaultValue="20 min"
                            onChange={handleInputChange}
                            value={sessionTime.timeSlot} >
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
                                    onChange={handleChange}
                                    value={item} name="selectedSlots">
                                    <label className="btn_1">{item}</label>
                                </MainInputBox>
                            </div>
                        ))}
                    </section>
                    : null}

                {/* <div className="options">
                    <div className="row">
                        <div className="col-lg-6 p-2 ml-2">
                            <MainInputBox
                                type="radio"
                                name="Appointment"
                                value={sessionTime.Appointment}
                                onChange={handleInputChange}
                                label="In Clinic Appointment">
                                <b  className="p-2">In Clinic Appointment</b>
                            </MainInputBox>
                        </div>
                    </div>
                </div> */}

                <div className="text-center p-2 add_top_30">
                    <MainButtonInput>Set</MainButtonInput>
                </div>
            </form>
        </div >
    )
}
export default SetUpdateTime;
