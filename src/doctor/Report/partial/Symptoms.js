import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import AuthApi from '../../../services/AuthApi';

export default function Symptoms(props) {
    const { onChange, reportId, onClick } = props
    const [symptoms, setSymptoms] = useState([])
    const [saveSymptoms, setSaveSymptoms] = useState([])
    console.log("saveSymptoms---------", saveSymptoms)
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

    const handleChange = ( selectedValue) => {
        setSaveSymptoms(selectedValue)
    }
    const handleOtherChangeValue=(e)=>{
        e.preventDefault();
        setOtherSymptoms(e.target.value)
        
    }


    const addSymptoms = async () => {
        saveSymptoms.push(otherSymptom)
        const bodyData = {
            "symptoms": saveSymptoms,
        }
        console.log("res----===-----", bodyData)

        await insertSymptoms({ reportId }, bodyData)
            .then((res) => {
                console.log("=============thenres", res)
            })

        const other = {
            "symptoms": otherSymptom,
        }
        console.log("other--------", other)
        await insertSymptom_masterTable(other)
        .then((res)=>{
            console.log("=========", res)
        })
        onChange()
          
    }

    return (
        <div>
            <div >
                <label>Choose Symptoms</label>
                <Autocomplete
                    style={{ width: 250 }}
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
            <div >
                <div className="vital-signInput symptomsInput">
                    <label className='mb-2'>Other</label>
                    <input type="text" className="form-control " onChange={handleOtherChangeValue} placeholder="Enter your symptoms" />
                </div>
                <div className="text-center add_top_30 symptomsBtn">
                    <input type="submit" onClick={addSymptoms} className="btn_1 patientinfo" value="Save" />
                </div>
            </div>
        </div>
    )
}