import {useHistory} from "react-router-dom";
import {AddDoctorClinicInfo}  from "./Partial/AddDoctorClinicInfo";
import {AddDoctorOwnClinicInfo} from "./Partial/addDoctorOwnClinicInfo";
import { useParams} from "react-router-dom";

function DoctorClinic(){
    const {doctorId} = useParams()
  
    return(
        <>
            <div className="row">
                <AddDoctorClinicInfo/>
                
                <AddDoctorOwnClinicInfo/>
            </div>
            
            
        </>
    )
}
export{DoctorClinic}