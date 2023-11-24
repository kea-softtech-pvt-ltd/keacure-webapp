import { useEffect } from "react"
import { useRecoilState } from "recoil";
import { setPatientMedical } from "../recoil/atom/setPatientMedical";
import PatientApi from "../services/PatientApi";

function FetchPatientMedicalInfo(props) {
    const { patientId } = props;
    const [fetchPatientdata, setFetchPatientData] = useRecoilState(setPatientMedical)
    const { getPatientMedical } = PatientApi()


    useEffect(() => {
        getPatientData()
    }, [])

    function getPatientData() {
        getPatientMedical(patientId)
            .then((result) => {
                setFetchPatientData(result)
            })
    }
    return (
        <>
            {fetchPatientdata.map((item, index) => (
                <div className=" ">
                    <div className="underline">
                        <div className="form_title">
                            <h4>Patient Medical</h4>
                        </div>
                    </div>
                    <div className="patientDataStyle">
                        <b>Current Medications</b>
                        <div>{item.cmedication}</div>
                    </div>
                    <div className="patientDataStyle">
                        <div><b>Past Medications</b></div>
                        <div>{item.pmedication}</div>
                    </div>
                    <div className="patientDataStyle">
                        <div><b>Chronic Diseases</b></div>
                        <div>{item.diseases}</div>
                    </div>
                    <div className="patientDataStyle">
                        <div><b>Injuries</b></div>
                        <div>{item.injuries}</div>
                    </div>
                    <div className="patientDataStyle">
                        <div><b>Surgeries</b></div>
                        <div>{item.surgeries}</div>
                    </div>
                </div>
            ))}
        </>
    )
}
export { FetchPatientMedicalInfo }