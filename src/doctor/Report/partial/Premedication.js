import React, { useState } from "react";
import AuthApi from "../../../services/AuthApi";
export default function Premedication(props) {
    const { insertPremedicationNote } = AuthApi();
    const [premedication_note, setPremedication_note] = useState('')
    const { onChange, reportId } = props;
    const handleChange = (event) => {
        setPremedication_note(event.target.value);
    }

    const addNode = async () => {
        const bodyData = {
            "premedication_note": premedication_note,
        }
        await insertPremedicationNote({ reportId }, bodyData)
        onChange()
    }
    return (
        <>
            <div className=" container mx-3" >
                <span >Doctor Premedication Note</span>
                <textarea
                    type="text"
                    value={premedication_note}
                    onChange={handleChange}
                    style={{ width: 950 }}
                    className="form-control"
                    name="investigation_note"
                    placeholder="Write Something"
                />
            </div>

            <div className="text-center medicinebtn mt-15 add_top_30">
                <input
                    type="submit"
                    onClick={addNode}
                    className="btn_1"
                    value="Add Note"
                />
            </div>
        </>
    )
}