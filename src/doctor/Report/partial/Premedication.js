import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function Premedication(props) {
    const {onChange}=props
    return (
        <>
            <div className="container">
                <span>Premedication</span>
            </div>
            <CKEditor
                editor={ClassicEditor}
                data="<div>Something write here...</div>"
                onReady={editor => ('Editor is ready to use!' ,  editor)
                }
                onChange={(event, editor) => {
                    const data = editor.getData();
                }}
                onBlur={(event, editor) => ({ event, editor })}

                onFocus={(event, editor) => ({ event, editor })}
            />
            <div className="text-center add_top_30"><input type="submit" onClick={onChange} className="btn_1" value="Add Note" /></div>
        </>
    )
}