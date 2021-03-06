import React from 'react';
import { API } from "../config";
import { useState ,useEffect} from "react";
import { useParams}from "react-router-dom";
import axios from 'axios';
import pdfImage from "../img/pdfimg.png";
import { Link } from '@material-ui/core';
import { useRecoilState } from "recoil";
import { setDoctorEducation} from "../recoil/atom/setDoctorEducation";
import { MainButtonInput} from "../mainComponent/mainButtonInput";
import { MainInput } from '../mainComponent/mainInput';
import { MainSelect } from '../mainComponent/mainSelect';

function EditEducation(props){
    const { doctorId } = useParams();
    const { EduId } = props;
    //for fetch specialization data
	const [ drspecialization ,setDrSpecialization] = useState([])
    // for setdocument 
    const [ drDocument, setDrDocument] = useState([]);
    // for fetch degrees
    const [ drdegrees ,setDrdegrees] = useState([])
    //for update data using recoil
    const [ eduData ,setEduData]  = useRecoilState(setDoctorEducation)
    //for update education data
    const [updateEducation, setUpdateEducation ] = useState([])
    const removeImage =(EduId, index)=> {
        let tempEduImages = drDocument.filter((item, key) => {
            return  key !== index
        })
        setDrDocument(tempEduImages)     
        axios.post(`${API}/deleteDocument/${EduId}`,{
            document: tempEduImages
        })
        .then(res => console.log(res.data));
    }

    useEffect(()=>{
        fetchSpecializations();
        fetchDegrees();
        fetchUpdateEducation();
    },[])

    const fetchSpecializations = async () =>{
        const result = await axios.get(`${API}/drspecialization`); 
        setDrSpecialization(result.data);   
    }

    const fetchDegrees = async () =>{
        const result = await axios.get(`${API}/drdegrees`); 
        setDrdegrees(result.data);   
    }

    const fetchUpdateEducation = async () =>{
        const result = await axios.get(`${API}/fetchEditEduData/${EduId}`); 
        setUpdateEducation(result.data)
        setDrDocument(props.imageData)  
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

     //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateEducation({ ...updateEducation, [name]: value });
    };

    //for document onChange methods
    async function EditData(e) {
        e.preventDefault();
        const formData = new FormData(document.querySelector("#EditData"));
        formData.append('doctorId', doctorId);
        const res = await axios.post(`${API}/updateEducation/${EduId}` , formData)
        .then(res =>{
            const newEduData = eduData.map(function(d, index){
                if(EduId === d._id) {
                    return res.data
                } else {
                    return d
                }
            })
            setEduData(newEduData);
            props.onSubmit()       
        });
    }

    return(
        <form onSubmit={EditData} id={"EditData"} encType='multipart/form-data'>
            <div className="row">
                <div className="col-md-6 ">
                    <label><b>Doctor Degree</b></label>
                    <MainSelect 
                        name="degree" 
                        value={updateEducation.degree} 
                        onChange={handleInputChange} >
                        <option value="" >Select Degree</option>
                        {drdegrees.map((item , index) =>(
                            <option key={index} className="form-control">{item.degree}</option>
                        ))}
                    </MainSelect>

                    <label><b>Doctor Collage/University</b></label>
                    <MainInput 
                        type="text" 
                        value={updateEducation.collage} 
                        name="collage" 
                        onChange={handleInputChange} 
                        placeholder="Doctor Collage/University">
                    </MainInput>
                    
                    <label><b>Complition Year</b></label>
                    <MainSelect 
                        value={updateEducation.comYear} 
                        name="comYear" 
                        onChange={handleInputChange}>
                        <option value="" >Select Year</option>
                        {options.map((option ,index) =>(
                            <option key={index}>{option}</option>
                        ))}
                    </MainSelect>
                </div>

                <div className="col-md-6">
                    <label><b>Specialization</b></label>
                    <MainSelect 
                        name="specialization" 
                        value={updateEducation.specialization} 
                        onChange={handleInputChange}>
                        <option value="" >Select specialization</option>
                        {drspecialization.map((special , index) =>(
                            <option key={index}>{special.specialization}</option>
                        ))}
                    </MainSelect>

                    <label><b>Qualification document Photo</b></label>
                    <MainInput 
                        type="file" 
                        name="document" 
                        accept="image/*" 
                        placeholder="document" 
                        multiple={true}>
                        <div className="fetchedudata">
                            {drDocument.map((eduImage ,index) => {
                                return (
                                    <div key={index}>
                                        {(/\.(gif|jpe?g|png)$/i).test(eduImage)? (
                                            <img
                                                alt="education"
                                                src={"/uploads/" + eduImage}
                                                className="documentStyle"
                                                accept="image/*"
                                            />
                                        ) : (
                                            <img
                                                alt="education"
                                                src={pdfImage}
                                                className="documentStyle"
                                                accept="image/*"
                                            />
                                        ) }
                                        <Link to="#" onClick={() => removeImage(EduId, index)}>x</Link>
                                    </div>
                                )
                            })}
                        </div> 
                    </MainInput>      
                </div>
            </div>
            
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export {EditEducation}