import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import constants from "../../../common/constant";

export default function Symptoms(props) {
    const { onChange } = props
    const [fields, setFields] = useState([{ id: 1 }]);

    //for table
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        table: {
            minWidth: 650,
        },
    }));
    // const classes = useStyles();
    // function handleAdd() {
    //     const values = [...fields];
    //     let last_record = fields.slice(-1);
    //     values.push({ id: last_record.id + 1 });
    //     setFields(values);
    // }
    //for autoComplete(medicin list)
    let [medicineData, setMedicineData] = useState([])
    useEffect(() => {
        const result = axios(
            constants.MEDICINELIST_DATA
        );
        setMedicineData(result.data)
    }, [])
    return (
        <div>
            <div onChange={onChange}>
                <label>Choose Symptoms</label>
                <Autocomplete
                    onChange={(event, newValues) => {
                    }}
                    options={medicineData}
                    style={{ width: 200 }}
                    getOptionLabel={(option) => option.medicineName}
                    renderOption={(option) => (
                        <React.Fragment>
                            <span>{option.medicineName}</span>
                        </React.Fragment>
                    )}
                    renderInput={(params) => (<TextField {...params} label="Choose a medicine" />)}
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