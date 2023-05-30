import React, { useState, useEffect } from 'react';
import AuthApi from '../../services/AuthApi';
import { useParams } from 'react-router-dom';
import GetMedicinePriscription from './partial/GetMedicinePrescription';
import GetLabPrescription from './partial/getLabPrescription';
import GetSymptomsData from './partial/GetSymptomsData';
export default function ViewMedicalReport() {
    const { appointmentId } = useParams();
    const { getMedicineReport, patientDetailsData } = AuthApi();

    const [viewData, setViewData] = useState([]);
    const [patientIdData, setpatientIdData] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]);
    useEffect(() => {
        getMedicineReportData()
        getPatientDetails()
    }, [patientIdData])

    const getMedicineReportData = async () => {
        await getMedicineReport(appointmentId)
            .then((res) => {
                setViewData(res[0])
                setpatientIdData(res[0].patientId)
            })
    }
    const getPatientDetails = async () => {
        await patientDetailsData({ patientIdData })
            .then((response) => {
                setPatientDetails(response[0])
            })
    }

    return (
        <main>
            <div className="container margin_120_95">
                <div className="row">
                    <div className="col-lg-12 ">
                        <nav id="secondary_nav">
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
                                            <span>{viewData.BMI}</span>
                                        </div>

                                        <div >
                                            <b> Bp :</b>
                                            <span>{viewData.bp}</span>
                                        </div>
                                        <div >
                                            <b>Height :</b>
                                            <span>{viewData.height}</span>
                                        </div>
                                    </div>
                                    <div className='mx-1'>
                                        <div>
                                            <b>Weight :</b>
                                            <span>{viewData.weight}</span>
                                        </div>
                                        <div>
                                            <b>Pulse :</b>
                                            <span>{viewData.pulse}</span>
                                        </div>
                                        <div>
                                            <b>Temprature :</b>
                                            <span>{viewData.temp}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <label><h6><b>Medicine</b></h6></label>
                    <div className='whiteBox mt-5'>
                        <GetMedicinePriscription appointmentId={appointmentId} />
                    </div>

                    <div className='whiteBox d-flex mt-3' align='left'>
                        <div className='col-lg-5 '>
                            <GetLabPrescription appointmentId={appointmentId} />
                        </div>
                        <div className="col-lg-5 ">
                            <GetSymptomsData appointmentId={appointmentId} />
                        </div>
                    </div>
                    <div className="whiteBox p-3 mt-3">
                        <div align="left">
                            <b>Investigation :</b>
                            {viewData.investigation_note}
                        </div>

                        <div align="left">
                            <b>Premedication :</b>
                            {viewData.premedication_note}
                        </div>
                    </div>
                </div>

            </div>
        </main >
    )
}