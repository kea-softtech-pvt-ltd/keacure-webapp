import React, { useEffect, useState } from "react";
import { DoctorAppointmentType } from "../patient/doctorAppointmentType";
import { MainAccordion } from "../mainComponent/MainAccordion";
import { FaClinicMedical } from "react-icons/fa";
import AuthApi from "../services/AuthApi";
import { useParams , Link, useLocation } from "react-router-dom";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { MainNav } from "../mainComponent/mainNav";
import { setHelperData } from "../recoil/atom/setHelperData";
import { Wrapper } from "../mainComponent/Wrapper";

function AppointmentBookingSection() {
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [clinicData, setClinicData] = useState([])
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorName, setDoctorName] = useState([])
    const { getDrInfo } = AuthApi()
    const patientId  = useParams() 
    
    useEffect(() => {
        doctorData()
    }, [])

    function doctorData() {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorName(res.result[0])
                setClinicData(res.result[0].clinicList)
            })
    }
    
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/appointments/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Clinic List  </li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {doctorName.name}</li>

                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="common_box booking">
                    <div>
                        {clinicData.map((clinicItem, id) => (
                            <MainAccordion key={id} icon={<FaClinicMedical />} title={clinicItem.clinicName}>
                                <DoctorAppointmentType clinicData={clinicItem} doctorId={doctorId} />
                            </MainAccordion>

                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
export { AppointmentBookingSection }