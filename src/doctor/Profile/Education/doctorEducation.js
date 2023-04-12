import React from 'react';
import Icon from '@material-ui/core/Icon';
import { FetchEducation} from "./Partial/fetchEducation";
import { AddDoctorEducation} from "./Partial/addDoctorEducation";
import { useState} from "react";
import { Link } from '@material-ui/core';
import { MainButtonInput} from "../../../mainComponent/mainButtonInput";

function DoctorEducation(props){
    const [showEducation, setShowEducation] = useState(false);

    function handleAdd() {
        setShowEducation(!showEducation);
    }

    function handleRecordAdded() {
        setShowEducation(true)
    }
    
    return(
        <>     
            <FetchEducation/>
            
            <Link onClick={() => handleAdd()}>
                <Icon className="addiconbutton" style={{ fontSize: 25 }}>add</Icon>
            </Link> 
        
            {showEducation === false ?(
                <div>
                    <AddDoctorEducation recordAdded={handleRecordAdded} />
                </div>
            ):null}
            
            <div className="text-right add_top_30">
                <MainButtonInput onClick={props.data}>Next</MainButtonInput>
            </div>
        </>
    )
}
export {DoctorEducation}