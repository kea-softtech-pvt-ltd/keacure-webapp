import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import { PatientRegistrationForm } from "../patient/patientRegistrationForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setHelperData } from "../recoil/atom/setHelperData";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function CreatePatientProfile() {
    const [ doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const { patientId } = useParams()
    const [ helpersData, setHelpersData] = useRecoilState(setHelperData)

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Walkin Patient</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="container margin_60">
                    <div className="patientFetch">
                        <div className="Form-data">
                            <div className="box_general_3">
                                <PatientRegistrationForm patientId={patientId} doctorId={doctorId}/>
                            </div>
                        </div>
                        {/* <DoctorBookingConfirmation doctorId={doctorId} /> */}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}