import { useEffect } from "react"
import { useRecoilState } from "recoil";
import { setPatientLifestyle } from "../recoil/atom/setPatientLifestyle";
import PatientApi from "../services/PatientApi";

function FetchPatientLifestyleData(props) {
    const { patientId } = props;
    const [fetchPatientdata, setFetchPatientData] = useRecoilState(setPatientLifestyle)
    const { getPatientLifestyle } = PatientApi()

    useEffect(() => {
        getPatientData()
    }, [])

    function getPatientData() {
        getPatientLifestyle(patientId)
            .then((result) => {
                setFetchPatientData(result)
            })
    }
    return (
        <>
            {fetchPatientdata.map((item, index) => (
                <div className=" ">
                        <>
                            <div className="underline">
                                <div className="form_title">
                                    <h4>Patient LifeStyle</h4>
                                </div>
                            </div>
                            <div className="patientDataStyle">
                                <div align='left' className="patientData"><b>Smoking Habits</b></div>
                                <div>{item.smokingHabits}</div>
                            </div>
                            <div className="patientDataStyle">
                                <div align='left' className="patientData"><b>Alcohol Consumption</b></div>
                                <div>{item.alcoholConsumption}</div>
                            </div>
                            <div className="patientDataStyle">
                                <div align='left' className="patientData"><b>Food Preferences</b></div>
                                <div>{item.foodPreferences}</div>
                            </div>
                            <div className="patientDataStyle">
                                <div align='left' className="patientData"><b>Occupation</b></div>
                                <div>{item.occupation}</div>
                            </div>
                        </>
                </div>
            ))}
        </>
    )
}
export { FetchPatientLifestyleData }