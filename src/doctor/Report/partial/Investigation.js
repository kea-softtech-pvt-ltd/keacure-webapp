import React, { useState } from 'react'
import AuthApi from '../../../services/AuthApi';
// import { CKEditor } from 'ckeditor4-react'
export default function Investigation(props) {

    const [investigation_note, setInvestigation_note] = useState("")
    console.log("==============", investigation_note)
    const { onChange, reportId } = props;
    const { insertInvestigationNote } = AuthApi();

    const handleChange = (event) => {
        // const { name, value } = event.target;
        setInvestigation_note(event.target.value);
    }
    const addNode = async () => {
        const bodyData = {
            "investigation_note": investigation_note,
        }
        await insertInvestigationNote({ reportId }, bodyData)
        alert("successfully done")
        onChange()
    }

    return (
        <div >
            <div className=" container mx-3" >
                <span >Doctor Investigation Note</span>
                <textarea
                    type="text"
                    value={investigation_note}
                    onChange={handleChange}
                    style={{ width: 950 }}
                    className="form-control"
                    name="investigation_note"
                    placeholder=""
                />
            </div>

            {/* <CKEditor
                id='edit'
                onChange={handleChange}
                name="investigation_note"
                onSelectionChange={handleChange}
            /> */}


            <div className="text-center add_top_30"><input type="button" onClick={addNode} className="btn_1" value="Add Note" /></div>
        </div>
    )
}