import React from 'react';
import { useState ,useEffect} from "react";
import Icon from '@material-ui/core/Icon';
import { FetchExperience} from "./fetchExperience";
import { AddDoctorProfessionalExperience} from "./addDoctorProfessionalExperience";
import { Link } from '@material-ui/core';
import { MainButtonInput} from "./mainComponent/mainButtonInput";

function DoctorProfessionalExperience(props){
    //for add new fiels (experience)
    const [showExperience, setShowExperience] = useState(false);
    function handleAdd() {
        setShowExperience(!showExperience)
    }

    function handleRecordAdded(){
        setShowExperience(true)
    }

return(
    <>
        <FetchExperience/>           
        <Link to="#" onClick={() => handleAdd()}>
            <Icon className="addiconbutton" style={{ fontSize: 25 }}>add</Icon>
        </Link>
        
        {showExperience === false ?(
            <div>
                <AddDoctorProfessionalExperience addRecords={handleRecordAdded}/>
            </div>
        ):null
        }  
        <div className="text-right add_top_30">
            <MainButtonInput onClick={props.data}>Next</MainButtonInput>
        </div>
    </>
    )
}
export{DoctorProfessionalExperience}