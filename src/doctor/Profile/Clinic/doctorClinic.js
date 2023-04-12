import {useHistory} from "react-router-dom";
import {AddDoctorClinicInfo}  from "./Partial/AddDoctorClinicInfo";
import {AddDoctorOwnClinicInfo} from "./Partial/addDoctorOwnClinicInfo";
import { useParams} from "react-router-dom";
import { MainButtonInput} from "../../../mainComponent/mainButtonInput";

function DoctorClinic(){
    const {doctorId} = useParams()
    let history = useHistory();
    function onChangeClinic(){
        history.push(`/dashboard/${doctorId}`);
    }
    return(
        <>
            <div className="row">
                <AddDoctorClinicInfo/>
                
                <AddDoctorOwnClinicInfo/>
            </div>
            
            <div className="text-right add_top_30">
                <MainButtonInput onClick={onChangeClinic}>Done</MainButtonInput>
            </div>
        </>
    )
}
export{DoctorClinic}