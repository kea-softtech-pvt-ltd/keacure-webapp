import { useParams } from "react-router-dom";
import { DoctorBookingConfirmation } from "./doctorbookingconfirmation";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setHelperData } from "../recoil/atom/setHelperData";
import { MainNav } from "../mainComponent/mainNav";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import GetDependent from "./getDependent";

export default function GetLoginPatientProfile() {
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const { patientId } = useParams()
    return (
        <>
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
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="box_general_4 cart patientDetails">
                                    <FetchPatientInfo patientId={patientId} />
                                </div>
                            </div>
                            <GetDependent doctorId={doctorId} patientId={patientId} />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}