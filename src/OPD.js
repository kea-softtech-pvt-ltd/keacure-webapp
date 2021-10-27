import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import constants from "./constant";
import {  useState ,useEffect } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from 'react-date-picker';
import Icon from '@material-ui/core/Icon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import{
    useParams
}from "react-router-dom";

function TabPanel(props) {
    const { children, value, index } = props;  
    return (
      <div>
        {value === index && (
          <Box div={5}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

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

export default function OPD(){
    const classes = useStyles();

    //for add new fiels (priscription)
    const [fields, setFields] = useState([{ id: 1 }]);

    function handleAdd() {
      const values = [...fields];
      let last_record = fields.slice(-1);
      values.push({ id: last_record.id + 1 });
      setFields(values);
    }

    //for datepicker
    const [date, onChange] = useState(new Date());

    //fetch opd data 
    let[rows ,setRow] =useState([])
	useEffect(()=>{
		const result = axios(
			constants.OPDSCREEN_DATA
		);
		setRow(result.data)
	},[])

    //fetch patient data
    let { patientId } = useParams();
    let[row ,setRows] =useState([])
    useEffect(()=>{
        const result =  axios(
            constants.PATIENTLIST_DATA
        );
        let tempData = getService(result.data, patientId)
        setRows(tempData[0])
    });

    function getService(data, id) {
        return data.filter(function(element){//callback function
            return (element.id === id) // id json
        })
    }
    
    //for history button
    let history = useHistory();
    function handleClick() {
        history.push("/MedicineHistory");
    }

    //for tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function changeTab(tabIndex) {
        setValue(tabIndex);
    }

    //for autoComplete(medicin list)
    let[medicineData ,setMedicineData] = useState([])
	useEffect(()=>{
		const result = axios(
			constants.MEDICINELIST_DATA
		);
		setMedicineData(result.data)
	},[])

    //for autoComplete(medicin weight)
    let[medicineWeight ,setMedicineWeight] = useState([])
	useEffect(()=>{
		const result = axios(
			constants.MEDICINEWEIGHT_DATA
		);
		setMedicineWeight(result.data)
	},[])

    return(
        <div>
            <main>
                <div className="container margin_120_95">			
                    <div className="row">
                        <div className="col-lg-12 ml-auto">
                            <nav id="secondary_nav">
                                <div className="container">
                                    <span>OPD</span>
                                </div>
                            </nav>
                            <div className="box_form">
                                <div className="row">
                                    <div className="col-lg-3 "> 
                                        <div className="datalist">
                                            <dl>
                                                <dd><b>Patient Name:</b>{row.PatientName}</dd>
                                                <dd><b>Age:</b>24</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="col-lg-4"> 
                                        <div><h6>Vital sign</h6></div>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <label>Weight (kg)</label>
                                                    <input type="text" className="form-control" placeholder=""/>
                                                </div>
                                                <div className="col-lg-4">
                                                    <label>Height(feet)</label>
                                                    <input type="text" className="form-control" placeholder=""/>
                                                </div>
                                                <div className="col-lg-3">
                                                    <label>BMI</label>
                                                    <input type="text" className="form-control" placeholder=""/>
                                                </div> 
                                            </div>
                                    </div>
                                    <div className="col-lg-3 ">
                                        <input type="text" className="form-control" placeholder="Duration"/>
                                    </div> 
                                </div>
                            
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="textarea">
                                        <textarea type="text" className="form-control"  placeholder="problem"/>
                                        </div> 
                                    </div>
                                </div>
                                <Paper square>
                                    <Tabs value={value} onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary">
                                        <Tab label="Investigation"/>
                                        <Tab label="Premedication"  />
                                        <Tab label="Prescription"  />
                                        <Tab label="New follow-up" />  
                                        <Tab label="Medicine Histroy"  />
                                    </Tabs>
                                </Paper>
                                <div className="tablecontent">
                                    <TabPanel value={value}  index={0}>
                                        <div className="container">
                                            <span>Doctor Investigation Note</span>
                                        </div>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data="<div>Something write here...</div>"
                                        />
                                        <div className="text-center add_top_30"><input type="button"  onClick={() => changeTab(1)}  className="btn_1" value="Add Note"/></div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <div className="container">
                                            <span>Premedication</span>
                                        </div>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data="<div>Something write here...</div>"
                                            onReady={ editor => ( 'Editor is ready to use!', editor )
                                             }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                            } }
                                            onBlur={ ( event, editor ) => ({event, editor}) }

                                            onFocus={ ( event, editor ) => ({event, editor}) }
                                        />
                                        <div className="text-center add_top_30"><input type="submit" onClick={() => changeTab(2)}  className="btn_1" value="Add Note"/></div>  
                                    </TabPanel>
                                    <div className="row">
                                    <TabPanel value={value} index={2}>
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
                                                {fields.map((field) => {
                                                    return (
                                                    <TableRow key={field.id}>
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
                                                                <input className="form-control" type="text"/>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell align="right" className="checkbox">
                                                            <input type="checkbox" className="form-control" className="intake" value="Morning" name="intake[]"/>
                                                            <input type="checkbox" className="form-control" className="intake" value="Afternoon" name="intake[]"/>
                                                            <input type="checkbox" className="form-control" className="intake" value="Evening" name="intake[]"/>
                                                            <input type="checkbox" className="form-control" className="intake" value="Night" name="intake[]"/>
                                                        </TableCell>
                                                    </TableRow>
                                                    );
                                                })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <div className="iconbutton" onClick={() => handleAdd()}><Icon style={{ fontSize: 20 }}>add</Icon>
                                        </div>
                                    </TabPanel>
                                    </div>
                                    <TabPanel value={value} index={3}>
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <div className="form-group">
                                                    <b>Follow-Up:</b>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="form-group">
                                                    <DatePicker
                                                        className="datepicker"
                                                        onChange={onChange}
                                                        value={date}
                                                        clearIcon= {null}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center add_top_30"><input type="submit" onClick={() => changeTab(4)} className="btn_1" value="Add"/></div>  
                                    </TabPanel >
                                    
                                    <div className="row">
                                    <TabPanel value={value} index={4}>
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} size="medium" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="right"><b>Sr NO.</b></TableCell>
                                                        <TableCell align="right"><b>Prisciption Date & Time</b></TableCell>
                                                        <TableCell align="right"><b>Action</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((item) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell align="right">{item.SrNO}</TableCell>
                                                        <TableCell align="right">{item.PrisciptionDate}</TableCell>
                                                        <TableCell align="right">
                                                            <div className="iconbutton" onClick={handleClick} ><VisibilityIcon style={{ fontSize:20 }}/></div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <div className="text-center add_top_30"><input type="submit" className="btn_1" value="Next"/></div>   
                                    </TabPanel>
                                    </div>
                                </div>
                                <div className="text-right add_top_30"><input type="submit"  className="btn_1" value="save"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}