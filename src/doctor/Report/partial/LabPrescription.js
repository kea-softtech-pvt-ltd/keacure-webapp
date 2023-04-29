import React from 'react';
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { API } from '../../../config';
import axios from 'axios';
import AuthApi from '../../../services/AuthApi';
export default function LabPrescription(props) {
    //for add new files (priscription)
    const { onChange } = props
    const { getLabData } = AuthApi()
    const [labTestData, setLabTestData] = useState([]);
    console.log("&&&&&&&&&&&&&7", labTestData)

    // function handleAdd() {
    //     const values = [...fields];
    //     let last_record = fields.slice(-1);
    //     values.push({ id: last_record.id + 1 });
    //     setFields(values);
    // }
    useEffect(() => {
        getLabTestData();
    }, [])
    const getLabTestData = async () => {
        const result = await getLabData()
        setLabTestData(result)
    };

    return (
        <div>
            <div onChange={onChange}>
                <label>Test Name</label>
                <Autocomplete
                    style={{ width: 200 }}
                    id={labTestData.lab_test_id}
                    options={labTestData.map((option) => option.test_name)}
                    renderInput={(params) => <TextField {...params} label="Choose 
                    Test Name"/>}
                />

            </div>

            <div className="text-center add_top_30 btn-dropdown">
                <input type="submit" onClick={onChange} className="btn_1" value="Add" />
            </div>

        </div>
    )
}