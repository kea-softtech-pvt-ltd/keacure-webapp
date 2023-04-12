import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import constants from "../../../common/constant";

export default function MedicinePrescription(props) {
    //for add new fiels (priscription)
    const {onChange} = props
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
        <div onChange={onChange}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>Medicine Name</b></TableCell>
                            <TableCell align="right"><b>mg/gm</b></TableCell>
                            <TableCell align="right"><b>days</b></TableCell>
                            <TableCell align="right" className="tablecell">
                                <b>Morning</b>
                                <b>Afternoon</b>
                                <b>Evening</b>
                                <b>Night</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {fields.map((field) => { */}
                        
                        <TableRow>
                            <TableCell align="right">
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
                            </TableCell>

                            <TableCell align="right">
                                <Autocomplete
                                    onChange={(event, newValues) => {
                                    }}
                                    options={medicineWeight}
                                    style={{ width: 150 }}
                                    getOptionLabel={(option) => option.weight}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{option.weight}</span>
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Weight" />}
                                />
                            </TableCell>

                            <TableCell align="right">
                                <div className="input">
                                    <input className="form-control" type="text" />
                                </div>
                            </TableCell>

                            <TableCell align="right" className="checkbox">
                                <input type="checkbox" className="form-control" value="Morning" name="intake[]" />
                                <input type="checkbox" className="form-control" value="Afternoon" name="intake[]" />
                                <input type="checkbox" className="form-control" value="Evening" name="intake[]" />
                                <input type="checkbox" className="form-control" value="Night" name="intake[]" />
                            </TableCell>
                        </TableRow>
                    
                        {/* })} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="iconbutton" onClick={() => handleAdd()}><Icon style={{ fontSize: 20 }}>add</Icon>
            </div>

        </div>
    )
}