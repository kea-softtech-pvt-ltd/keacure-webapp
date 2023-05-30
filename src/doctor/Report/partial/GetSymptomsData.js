import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';
export default function GetSymptomsData(props) {
    const { appointmentId } = props
    const { getMedicineReport } = AuthApi();
    const [fetchSymptomsData, setFetchSymptomsData] = useState([])
    const [symptomData, setSymptomData] = useState([])

    useEffect(() => {
        symptomsData()
    }, [fetchSymptomsData])

    const symptomsData = async () => {
        await getMedicineReport(appointmentId)
            .then((res) => {
                setFetchSymptomsData(res)
                setSymptomData(res[0].symptoms)
            })
    }

    return (
        <>
            {symptomData.length > 0 ?

                <div>
                    <h6><b>List of Symptoms</b></h6>
                    {fetchSymptomsData && symptomData.map((item, i) => {
                        return (
                            <span key={i}>
                                    {item}<br/>
                            </span>
                        )
                    })}
                </div>
                : null}
        </>
    )
}