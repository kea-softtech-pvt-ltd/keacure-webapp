import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';

export default function GetLabPrescription(props) {
    const { reportId } = props;
    const { getLabTestPrescriptionData } = AuthApi();
    const [getLabData, setGetLabData] = useState([]);
    useEffect(() => {
        getLabPrescriptionData()
    }, [getLabData])

    const getLabPrescriptionData = async () => {
        const result = await getLabTestPrescriptionData({ reportId })
        setGetLabData(result)
    }
    return (
        <>
            {
                getLabData.length > 0 ?
                    <div className='whiteBox viewMreport' align='left'>
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