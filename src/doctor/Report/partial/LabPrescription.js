import React from 'react';
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AuthApi from '../../../services/AuthApi';
import GetLabPrescription from './getLabPrescription';

export default function LabPrescription(props) {
    //for add new files (priscription)
    const { onChange, reportId, appointmentId } = props
    const { getLabData, insertLabPrescriptionData } = AuthApi()
    //for whole data
    const [labTestData, setLabTestData] = useState([]);
    //for Selected data
    const [saveLabData, setSaveLabData] = useState('')
    useEffect(() => {
        getLabTestData();
    }, [])

    const getLabTestData = async () => {
        const result = await getLabData()
        setLabTestData(result)
    };
    const handleDataSave = (e, selectedData) => {
        e.preventDefault()
        setSaveLabData(selectedData)
    }
    const labDataSave = async () => {
        const bodyData = {
            "reportId": reportId,
            'patientAppointmentId': appointmentId,
            "test_name": saveLabData.test_name
        }
        await insertLabPrescriptionData(bodyData)
        alert("Save Successfully")
        onChange()
    }
  
    return (
        <div className='d-flex' >
            <div >
                <div className='align-left w-50'>
                    <label>Test Name</label>
                    <Autocomplete
                        style={{ width: 200 }}
                        id={labTestData._id}
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        onChange={handleDataSave}
                        getOptionLabel={(option) => `${option.test_name}`}
                        options={labTestData || null}
                        renderInput={(params) =>
                        (<TextField {...params}
                            label="Choose Test Name"
                        />)}
                    />
                </div>
                <div className="text-center add_top_30 btn-dropdown">
                    <input type="submit" onClick={labDataSave} className="btn_1" value="Add" />
                </div>
            </div>

            <div className='align-right w-50 labData'>
                <GetLabPrescription appointmentId={appointmentId} />
            </div>

        </div>
    )
}