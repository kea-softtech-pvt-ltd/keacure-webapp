import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';

export default function GetLabPrescription(props) {
    const { appointmentId } = props;
    const [getLabData, setGetLabData] = useState([]);
    const { getLabTestPrescriptionData } = AuthApi();
    useEffect(() => {
        getLabPrescriptionData()
    }, [getLabData])

    const getLabPrescriptionData = async () => {
        const result = await getLabTestPrescriptionData({ appointmentId })
        setGetLabData(result)
    }
    return (
        <>
            {
                getLabData.length > 0 ?
                    <div>
                        <h6> <b>List of Test</b></h6>
                        {getLabData && getLabData.map((item, i) => {
                            return (
                                <span key={i}>
                                    {item.test_name}<br />
                                </span>
                            )

                        })}
                    </div>
                    : null
            }
        </>
    )
}