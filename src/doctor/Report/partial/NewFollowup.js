import React from 'react';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import AuthApi from '../../../services/AuthApi';
import { useHistory } from 'react-router-dom';
export default function NewFollowup(props) {
    //for datepicker
    const { insertNewFollowUpDate, UpdateStatusBookingdata, createPDF } = AuthApi()
    const { onChange, reportId, appointmentId } = props
    const [date, setDate] = useState();
    let history = useHistory()
    const addDatePicker = (date) => {
        setDate(date)
    }
    const addNode = async () => {
        console.log("----------", date)
        const bodyData = {
            "new_follow_up": date,
        }
        await insertNewFollowUpDate({ reportId }, bodyData)
        alert("Save successfully")
    }
    const getPrescriptionData = async () => {
        const bodyData = {
            "status": "Completed",
            "medicalReportId": reportId
        }
        await UpdateStatusBookingdata({ appointmentId }, bodyData)
            .then((res) => {
                history.push(`/dashboard/${res.doctorId}`)
            })
            await createPDF({reportId})
    };
    return (
        <div >
            <div className="row">
                <div className="col-lg-2">
                    <div className="form-group">
                        <b>Follow-Up:</b>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="form-group">
                        <DatePicker
                            className="datepicker"
                            onChange={addDatePicker}
                            value={date}
                            clearIcon={null}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center add_top_30">
                <input
                    type="submit"
                    onClick={addNode}
                    className="btn_1 medicinebtn"
                    value="Add"
                />
                <input
                    type="submit"
                    onClick={getPrescriptionData}
                    className="btn_1 medicinebtn"
                    value="Consultation Completed"
                />
            </div>
        </div>
    )
}