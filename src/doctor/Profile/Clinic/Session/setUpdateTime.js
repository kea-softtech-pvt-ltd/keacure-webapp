import React, { useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useRecoilState } from 'recoil';
import { updateSession } from "../../../../recoil/atom/setUpdateSession";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import moment from 'moment';
import SessionApi from '../../../../services/SessionApi';

function SetUpdateTime(props) {
    const { doctorId, clinicId, _id, day } = props.update[0];
    const [error, setError] = useState("");
    const [updateSessionTime, setUpdateSessionTime] = useRecoilState(updateSession)
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [selectedSlots, setSelectedSlots] = useState([])
    const [sessionTime, setSessionTime] = useState([])
    const { updateSessionData, getUpdatedSessionSlotData } = SessionApi()

    useEffect(() => {
        UpdatedData()
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
    };


    const UpdatedData = () => {
        getUpdatedSessionSlotData(_id)
            .then((res) => {
                setSessionTime(res[0])
                setFromTime(res[0].fromTime)
                setToTime(res[0].toTime)
                setSelectedSlots(res[0].showSelectedSlots)
                setSelectedSlots
                    (checkTimeSlot
                        (moment(res[0].fromTime)
                            .format("HH:mm"), moment(res[0].toTime)
                                .format("HH:mm"), res[0].timeSlot)
                    )
            })
    }

    const checkTimeSlot = (fromTime, toTime, interval) => {
        const startTime = moment(fromTime, "HH:mm");
        const endTime = moment(toTime, "HH:mm")
        const allTimes = [];
        while (startTime < endTime) {
            allTimes.push({ time: startTime.format("HH:mm"), status: true }); //Push times
            startTime.add(interval, 'minutes');//Add interval of selected minutes
        }
        return allTimes
    }

    const handleToTimeSelection = (time) => {
        setToTime(time);
        setSelectedSlots(checkTimeSlot(moment(fromTime).format('HH:mm'), moment(time).format('HH:mm'), sessionTime.timeSlot))
    }

    const handleFromTimeSelection = (time) => {
        setFromTime(time);
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
        let newState = [...selectedSlots]
        newState[index]["status"] = !selectedSlots[index]["status"]
        setSelectedSlots(newState);
    }

    function handleTimeClick(e) {
        e.preventDefault();
        const setTimeData = {
            clinicId: clinicId,
            doctorId: doctorId,
            fromTime: fromTime,
            toTime: toTime,
            timeSlot: sessionTime.timeSlot,
            showSelectedSlots: selectedSlots.filter((e) => e.status === true),
            Appointment: 'InClinicAppointment',
            fees: sessionTime.fees,
            day: day
        }
        if (sessionTime.fromTime < sessionTime.toTime) {
            updateSessionData(_id, setTimeData)
                .then((response) => {
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
                            defaultValue="15 min"
                            onChange={handleInputChange}
                            value={sessionTime.timeSlot} >
                            <option selected="selected" value={15}> 15 min</option>
                            <option value={20}> 20 min</option>
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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        value={moment(sessionTime.fromTime).format("HH:mm")}
                                        name="fromTime"
                                        ampm={false}
                                        //minutesStep={5}
                                        onChange={handleFromTimeSelection}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label><b>To Time</b></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    value={moment(sessionTime.toTime).format("HH:mm")}
                                    ampm={false}
                                    name="toTime"
                                    minutesStep={5}
                                    onChange={handleToTimeSelection}
                                />
                            </LocalizationProvider>
                            {error && (<span className="validation"> {error} </span>)}
                        </div>
                    </div>
                </div>

                {selectedSlots ?
                    <section className="borderSlots">
                        {selectedSlots.map((item, index) => (
                            <div key={index}>
                                <div
                                    id="ck-button"
                                    style={item.status === false ?
                                        { backgroundColor: 'rgb(228, 217, 217)', color: 'black' }
                                        : null}
                                >
                                    <label>
                                        <input
                                            onChange={(event) => handleChange(event, index)}
                                            type="checkbox"
                                            checked={item.status ? true : false}
                                            value="1"
                                            name="selectedSlots"
                                        />
                                        <span>{item.time}</span>
                                    </label>
                                </div>
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
