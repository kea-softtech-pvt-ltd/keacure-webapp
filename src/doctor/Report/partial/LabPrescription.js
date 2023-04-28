import React from 'react';
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import constants from "../../../common/constant";

export default function LabPrescription(props) {
    //for add new fiels (priscription)
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
    const classes = useStyles();
    function handleAdd() {
        const values = [...fields];
        let last_record = fields.slice(-1);
        values.push({ id: last_record.id + 1 });
        setFields(values);
    }
    //for autoComplete(medicin list)
    let [medicineData, setMedicineData] = useState([])
    useEffect(() => {
        const result = axios(
            constants.MEDICINELIST_DATA
        );
        setMedicineData(result.data)
    }, [])

    //for autoComplete(medicin weight)
    let [medicineWeight, setMedicineWeight] = useState([])
    useEffect(() => {
        const result = axios(
            constants.MEDICINEWEIGHT_DATA
        );
        setMedicineWeight(result.data)
    }, [])
    return (
        <div>
            <div onChange={onChange}>
                <label>Test Name</label>
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
            {/* <div className="btn-dropdown"> */}
            <div className="text-center add_top_30 btn-dropdown">
                <input type="submit" onClick={onChange} className="btn_1" value="Add" />
            </div>
            {/* </div> */}
        </div>
    )
}