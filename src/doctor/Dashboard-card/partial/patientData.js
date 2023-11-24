import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import PatientApi from "../../../services/PatientApi";
import { Wrapper } from "../../../mainComponent/Wrapper";
import { MainNav } from "../../../mainComponent/mainNav";
import { useRecoilState } from "recoil";
import UserLinks from "./uselinks";
import { setHelperData } from "../../../recoil/atom/setHelperData";
import { setDoctorId } from "../../../recoil/atom/setDoctorId";
import { FetchPatientLifestyleData } from "../../../patient/fetchPatientLifestyleData";
import { FetchPatientMedicalInfo } from "../../../patient/fetchPatientMedicalInfo";

export default function PatientData() {
    const { patientId } = useParams();
    const [fetchPatientData, setFetchPatientData] = useState([])
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const { patientDetailsData } = PatientApi()
    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        patientDetailsData({ patientId })
            .then((response) => {
                setFetchPatientData(response[0])
            })
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }} >Patient Data</li>

                </ul>
            </MainNav>
            <div className="row ">
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />

                <div className="patientBox mr-4">
                    <div className="underline">
                        <div className="form_title">
                            <h4>Patient Details</h4>
                        </div>
                    </div>
                    <div className="patientDataStyle">
                        <div className="">
                            <label className="mx-2"><b>Patient name :</b></label>
                            {fetchPatientData.name}
                        </div>
                        <div className="">
                            <label className="mx-2"><b>Age :</b></label>
                            {fetchPatientData.age}
                        </div>
                        <div className="">
                            <label className="mx-2"><b>Gender :</b></label>
                            {fetchPatientData.gender}
                        </div>
                        <div className="">
                            <label className="mx-2"><b>Email :</b></label>
                            {fetchPatientData.email}
                        </div>
                    </div>
                </div>
                {fetchPatientData.mobile ?
                    <>
                        <div className="col-md-3 patientBox mr-4">
                            <FetchPatientLifestyleData patientId={patientId} />
                        </div>
                        <div className="col-md-3 patientBox">
                            <FetchPatientMedicalInfo patientId={patientId} />
                        </div>
                    </>
                    : null}
            </div>


        </Wrapper>
    )
}
