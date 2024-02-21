import React from 'react';
import { useEffect, useState } from "react";
import AppointmentsApi from '../../services/AppointmentsApi';

export default function Report(props) {
    const { doctorId } = props
    const [patientList, setPatientList] = useState([]);
    const { getPatientListDetails } = AppointmentsApi();
    const [patientData, setPatientData] = useState([]);
    const [total, setTotal] = useState([]);
    useEffect(() => {
        getPatientDetails();
    }, [])

    function getPatientDetails() {
        getPatientListDetails({ doctorId })
            .then((result) => {
                if (result) {
                    const data = result.test.filter((patient) => {
                        if (patient.status === "Completed") {
                            return patient;
                        }
                    })
                    setPatientList(data)
                    const res = result.test.filter(function (item, index) {
                        return index === result.test.findIndex((obj) => {
                            if (item.patientId === obj.patientId)
                                return item
                        })
                    })
                    setPatientData(res)
                    const item = result.test.filter((res) => {
                        if (res.payment === "Done")
                        return res
                })

                    const total = item.reduce((initialValue, curValue) => {
                        return initialValue + parseInt(curValue.total)
                    }, 0)
                    setTotal(total)
                }
            })
    }

    return (
        <>
            <div className="">
                < div className='row' >
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan '>
                                <span className='patientName m-3'>Completed Appoinment</span>
                                <span className='patientName m-3'>{patientList.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan '>
                                <span className='patientName m-3'>Total Patients</span>
                                <span className='patientName m-3'>{patientData.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan '>
                                <span className='patientName m-3'>Total Amount (INR)</span>
                                <span className='patientName m-3'>{total}</span>
                            </span>
                        </div>
                    </div>
                </div >
            </div >

        </>
    )
}