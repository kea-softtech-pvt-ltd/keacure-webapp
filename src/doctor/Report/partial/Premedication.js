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
                <span >Doctor Investigation Note</span>
                <textarea
                    type="text"
                    value={premedication_note}
                    onChange={handleChange}
                    style={{ width: 950 }}
                    className="form-control"
                    name="investigation_note"
                    placeholder=""
                />
            </div>
            {/* <CKEditor
                editor={ClassicEditor}
                data="<div>Something write here...</div>"
                onReady={editor => ('Editor is ready to use!' ,  editor)
                }
                onChange={(event, editor) => {
                    const data = editor.getData();
                }}
                onBlur={(event, editor) => ({ event, editor })}

                onFocus={(event, editor) => ({ event, editor })}
            /> */}
            <div className="text-center add_top_30"><input type="submit" onClick={addNode} className="btn_1" value="Add Note" /></div>
        </>
    )
}