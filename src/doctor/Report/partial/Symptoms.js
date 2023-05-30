import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import AuthApi from '../../../services/AuthApi';
import GetSymptomsData from './GetSymptomsData'
export default function Symptoms(props) {
    const { onChange, reportId, onClick, appointmentId } = props
    console.log("appointmentId", appointmentId)
    const [symptoms, setSymptoms] = useState([])
    const [saveSymptoms, setSaveSymptoms] = useState([])
    const [otherSymptom, setOtherSymptoms] = useState([])

    // const [value, setValue]=useState();
    const { symptomsData, insertSymptoms, insertSymptom_masterTable } = AuthApi();

    useEffect(() => {
        getSymptomsData();
    }, [])
    const getSymptomsData = async () => {
        const result = await symptomsData()
        setSymptoms(result)
    };

    const handleChange = (e, selectedValue) => {
        e.preventDefault()
        setSaveSymptoms(selectedValue)
    }

    const handleOtherChangeValue = (e) => {
        //e.preventDefault();
        setOtherSymptoms(e.target.value)
    }


    const addSymptoms = async () => {
        saveSymptoms.push(otherSymptom)
        const bodyData = {
            "symptoms": saveSymptoms,
        }

        await insertSymptoms({ reportId }, bodyData)
        const other = {
            "symptoms": otherSymptom,
        }
        await insertSymptom_masterTable(other)
        alert('add successfully')
        onChange()

    }


    return (
        <div>
            <div className='symptomsData w-100'>
                <div className='w-40'>
                    <label>Choose Symptoms</label>
                    <Autocomplete
                        style={{ width: 200 }}
                        id={symptoms._id}
                        disableCloseOnSelect
                        value={saveSymptoms}
                        onChange={handleChange}
                        options={symptoms.map((option) => option.name)}
                        noOptionsText={"Sympton not availabel please add"}
                        renderInput={(params) => (<TextField {...params} label="Choose a Symptoms" />)}
                        multiple
                        disablePortal={true}
                        disableClearable
                    />
                </div>
                <div className="symptomsInput w-30">
                    <span className="vital-signInput ">
                        <label className='mb-2'>Other</label>
                        <input
                            type="text"
                            className="form-control "
                            onChange={handleOtherChangeValue}
                            placeholder="Enter your symptoms"
                        />
                    </span>
                </div>

                <div className='getSymptoms w-30' >
                    <GetSymptomsData appointmentId={appointmentId} />
                </div>
            </div>
            <div className="text-center add_top_30 symptomsBtn">
                <input
                    type="submit"
                    onClick={addSymptoms}
                    className="btn_1 patientinfo"
                    value="Save"
                />
            </div>
        </div>
    )
}