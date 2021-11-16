import React from 'react';
import {AddPatientMedicalInfo} from "./addPatientMedicalInfo";
import { MainButtonInput} from "./mainComponent/mainButtonInput";
import {FetchPatientMedicalInfo} from "./fetchPatientMedicalInfo";
function PatientMedicalInformation(props){
    const { patientId } = props;
    
    return(
        <>
        <FetchPatientMedicalInfo/>
        <AddPatientMedicalInfo/>

        <div className="text-right add_top_30">
            <MainButtonInput onClick={props.data}>Next</MainButtonInput>
        </div>
        </>

        
    )
}
export {PatientMedicalInformation}