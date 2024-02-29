import { Link } from "react-router-dom/cjs/react-router-dom";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import AuthApi from "../../services/AuthApi";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import SubscriptionApi from "../../services/SubscriptionApi";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";

export default function SubscriptionConfirmation() {
    const { doctorId } = useParams()
    const { getDrInfo } = AuthApi()
    const [doctorData, setDoctorData] = useState([])
    const [getSubData, setGetSubData] = useState([])
    const [helpersData, setHelpersData] = useRecoilState(setHelperData);
    const { getSubscriptionData } = SubscriptionApi()

    useEffect(() => {
        doctorInfo()
        fetchSubscription()
    }, [getSubData]);

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorData(res.result[0])
            })
    }

    const fetchSubscription = () => {
        getSubscriptionData({ doctorId })
            .then((res) => {
                const data = res.filter((item) => {
                    if (item.Status === "Running") {
                        return item
                    }
                })
                setGetSubData(data[0].selected_plan)
            })

    }

    return (
        <Wrapper>
                <MainNav>
                    <ul className="clearfix">
                        <li>
                            <Link to={`/subscription/update/${doctorId}`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                        </li>
                        <li className='float-none' style={{ fontSize: 'inherit' }} >Subscription Confirmation</li>
                    </ul>
                </MainNav>
                <div className="row ">
                    <UserLinks
                        doctorId={doctorId}
                        helperId={helpersData._id}
                        accessModule={helpersData.access_module}
                    />
              
                <div className="container margin_60">
                    <div className=" patientFetch">
                        <div className="box_general_3">
                            <h1 className='color'>Thank You For Upgraded Your Subscription</h1>
                            <div className='fontS'>
                                Dr. {doctorData.name}
                                {/* <div> Your Subscription is Upgraded Successfully!</div> */}
                                <div >Now your Subscription Plan is ( {getSubData} )</div>
                            </div>


                            <Link to={`/subscription/update/${doctorId}`}>
                                <button align='right' className='btn appColor helperBtn'>Done</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
