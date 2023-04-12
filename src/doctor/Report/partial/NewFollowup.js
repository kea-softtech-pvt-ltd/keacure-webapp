import React from 'react';
import DatePicker from 'react-date-picker';
import {useState} from 'react';
export default function NewFollowup(props) {
    //for datepicker
    const {onChange}=props
    const [date, setDate] = useState(new Date());
    return (
        <div onChange={onChange}>
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
                            onChange={setDate}
                            value={date}
                            clearIcon={null}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center add_top_30"><input type="submit" onClick={onChange} className="btn_1" value="Add" /></div>
        </div>
    )
}