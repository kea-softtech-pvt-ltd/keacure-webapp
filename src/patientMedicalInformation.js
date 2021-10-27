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

function PatientMedicalInformation(props){
    const { registerId } = props;
    //update data
    const [updateData ,setUpdateData]= useState({})
    const classes = useStyles();
    //for fetch allergirs
    const [allergy ,setAllergy] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:9000/api/getAllergies`).then(res =>{
            if(res){
                return res.json()
            }
        }).then(jsonRes => {
            setAllergy(jsonRes)
        });
    },[])
    //autoselected
    const [selected, setSelected] = useState([]);
    const isAllSelected =
        allergy.length > 0 && selected.length === allergy.length;

    const handleOnChange = e => {
        const { name, value } = e.target;
        if (value[value.length - 1] === "all") {
            value = (selected.length === allergy.length ? [] : allergy);
        }
        setSelected(value);
        setUpdateData({ ...updateData, [name]: value });
    }    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    let history = useHistory();
    const { register, handleSubmit , formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('allergies', data.allergies);
        formData.append('cmedication', data.cmedication);
        formData.append('pmedication', data.pmedication);
        formData.append('diseases', data.diseases);
        formData.append('injuries', data.injuries);
        formData.append('surgeries', data.surgeries);
        axios.post(`http://localhost:9000/api/update/${registerId}`, formData)
        .then(function(response){
            history.push("/patientdashboard");
        })
        
    }  

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="form-group">
                        <label><b>Allergies</b></label></div>
                    <div className="form-group">    
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
                    </div>
                    <div className="form-group">
                        <label><b>Current Medications</b></label>
                        <input type="text" name="cmedication"  onChange={handleInputChange} value={updateData.cmedication} className="form-control" {...register("cmedication", { required: true })} placeholder=""/>
                        {errors.cmedication && <span className="validation">Please enter your current medication</span>}
                    </div>
                    <div className="form-group">
                        <label><b>Past Medications</b></label>
                        <input type="text" name="pmedication"  onChange={handleInputChange} value={updateData.pmedication} className="form-control" {...register("pmedication", { required: true })} placeholder=""/>
                        {errors.pmedication && <span className="validation">Please enter your post medication</span>}
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="form-group">
                        <label><b>Chronic Diseases</b></label>
                        <input type="text" name="diseases"  onChange={handleInputChange} value={updateData.diseases} className="form-control" {...register("diseases", { required: true })} placeholder=""/>
                        {errors.diseases && <span className="validation">Please enter your diseases</span>}
                    </div>
                    <div className="form-group">
                        <label><b>Injuries</b></label>
                        <input type="text" name="injuries"  onChange={handleInputChange} value={updateData.injuries} className="form-control" {...register("injuries", { required: true })} placeholder=""/>
                        {errors.injuries && <span className="validation">Please enter your injuries</span>}
                    </div>
                    <div className="form-group">
                        <label><b>Surgeries</b></label>
                        <input type="text" name="surgeries"onChange={((e) =>(e.target.value))}  onChange={handleInputChange} value={updateData.surgeries} className="form-control" {...register("surgeries", { required: true })} placeholder=""/>
                        {errors.surgeries && <span className="validation">Please enter your surgeries</span>}
                    </div>
                </div>
            </div>
            <div className="text-center add_top_30"><input type="submit"  className="btn_1" value="Save"/></div>
        </form>

    )
}
export {PatientMedicalInformation}