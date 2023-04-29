import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { API } from '../../../config';
import axios from 'axios';
import AuthApi from '../../../services/AuthApi';

export default function Symptoms(props) {
    const { onChange } = props
    const [symptoms, setSymptoms]=useState([])
    console.log("symptoms==========", symptoms)
    const {symptomsData}=AuthApi();
    useEffect(()=>{
        getSymptomsData();
    },[])
    const getSymptomsData = async () => {
        const result = await symptomsData()
        console.log("getSymptomsData-----", result)
        setSymptoms(result)
      };
  
  
  
    return (
        <div>
            <div onChange={onChange}>
                <label>Choose Symptoms</label>
                <Autocomplete
                    style={{ width: 200 }}
                    id={symptoms._id}
                    options={symptoms.map((option)=>option.name)}
                    renderInput={(params) => (<TextField {...params} label="Choose a Symptoms" />)}
                />
            </div>
            <div >
                <div className="vital-signInput symptomsInput">
                    <label className='mb-2'>Other</label>
                    <input type="text" className="form-control " placeholder="Enter your symptoms" />
                </div>
                <div className="text-center add_top_30 symptomsBtn">
                    <input type="submit" className="btn_1 patientinfo" value="Save" />
                </div>
            </div>
        </div>
    )
}