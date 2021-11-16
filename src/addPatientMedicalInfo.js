import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { MenuProps, useStyles } from "./utils";
import FormControl from "@material-ui/core/FormControl";
import { MainInput } from './mainComponent/mainInput';
import { MainButtonInput} from "./mainComponent/mainButtonInput";

function AddPatientMedicalInfo(props){
    const { patientId } = props;
    //update data
    const [updateData ,setUpdateData]= useState([])
    const classes = useStyles();
    //for fetch allergirs
    const [allergy ,setAllergy] = useState([])
    useEffect(()=>{
        getAllergies()
        register("allergies", { required: true });
        register("cmedication", { required: true });
        register("pmedication", { required: true });
        register("diseases", { required: true });
        register("injuries", { required: true });
        register("surgeries", { required: true });
    },[])

    const getAllergies =()=>{
        fetch(`http://localhost:9000/api/getAllergies`).then(res =>{
            if(res){
                return res.json()
            }
        }).then(jsonRes => {
            setAllergy(jsonRes)
        });
    }
    //autoselected
    const [selected, setSelected] = useState([]);
    const isAllSelected =
        allergy.length > 0 && selected.length == allergy.length;

    const handleOnChange = e => {
        const { name, value } = e.target;
        if (value[value.length - 1] == "all") {
            value = (selected.length == allergy.length ? [] : allergy);
        }
        setSelected(value);
        setUpdateData({ ...updateData, [name]: value });
    }    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    let history = useHistory();
    const { register, handleSubmit , setValue , formState: { errors } } = useForm();
    const onSubmit = data => {
        const patientData = {
            patientId   : patientId,
            allergies   : data.allergies,
            cmedication : data.cmedication,
            pmedication : data.pmedication,
            diseases    : data.diseases,
            injuries    : data.injuries,
            surgeries   : data.surgeries
        }
        axios.post(`http://localhost:9000/api/patientMedicalInfo`, patientData)
        .then(function(response){
           // history.push("/patientdashboard");
        })
    }  

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="form-group">
                        <label><b>Allergies</b></label>
                    </div>
                    {/* <div className="form-group">    
                        <FormControl variant="outlined" className={classes.formControl} {...register("allergies", { required: true })}>
                            <Select
                                labelId="mutiple-select-label"
                                multiple
                                value={selected}
                                onChange={handleOnChange}
                                renderValue={(selected) => selected.join(",")}
                                MenuProps={MenuProps}
                                name="allergies">
                                <MenuItem
                                value="all"
                                classes={{
                                    root: isAllSelected ? classes.selectedAll : ""
                                }}>
                                <ListItemIcon>
                                    <Checkbox
                                    value={updateData.allergies}
                                    classes={{ indeterminate: classes.indeterminateColor }}
                                    checked={isAllSelected.allergies}
                                    indeterminate={selected.length > 0 && selected.length < allergy.length}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.selectAllText }}
                                    primary="Select All"
                                />
                                </MenuItem>
                                {allergy.map((option) => (
                                <MenuItem key={option._id} value={option.name}>
                                    <ListItemIcon>
                                    <Checkbox checked={selected.indexOf(option.name) > -1} />
                                    </ListItemIcon>
                                    <ListItemText primary={option.name} />
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.allergies && <span className="validation">Please select your allergies</span>}
                    </div> */}
                    <label><b>Current Medications</b></label>
                    <MainInput 
                        type="text" 
                        name="cmedication"  
                        onChange={handleInputChange} 
                        value={updateData.cmedication} 
                        placeholder="Current Medications">
                        {errors.cmedication && <span className="validation">Please enter your current medication</span>}
                    </MainInput>

                    <label><b>Past Medications</b></label>
                    <MainInput 
                        type="text" 
                        name="pmedication"  
                        onChange={handleInputChange} 
                        value={updateData.pmedication} 
                        placeholder="Past Medications">
                        {errors.pmedication && <span className="validation">Please enter your post medication</span>}
                    </MainInput>
                </div>

                <div className="col-md-6 ">
                    <label><b>Chronic Diseases</b></label>
                    <MainInput 
                        type="text" 
                        name="diseases"  
                        onChange={handleInputChange} 
                        value={updateData.diseases} 
                        placeholder="Chronic Diseases">
                        {errors.diseases && <span className="validation">Please enter your diseases</span>}
                    </MainInput>

                    <label><b>Injuries</b></label>
                    <MainInput 
                        type="text" 
                        name="injuries"  
                        onChange={handleInputChange} 
                        value={updateData.injuries} 
                        placeholder="Injuries">
                        {errors.injuries && <span className="validation">Please enter your injuries</span>}
                    </MainInput> 

                    <label><b>Surgeries</b></label>
                    <MainInput 
                        type="text" 
                        name="surgeries"
                        onChange={handleInputChange} 
                        value={updateData.surgeries} 
                        placeholder="surgeries">
                        {errors.surgeries && <span className="validation">Please enter your surgeries</span>}
                    </MainInput>       
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export {AddPatientMedicalInfo}