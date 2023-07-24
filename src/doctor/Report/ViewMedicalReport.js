import React, { useState, useEffect } from 'react';
import AuthApi from '../../services/AuthApi';
import { useParams } from 'react-router-dom';
import GetMedicinePriscription from './partial/GetMedicinePrescription';
import GetLabPrescription from './partial/getLabPrescription';
import GetSymptomsData from './partial/GetSymptomsData';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
export default function ViewMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport, patientDetailsData } = AuthApi();
    const [viewData, setViewData] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]);
    const { ...state } = useLocation()
    const { data } = state
    const doctorId = state.state.data
    console.log("------->>>>", doctorId)
    useEffect(() => {
        getMedicineReportData()
    }, [])

    const getMedicineReportData = async () => {
        await getMedicineReport({ reportId })
            .then(async (res) => {
                setViewData(res[0])
                const patientId = res[0].patientId
                await patientDetailsData({ patientId })
                    .then((response) => {
                        setPatientDetails(response[0])
                    })
            })

    }

    return (
        <main>
            <div className="container margin_120_95">
                <div className="row">
                    <div className="col-lg-12 ">
                        <nav id="secondary_nav">
                            <Link to={`/Patientsclinichistory/${doctorId}`}>
                                <i className="arrow_back backArrow m-3" title="back button"></i>
                            </Link>
                            <span><b>Prescription</b></span>
                        </nav>
                    </div>
                </div>
                <div className="box_form ">
                    <h6 align="left">
                        <b>Patient Information</b>
                    </h6>
                    <div className="whiteBox p-3 mb-2" >
                        <div className="row mx-4">
                            <div className="col-md-6" align='left'>
                                <div><b>{patientDetails.name}</b></div>
                                <div><b>Email :</b>{patientDetails.email}</div>
                                <div><b>Gender :</b>{patientDetails.gender}</div>
                                <div><b>Age :</b>{patientDetails.age}</div>
                                <div><b>Mobile no :</b>{patientDetails.mobile}</div>
                            </div>
                            <div className="col-md-6">
                                <div >
                                    <h6><b>Vital Sign</b></h6>
                                </div >
                                <div
                                    className='d-flex
                                 align-item-center
                                  justify-content-center'
                                >
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

                    <label><h6><b>Medicine</b></h6></label>
                    <div className='whiteBox mt-5'>
                        <GetMedicinePriscription reportId={reportId} />
                    </div>

                    <div className='whiteBox d-flex mt-3' align='left'>
                        <div className='col-lg-5 '>
                            <GetLabPrescription reportId={reportId} />
                        </div>
                        <div className="col-lg-5 ">
                            <GetSymptomsData reportId={reportId} />
                        </div>
                    </div>
                    <div className="whiteBox p-3 mt-3">
                        <div align="left">
                            <b>Investigation :</b>
                            {
                                viewData.investigation_note ?
                                    <span>{viewData.investigation_note}</span>
                                    :
                                    <span>{'-'}</span>
                            }
                        </div>

                        <div align="left">
                            <b>Premedication :</b>
                            {viewData.premedication_note ?
                                <span>{viewData.premedication_note}</span>
                                :
                                <span>{'-'}</span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </main >
    )
}