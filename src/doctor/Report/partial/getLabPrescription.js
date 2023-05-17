import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';

export default function GetLabPrescription(props) {
    const { appointmentId } = props
    const [getLabData, setGetLabData] = useState([])
    const { getLabTestPrescriptionData } = AuthApi()
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
                    <ul>
                        <li>
                            <b>List of Test</b>
                        </li>
                    </ul>
                    {getLabData && getLabData.map((item, i) => {
                        return (
                            <ul key={i}>
                                <li>
                                    {item.test_name}
                                </li>
                            </ul>
                        )

                    })}
                </div>
                : null
        }
        </>
    )
}