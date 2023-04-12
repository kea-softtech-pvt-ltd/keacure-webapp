import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function Investigation(props) {

    const {onChange} = props;
    
    return (
        <div onChange={onChange}>
            <div className="container">
                <span>Doctor Investigation Note</span>
            </div>
            <CKEditor
                editor={ClassicEditor}
                data="<div>Something write here...</div>"
            />
            <div className="text-center add_top_30"><input type="button" onClick={onChange} className="btn_1" value="Add Note" /></div>
        </div>
    )
}