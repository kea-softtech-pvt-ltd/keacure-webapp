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
import AuthApi from '../../../services/AuthApi';
export default function MedicinePrescription(props) {

    //for add new fiels (priscription)
    const { onChange,onClick } = props
    const [fields, setFields] = useState([{ id: 1 }]);
    const [mealData, setMealData] = useState([]);
    const [tabletName, setTabletName] = useState([]);
    const [duration, setDuration]=useState();
    const {getMedicine} = AuthApi()
    const meal = [
        {
            "id": 1,
            "name": "Before Meal"
        },
        {
            "id": 2,
            "name": "After Meal"
        }
    ]
    useEffect(() => {
        setMealData(meal)
        getMedicineData()
    },[])


    const getMedicineData = async () => {
        const result = await getMedicine()
        console.log("/>>>>>>>>>>>>>>>>>>", result)
        setTabletName(result)
    };

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

                        <TableRow>
                            <TableCell align="right">
                                <Autocomplete
                                    style={{ width: 200 }}
                                    id={tabletName._id}
                                    options={tabletName.map((option) => option.medicineName)}
                                    renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                />
                            </TableCell>

                            <TableCell align="right">
                                <Autocomplete
                                    style={{ width: 150 }}
                                    id={mealData.id}
                                    options={mealData.map((option) => option.name)}
                                    renderInput={(params) => <TextField {...params} label="Select" />}
                                />
                            </TableCell>

                            <TableCell align="right">
                                <div className="input">
                                    <input className="form-control" value={duration} type="text" onchange={(e)=>{setDuration(e.target.value)}} />
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
                <input type="submit" onClick={onClick} className="btn_1" value="Save" />
            </div>



        </div>
    )
}