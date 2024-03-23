import { Outlet, useParams } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setHelperData } from "../recoil/atom/setHelperData";
import { MainNav } from "../mainComponent/mainNav";
import { Link } from "react-router-dom";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import GetDependent from "./getDependent";

export default function GetLoginPatientProfile() {
    const { patientId } = useParams()
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    return (
        <>
            <Wrapper>
                <MainNav>
                    <ul className="clearfix">
                        <li>
                            <Link to={`/appointments/${doctorId}`}>
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
                    <div className="container common_box margin_60">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="box_general_4 cart patientDetails">
                                    <FetchPatientInfo doctorId={doctorId}  patientId={patientId} />
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