import React, { useState } from 'react';
import {AddPatientMedicalInfo} from "../patient/addPatientMedicalInfo";
import { MainButtonInput} from "../mainComponent/mainButtonInput";
import {FetchPatientMedicalInfo} from "../patient/fetchPatientMedicalInfo";

function PatientMedicalInformation(props){
    const { patientId } = props;
    const [ showMedicalInfo , setShowMedicalInfo] = useState(false)
    
    function handleRecordAdded(){
        setShowMedicalInfo(true)
    }
    return(
        <>
            <FetchPatientMedicalInfo patientId={patientId}/>
            {showMedicalInfo === false ?
            <AddPatientMedicalInfo patientId={patientId} addMedicalRecord ={handleRecordAdded}/>
            :
            null}

            <div className="text-right add_top_30">
                <MainButtonInput onClick={props.Medical}>Next</MainButtonInput>
            </div>
        </>

        
    )
}
export {PatientMedicalInformation}