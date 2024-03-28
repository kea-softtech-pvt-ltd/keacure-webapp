import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetMedicinePriscription from './partial/GetMedicinePrescription';
import GetLabPrescription from './partial/getLabPrescription';
import GetSymptomsData from './partial/GetSymptomsData';
import PatientApi from '../../services/PatientApi';
import ReportApi from '../../services/ReportApi';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { MainNav } from '../../mainComponent/mainNav';
import { useRecoilState } from 'recoil';
import { setHelperData } from '../../recoil/atom/setHelperData';
import { setDoctorId } from '../../recoil/atom/setDoctorId';
import { Link } from 'react-router-dom';

export default function ViewMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport } = ReportApi();
    const { patientDetailsData } = PatientApi()
    const [viewData, setViewData] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)

    useEffect(() => {
        getMedicineReportData()
    }, [])

    const getMedicineReportData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                setViewData(res[0])
                const patientId = res[0].patientId
                patientDetailsData({ patientId })
                    .then((response) => {
                        setPatientDetails(response[0])
                    })
            })

    }

    return (
        <Wrapper>
            <MainNav>
               
                <ul className="clearfix">
                <li>
                    <Link to={`/history/${doctorId}`}>
                        <i className="arrow_back backArrow" title="back button"></i>
                    </Link>
                </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Prescription</li>
                </ul>
            </MainNav>
            <div className="row">
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="common_box ">
                    <h6 align="left">
                        <b>Patient Information</b>
                    </h6>
                    <div className="whiteBox" >
                        <div className="row mx-4 viewMreport">
                            <div className="col-md-6 " align='left'>
                                <div><b className='viewMreport fontSize'>{patientDetails.name}</b></div>
                                <div><b className='viewMreport'>Email :</b>{patientDetails.email}</div>
                                <div><b className='viewMreport'>Gender :</b>{patientDetails.gender}</div>
                                <div><b className='viewMreport'>Age :</b>{patientDetails.age}</div>
                                <div><b className='viewMreport'>Mobile no :</b>{patientDetails.mobile}</div>
                            </div>
                            <div className="col-md-6">
                                <div >
                                    <h6><b>Vital Sign</b></h6>
                                </div >
                                <div className='vitalSign'>
                                    <div className='mx-1'>
                                        <div >
                                            <b>BMI :</b>
                                            {viewData.BMI ?
                                                <span>{viewData.BMI}</span>
                                                :
                                                <span>{"-"}</span>
                                            }
                                        </div>

                                        <div >
                                            <b> Bp :</b>
                                            {viewData.bp ?
                                                <span>{viewData.bp}</span>
                                                :
                                                <span>{'-'}</span>
                                            }
                                        </div>
                                        <div >
                                            <b>Height :</b>
                                            {viewData.height ?
                                                <span>{viewData.height}</span>
                                                :
                                                <span>{'-'}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className='mx-1'>
                                        <div>
                                            <b>Weight :</b>
                                            {viewData.weight ?
                                                <span>{viewData.weight}</span>
                                                :
                                                <span>{'-'}</span>
                                            }
                                        </div>
                                        <div>
                                            <b>Pulse :</b>
                                            {
                                                viewData.pulse ?
                                                    <span>{viewData.pulse}</span>
                                                    :
                                                    <span>{'-'}</span>
                                            }
                                        </div>
                                        <div>
                                            <b>Temprature :</b>
                                            {
                                                viewData.temp ?
                                                    <span>{viewData.temp}</span>
                                                    :
                                                    <span>{'-'}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="white-box viewMreport">
                        <GetMedicinePriscription reportId={reportId} />
                    </div>

                    <div className="white-box viewMreport">
                        <GetLabPrescription reportId={reportId} />
                    </div>

                    <div className="white-box viewMreport">
                        <GetSymptomsData reportId={reportId} />
                    </div>


                    <div className="white-box viewMreport">
                        <div align="left">
                            <b className='viewMreport'>Investigation :</b>
                            {
                                viewData.investigation_note ?
                                    <span>{viewData.investigation_note}</span>
                                    :
                                    <span>{'-'}</span>
                            }
                        </div>

                        <div align="left">
                            <b className='viewMreport'>Premedication :</b>
                            {viewData.premedication_note ?
                                <span>{viewData.premedication_note}</span>
                                :
                                <span>{'-'}</span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </Wrapper >
    )
}