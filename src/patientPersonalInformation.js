import React,{ useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PlacesAutocompleteInput} from "./mainComponent/placesAutocomplete"
import { MainRadioGroup } from "./mainComponent/mainRadioGroup";
import { MainInput } from './mainComponent/mainInput';
import avatarImage from "./img/profile.png";
import { MainButtonInput } from './mainComponent/mainButtonInput';

function PatientPersonalInformation(props){
    const { patientId } = props;
    //update data
    const [updateData ,setUpdateData]= useState({})
    const [patientPhoto, setPatientPhoto] = useState(avatarImage);
    useEffect(()=>{
        fetch(`http://localhost:9000/api/patientById/${patientId}`).then(res =>{
            if(res){
                return res.json()
                    }
                }).then(jsonRes => {
                    const allKeys = Object.keys(jsonRes)
                    allKeys.map(function(k,v) {
                        if(k === 'photo' && typeof jsonRes[k] === "object") {
                            setValue(k, jsonRes[k])
                            setUpdateData({...updateData, k: jsonRes[k]});
                        } 
                        else if((k !== 'photo')) {
                            setValue(k, jsonRes[k])
                            setUpdateData({...updateData, k: jsonRes[k]});
                        }
                    })
                    setUpdateData(jsonRes)
                    if(jsonRes.photo) {
                        setPatientPhoto(`../patientImages/${jsonRes.photo}`)
                    }
                }); 
        register("name", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
        register("age", { required: true });
        register("address", { required: true });
        register("bloodgroup", { required: true });
        register("maritalstatus", { required: true });
        register("height", { required: true });
        register("weight", { required: true });
        register("birthdate", { required: true });
        register("emcontact", { required: true });
        register("address", { required: true });
    },[])
    
    //location 
    const handleChangeAddress =(address) =>{
        setUpdateData(prevInput =>{
            return{
                ...prevInput,
                ['address']:address
            }
        })
        setValue("address", address)
    }

    //for doctor profilephoto onChange method
    const uploadedImage = React.useRef(null);
    const handlePhoto = (e) => {
        e.preventDefault();
        const [file] = e.target.files;
        setUpdateData({...updateData, photo:  file});
        setValue("photo", file)
        if (file) {
            const reader = new FileReader();
            const {current} = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }   
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue( name, value)
    };

    //let history = useHistory();
    const { register, handleSubmit ,setValue, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('photo', data.photo);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('mobile', updateData.mobile);
        formData.append('bloodgroup', data.bloodgroup);
        formData.append('maritalstatus', data.maritalstatus);
        formData.append('height', data.height);
        formData.append('weight', data.weight);
        formData.append('gender', data.gender);
        formData.append('age', data.age);
        formData.append('birthdate', data.birthdate);
        formData.append('emcontact', data.emcontact);
        formData.append('address', data.address);
        
        axios.post(`http://localhost:9000/api/insertPatientDetails/${patientId}`, formData)
        .then(function(response){
            console.log(response)
           // history.push(`/patientdashboard/${patientId}`);
             props.personal();
        })
    }  

    return(
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-4">
                            <div className="doctorphoto">
                                <img 
                                    ref={uploadedImage} 
                                    src={patientPhoto} 
                                    className="doctorphotoStyle"
                                    alt="doctorPhoto"
                                />
                            </div>
                        </div>
                        
                        <div className="col-8">
                            <label><b>Patient photo</b></label>
                            <MainInput
                                type="file" 
                                accept=".png, .jpg, .jpeg"  
                                onChange={handlePhoto} 
                                name="photo">
                            </MainInput>
                        </div>
                    </div>
                    
                    <label><b>Full Name</b></label>
                    <MainInput 
                        type="text" 
                        value={updateData.name} 
                        onChange={handleInputChange}   
                        placeholder="Name" name="name" >
                    {errors.name && <span className="validation">Please enter your first name</span>}
                    </MainInput>        
                    
                    <div className="row">
                        <div className="col-6">
                            <label><b>Height</b></label>
                            <MainInput
                                type="text" 
                                name="height"  
                                onChange={handleInputChange}  
                                value={updateData.height} 
                                placeholder="cm">
                                {errors.height && <span className="validation">Please enter your height</span>}
                            </MainInput>        
                        </div>

                        <div className="col-6">
                            <label><b>Weight</b></label>
                            <MainInput 
                                type="text" 
                                name="weight" 
                                onChange={handleInputChange}  
                                value={updateData.weight} 
                                placeholder="kg">
                                {errors.weight && <span className="validation">Please enter your Weight</span>}
                            </MainInput>         
                        </div>
                    </div>
                    <label><b>Age</b></label>
                    <MainInput 
                        type="text" 
                        value={updateData.age} 
                        onChange={handleInputChange}   
                        placeholder="Age" 
                        name="age" >
                     {errors.age && <span className="validation">Please enter your Age</span>}
                    </MainInput>   

                    <div className="form-group">
                        <label><b>Gender</b></label>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-6">
                                <MainRadioGroup
                                    defaultValue="female"
                                    name="gender"
                                    value="female"
                                    value1="male"
                                    onChange={handleInputChange}
                                    label="Female"
                                    label1="male">
                                </MainRadioGroup>
                                {errors.gender && <span className="validation">Please Select your gender</span>}
                            </div>
                        </div>
                    </div> 
                </div>

                <div className="col-md-6 ">
                     <div className="form-group">
                        <label><b>Date Of Birth</b></label>
                    </div>    
                    <div className="row">
                        <div className="col-6">
                        <MainInput 
                            type="date"
                            name="birthdate"
                            onChange={handleInputChange}
                            value={updateData.birthdate}>
                            {errors.birthdate && <span className="validation">Please enter your BirthDate</span>}
                        </MainInput>        
                        </div>
                    </div>
                    <label><b> EmailId</b></label>
                    <MainInput 
                        type="email" 
                        name="email" 
                        value={updateData.email} 
                        placeholder="Enter Your EmailId" 
                        onChange={handleInputChange}>
                        {errors.email && <span className="validation">Please enter your email</span>}
                    </MainInput>        
                    
                    <label><b>Blood Group</b></label>
                    <MainInput 
                        type="text" 
                        onChange={handleInputChange} 
                        name="bloodgroup" 
                        value={updateData.bloodgroup} 
                        placeholder="Ex. O+ A B...">
                        {errors.bloodgroup && <span className="validation">Please enter your blood group</span>}
                    </MainInput>        

                    <label><b>Marital Status</b></label>
                    <div className="col-4">   
                        <MainRadioGroup
                            defaultValue="Married"
                            name="maritalstatus"
                            value="Married"
                            value1="Single"
                            onChange={handleInputChange}
                            label="Married"
                            label1="Single">
                        </MainRadioGroup>
                        {errors.maritalstatus && <span className="validation">Please Select your marital status</span>}
                    </div>

                    <label><b>Emergency Contact</b></label>
                    <MainInput 
                        type="text" 
                        name="emcontact" 
                        onChange={handleInputChange} 
                        value={updateData.emcontact} 
                        className="form-control" 
                        placeholder="Emergency Contact">
                        {errors.emcontact && <span className="validation">Please enter your contact</span>}
                    </MainInput>        

                    <PlacesAutocompleteInput 
                        value={updateData.address} 
                        onChange={handleChangeAddress}><b>City & Area</b>
                    </PlacesAutocompleteInput>
                    {errors.address && <span className="validation">Please enter your location</span>}
                </div>
            </div>   
            <div className="text-center add_top_30">
                <MainButtonInput>Verify & Save</MainButtonInput> 
            </div>    
        </form>
    )
}
export {PatientPersonalInformation}