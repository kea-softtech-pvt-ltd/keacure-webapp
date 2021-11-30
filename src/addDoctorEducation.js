import React from 'react';
import { useState , useEffect} from "react";
import { useParams}from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "./recoil/atom/setDoctorEducation";
import { MainButtonInput} from "./mainComponent/mainButtonInput";
import { MainInput } from './mainComponent/mainInput';
import { MainSelect } from './mainComponent/mainSelect';

function AddDoctorEducation(props){
    const { doctorId } = useParams();
    const [ updateEduData ,setUpdateEduData]  = useState([])
    const [ coilDoctorEducationData ,setCoilDoctorEducationData]  = useRecoilState(setDoctorEducation)
    //for fetch specialization data
	const [ drspecialization ,setDrSpecialization] = useState([])
    // for fetch degrees
    const [ drdegrees ,setDrdegrees] = useState([])
   
    useEffect(()=>{
        fetchSpecializations()
        fetchDegrees()
        
        register("degree", { required: true });
        register("collage", { required: true });
        register("comYear", { required: true });
        register("specialization", { required: true });
        register("document", { required: true });            
    },[])

    const fetchSpecializations = async () =>{
        const result = await axios.get(`http://localhost:9000/api/drspecialization`); 
        setDrSpecialization(result.data);   
    }

    const fetchDegrees = async () =>{
        const result = await axios.get(`http://localhost:9000/api/drdegrees`); 
        setDrdegrees(result.data);   
    }

    //for Year dropdownlist
    const currentYear = new Date().getFullYear();
    const options = [];
    const prevYear = currentYear - 50;
    let x = prevYear;
    while(x <= currentYear ){
        options.push(x);
        x++;
    }
    const { register, handleSubmit ,setValue, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('doctorId', doctorId);
        formData.append('degree', data.degree);
        formData.append('collage', data.collage);
        formData.append('comYear', data.comYear);
        formData.append('specialization', data.specialization);
        let doclist = 0;
        if(data.document) {
            doclist = Object.keys(data.document).length
        }
        if(doclist > 0) {
            for (const key of Object.keys(data.document)) {
                formData.append('document', data.document[key]);
            }
        }
        else {
            formData.append('document', "");
        }
        const res = await axios.post(`http://localhost:9000/api/education`, formData)
        .then(res =>{
            setCoilDoctorEducationData(coilDoctorEducationData.concat(res.data))        
            props.recordAdded();
        });
    }

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateEduData({ ...updateEduData, [name]: value });
        setValue(name, value)
    };

    //for document onChange methods
    const onFileChange=(e)=>{
        setUpdateEduData({...updateEduData, document :e.target.files})
        setValue("document", e.target.files)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <div className="row">
                <div className="col-md-6 ">
                    <label><b>Doctor Degree</b></label>
                    <MainSelect 
                        name="degree" 
                        onChange={handleInputChange} 
                        value={updateEduData.degree}>
                        <option>Select Degree</option>
                        {drdegrees.map((item, index) =>(
                            <option className="form-control" key={index}>{item.degree}</option>
                        ))}
                    </MainSelect>
                    {errors.degree && <span className="validation">Please Select your degree</span>}

                    <label><b>Doctor Collage/University</b></label>
                    <MainInput 
                        type="text" 
                        value={updateEduData.collage} 
                        name="collage" onChange={handleInputChange} 
                        placeholder="Doctor Collage/University">
                        {errors.collage && <span className="validation">Please enter your collage</span>}
                    </MainInput>
                    
                    <label><b>Complition Year</b></label>
                    <MainSelect 
                        name="comYear" 
                        value={updateEduData.comYear}  
                        onChange={handleInputChange}>
                        <option >Select Year</option>
                        {options.map((option, index) =>(
                            <option key={index}>{option}</option>
                        ))}
                    </MainSelect>
                    {errors.comYear && <span className="validation">Please select your complition Year</span>}
                </div>

                <div className="col-md-6 ">
                    <label><b>Specialization</b></label>
                    <MainSelect 
                        name="specialization" 
                        className="form-control" 
                        value={updateEduData.specialization} 
                        onChange={handleInputChange}>
                        <option>Select specialization</option>
                        {drspecialization.map((spe , index) =>(
                            <option key={index}>{spe.specialization}</option>
                        ))}
                    </MainSelect>
                    {errors.specialization && <span className="validation">Please select your specialization</span>}
                    
                    <label><b>Qualification Document Photo</b></label>
                    <MainInput 
                        type="file" 
                        name="document"
                        onChange={onFileChange} 
                        placeholder="Document" 
                        multiple={true}>
                        {errors.document && <span className="validation">Please upload your document</span>}
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export {AddDoctorEducation}