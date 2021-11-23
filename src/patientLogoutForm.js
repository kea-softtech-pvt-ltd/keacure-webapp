import { setNewPatientId} from "./recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function PatientLogoutForm(){
    const [patientData , setPatientData] = useRecoilState(setNewPatientId);
    useEffect(() =>{
        setPatientData("")
    }, [])

    return(
        <>
            <div id="login-2">
                {patientData ==""?
                    <h3> Succefully logout..</h3>
                    :
                    null
                }
                
                
            </div>
        </>
    )
}
export default PatientLogoutForm;