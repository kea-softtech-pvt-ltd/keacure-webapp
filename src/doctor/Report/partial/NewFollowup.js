import React from 'react';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import AuthApi from '../../../services/AuthApi';
export default function NewFollowup(props) {
    //for datepicker
    const { insertNewFollowUpDate } = AuthApi()
    const { onChange, reportId } = props
    const [date, setDate] = useState();

    console.log("======new_follow_up_Date", date)
    const addDatePicker = (date) => {
        setDate(date)
    }
    const addNode = async () => {
        const bodyData = {
            "new_follow_up": date,
        }
        console.log("bodyData===", bodyData)
        await insertNewFollowUpDate({ reportId }, bodyData)
        alert("Save successfully")
    }
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
            <div className="text-center add_top_30"><input type="submit" onClick={addNode} className="btn_1" value="Add" /></div>
            <div className="text-center add_top_30"><input type="submit" onClick={onChange} className="btn_1" value="Consultation Completed" /></div>
        </div>
    )
}