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
import Meal from '../../../data/Meal';
export default function MedicinePrescription(props) {
    console.log("=================", Meal)

    //for add new fiels (priscription)
    const { onChange } = props
    const [fields, setFields] = useState([{ id: 1 }]);
    const [mealData, setMealData] = useState('');

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
    useEffect(() => {

        mealD();
    }, [])

    const mealD = () => {
        const result = axios(constants.MEAL_DATA
            )

        .then((res) => {
            console.log("++++++++++++++++", res)
           // setMealData(result.data)
        })
    }

    return (
        <div onChange={onChange}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Medicine Name</b></TableCell>
                            <TableCell align="center"><b>Take</b></TableCell>
                            <TableCell align="center"><b>Duration</b></TableCell>
                            <TableCell align="center" className="tablecell">
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
                                    // options={medicineData}
                                    style={{ width: 200 }}
                                    getOptionLabel={(option) => option.medicineName}
                                    renderOption={(option) => (
                                        <React.Fragment>-po
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
                                    //options={setMealData}
                                    style={{ width: 150 }}
                                    getOptionLabel={(option) => option}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{option}</span>
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="select" />}
                                />


                            </TableCell>

                            <TableCell align="right">
                                <div className="input">
                                    <input className="form-control" type="text" />
                                </div>
                            </TableCell>

                            <TableCell align="right" className="checkbox ">
                                <input type="checkbox" className="medicine-checkbox" value="Morning" name="Morning" />
                                <input type="checkbox" className="medicine-checkbox" value="Afternoon" name="Afternoon" />
                                <input type="checkbox" className="medicine-checkbox" value="Evening" name="Evening" />
                                <input type="checkbox" className="medicine-checkbox" value="Night" name="Night" />
                            </TableCell>
                        </TableRow>

                        {/* })} */}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div className="iconbutton" onClick={() => handleAdd()}><Icon style={{ fontSize: 20 }}>Save</Icon> */}

            <div className="text-center add_top_30 medicinebtn ">
                <input type="submit" onClick={onChange} className="btn_1" value="Save" />
            </div>



        </div>
    )
}