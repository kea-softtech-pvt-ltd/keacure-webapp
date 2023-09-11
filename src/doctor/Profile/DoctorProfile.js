import { Link, useParams } from "react-router-dom";
import { FetchDoctorPersonalDetails } from "./Personal/Partial/fetchDoctorPersonalDetails";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { Wrapper } from "../../mainComponent/Wrapper";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";

export default function DoctorProfile() {
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    return (

        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link
                            to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"> </i>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#section_1" className="active">
                            General info
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/editdoctorprofile/${doctorId}`}>
                            <i className="icon_pencil-edit" title="Edit profile"></i>
                        </Link>
                    </li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module} />
                <div id="section_1" className="col-lg-10">
                    <div className="white-box">
                        <FetchDoctorPersonalDetails doctorId={doctorId} />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}