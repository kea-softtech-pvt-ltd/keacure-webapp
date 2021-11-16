function FetchPatientMedicalInfo(){
    return(
        <>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="form-group">
                        <label><b>Allergies</b></label>
                    </div>
                    
                    <label><b>Current Medications</b></label>
                    

                    <label><b>Past Medications</b></label>
                    
                </div>

                <div className="col-md-6 ">
                    <label><b>Chronic Diseases</b></label>
                   

                    <label><b>Injuries</b></label>
                    

                    <label><b>Surgeries</b></label>
                           
                </div>
            </div>
        </>
    )
}
export {FetchPatientMedicalInfo}