import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';
export default function GetSymptomsData(props) {
    const { reportId } = props
    console.log("----reoportid", reportId)
    const { getMedicineReport } = AuthApi();
    // const [fetchSymptomsData, setFetchSymptomsData] = useState([])
    // console.log("fetchSymptomsData", fetchSymptomsData)
    const [symptomDataInfo, setSymptomDataInfo] = useState([])
    console.log("----symptomDataInfo", symptomDataInfo)
    useEffect(() => {
        symptomsData()
    }, [])

    const symptomsData = async () => {
        await getMedicineReport({ reportId })
            .then((res) => {
                // setFetchSymptomsData(res)
                setSymptomDataInfo(res[0].symptoms)
            })
    }

    return (
        <>
            {symptomDataInfo.length > 0 ?

                <div>
                    <h6><b>List of Symptoms</b></h6>
                    {symptomDataInfo && symptomDataInfo.map((item, i) => {
                        return (
                            <span key={i}>
                                {item}<br />
                            </span>
                        )
                    })}
                </div>
                : null}
        </>
    )
}