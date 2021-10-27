import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import {useParams}from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import {Link} from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import { handleSelect} from './googlemap';
import { Modal, Button} from "react-bootstrap";
import {AddClinic} from "./addclinic";
import {AddOwnClinic} from "./addOwnClinic";
import {SetSession} from "./sessionTiming";
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import {  useState , useEffect  } from "react";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {StyledRadio} from "./radiobutton";
import { TabPanel } from "./tabpanel";
import avatarImage from "./img/profile.png";

export default function EditDoctorProfile(){
    const { loginId } = useParams();
    const [updateData ,setUpdateData]  = useState([]);

    //for using tab
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    //for google map api autocomplete onChange method
     function handleChangeAddress(address) {
        setUpdateData(prevInput =>{
            return{
                ...prevInput,
                ['address']:address
            }
        })
        setValue("address", address)
    }

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        console.log(updateData)
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    //for doctor profilephoto onChange method
    const[doctorPhoto, setDoctorPhoto] = useState(avatarImage);
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
    
    //for document onChange methods
    const onFileChange=(e)=>{
        console.log(e)
        setUpdateData( { ...updateData, document :e.target.files})
        setValue("document", e.target.files)
        console.log(updateData)
    }

    //for clinic tab open modal form
    const [showSession, setShowSession] = useState(false);
    const sessionClose = () => {
        setShowSession(null)
        setActiveModal(null);
    };
    const [activeModal, setActiveModal] = useState()
    const sessionShow  = (e, index) => {
        //setShowSession(index);
        console.log(index)
        setActiveModal(index);
    }
    const onSessionFormSubmit = (e) => {
        e.preventDefault();
        sessionClose();
    };
    
    //for add clinic info
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onClinicFormSubmit = () => {
        handleClose();
    };

    //for add own clinic info
    const [ownClinic, setOwnClinic] = useState(false);
    const ownClinicClose = () => setOwnClinic(false);
    const ownClinicShow  = () => setOwnClinic(true);
    const ownClinicFormSubmit = (e) => {
        ownClinicClose();
    };

    //fetch clinic list
    const [clinicList ,setClinicList] = useState([])
    //fetch ownclinic list
    const [ownclinicList ,setOwnClinicList] = useState([])
    //for fetch specialization data
	const [drspecialization ,setDrSpecialization] = useState([])
    // for fetch degree
    const [drdegrees ,setDrdegrees] = useState([])
    
	useEffect(()=>{
        fetch(`/fetchclinic/${loginId}`).then(res =>{
			if(res){
				return res.json()
					}
				}).then(jsonRes => {
                    setClinicList(jsonRes)});

		fetch("/fetchownclinic").then(res =>{
			if(res){
				return res.json()
					}
				}).then(jsonRes => {
                    setOwnClinicList(jsonRes)});
	    
        fetch("/drspecialization").then(res =>{
            if(res){
                return res.json()
                    }
                }).then(jsonRes => {
                setDrSpecialization(jsonRes)});

        fetch("/drdegrees").then(res =>{
            if(res){
                return res.json()
                    }
                }).then(jsonRes => {
                    setDrdegrees(jsonRes)});   
                    
        fetch(`/fetchData/${loginId}`).then(res =>{
            if(res){
                return res.json()
                    }
                }).then(jsonRes => {
                    const allKeys = Object.keys(jsonRes)
                    allKeys.map(function(k,v) {
                        if(k == 'photo' && typeof jsonRes[k] == "object") {
                            //console.log(k,1)
                            setValue(k, jsonRes[k])
                            setUpdateData({...updateData, k: jsonRes[k]});
                        } 
                        else if(k == 'document' && typeof jsonRes[k][0] == "object") {
                            //console.log(typeof jsonRes[k][0], 2)
                            setValue(k, jsonRes[k])
                            setUpdateData({...updateData, k: jsonRes[k]});
                        }
                        else if((k != 'photo') || (k != 'document')) {
                            //console.log(3)
                            setValue(k, jsonRes[k])
                            setUpdateData({...updateData, k: jsonRes[k]});
                        }
                    })
                    console.log("jsonRes", jsonRes)
                    setUpdateData(jsonRes)
                    if(jsonRes.photo) {
                        setDoctorPhoto(`../images/${jsonRes.photo}`)
                    }
                    // console.log("2", doctorPhoto)
                });  
                
        register("photo", { required: true });        
        register("name", { required: true });
        register("gender", { required: true });
        register("officialEmail", { required: true });
        register("personalEmail", { required: true });
        register("degree", { required: true });
        register("collage", { required: true });
        register("address", { required: true });
        register("comYear", { required: true });
        register("specialization", { required: true })
        register("document", { required: true });
        register("experience", { required: true });
        register("fees", { required: true })

        console.log("1", doctorPhoto)

    },[])

    //for Year dropdownlist
    const currentYear = new Date().getFullYear();
    const options = [];
    const prevYear = currentYear - 50;
    let x = prevYear;
    while(x <= currentYear ){
        options.push(x);
        x++;
    }
    
    //for add new fiels (educational details)
    const [fields, setFields] = useState([{ id: 1 }]);
    function handleAdd() {
       const values = [...fields];
       let last_record = fields.slice(-1);
       values.push({ id: last_record.id + 1 });
       setFields(values);
    }

    //update data
    let history = useHistory();
    const { register, handleSubmit ,setValue, formState: { errors } } = useForm();
    const onSubmit= data => {
        const formData = new FormData();
        formData.append('photo', data.photo);    
        formData.append('name', data.name);
        formData.append('gender', data.gender);
        formData.append('officialEmail', data.officialEmail);
        formData.append('personalEmail', data.personalEmail);
        formData.append('address', data.address);
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
        formData.append('experience', data.experience);
        formData.append('fees', data.fees);
        console.log(formData)
        axios.post(`http://localhost:9000/insert/${loginId}`, formData)
        .then(function(response){
           // history.push("/dashboard");
        })
    } 
    return(
        <main>
            <div className="container margin_120_95">			
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        <nav id="secondary_nav">
                            <div className="container">
                                <span>Doctor Information</span>
                            </div>
                        </nav>
                        <div className="box_form">
                            <form onSubmit={handleSubmit(onSubmit)}>   
                                <Paper square>
                                    <Tabs value={tabValue} onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary">
                                        <Tab label="Personal Information"  />
                                        <Tab label="Educational Details" />
                                        <Tab label="Professional Experience"  />
                                        <Tab label="Clinic"  />
                                    </Tabs>
                                </Paper>
                            
                                <TabPanel value={tabValue} index={0}>
                                <form encType='multipart/form-data'>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="doctorphoto">
                                                        <img
                                                            ref={uploadedImage}
                                                            src={doctorPhoto}
                                                            className="doctorphotoStyle"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="form-group">
                                                        <label><b>Doctor photo</b></label>
                                                        <input type="file" accept=".png, .jpg, .jpeg"  onChange={handlePhoto} name="photo" />
                                                        {errors.photo && <span className="validation">upload your photo</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label><b>Full Name</b></label>
                                                <input type="text" name="name" value={updateData.name}
                                                onChange={handleInputChange}
                                                className="form-control" placeholder="Name"/>
                                                {errors.name && <span className="validation">Please enter your first name</span>}
                                            </div>
                                            <div className="form-group">
                                                <label><b>Gender</b></label>
                                            </div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <div className="col-6">
                                                    <FormControl component="fieldset">
                                                        <RadioGroup defaultValue="female" aria-label="gender"  name="customized-radios">
                                                            <FormControlLabel name="gender" value="female" onChange={handleInputChange} control={<StyledRadio />} label="Female" />
                                                            <FormControlLabel name="gender" value="male" onChange={handleInputChange}  control={<StyledRadio />} label="Male" />
                                                            <FormControlLabel name="gender" value="other" onChange={handleInputChange}  control={<StyledRadio />} label="Other" />
                                                        </RadioGroup>
                                                        {errors.gender && <span className="validation">Please Select your gender</span>}
                                                    </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 ">
                                            <div className="form-group">
                                                <label><b>Official EmailId</b></label>
                                                <input type="email" className="form-control" name="officialEmail" value={updateData.officialEmail} onChange={handleInputChange} placeholder="Official EmailId"/>
                                                {errors.officialEmail && <span className="validation">Please enter your official Email</span>}
                                            </div>
                                            <div className="form-group">
                                                <label><b>Personal EmailId</b></label>
                                                <input type="email" className="form-control" value={updateData.personalEmail} name="personalEmail" onChange={handleInputChange} placeholder="Personal EmailId"/>
                                                {errors.personalEmail && <span className="validation">Please enter your personal Email</span>}
                                            </div>
                                            <div className="form-group">
                                                <label><b>City & Area</b></label>
                                                <PlacesAutocomplete 
                                                    value={updateData.address}
                                                    onChange={handleChangeAddress}
                                                >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div>
                                                        <input
                                                        onSelect={handleSelect}
                                                        {...getInputProps({
                                                            placeholder: 'Search Places......',
                                                            className:"form-control",
                                                            name: "address"
                                                        })}/>
                                                        <div className="autocomplete-dropdown-container">
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                            ? 'suggestion-item--active'
                                                            : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                            return (
                                                            <div
                                                                {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                                })}
                                                            >
                                                                <span>{suggestion.description}</span>
                                                            </div>
                                                            );
                                                        })}
                                                        </div>
                                                        {errors.address && <span className="validation">Please enter your location</span>}
                                                    </div>
                                                    )}
                                                </PlacesAutocomplete>
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                <form form encType='multipart/form-data'>
                                {fields.map((field) => {
                                    return (
                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <label><b>Doctor Degree</b></label>
                                                    <select className="form-control" name="degree" onChange={handleInputChange} value={updateData.degree}>
                                                    {drdegrees.map(item =>(
                                                        <option className="form-control">{item.degree}</option>
                                                    ))}
                                                </select>
                                                {errors.degree && <span className="validation">Please Select your degree</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label><b>Doctor Collage/University</b></label>
                                                    <input type="text" className="form-control" value={updateData.collage} name="collage" onChange={handleInputChange} placeholder="Doctor Collage/University"/>
                                                    {errors.collage && <span className="validation">Please enter your collage</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label><b>Complition Year</b></label>
                                                    <select className="form-control" name="comYear" value={updateData.comYear}  onChange={handleInputChange}>
                                                    {options.map(item =>(
                                                        <option>{item}</option>
                                                    ))}
                                                    </select>
                                                    {errors.comYear && <span className="validation">Please select your complition Year</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <label><b>Specialization</b></label>
                                                    <select name="specialization" className="form-control" value={updateData.specialization} onChange={handleInputChange}>
                                                        <option value="" >Select specialization</option>
                                                        {drspecialization.map(item =>(
                                                            <option  value={item.specialization} >{item.specialization}</option>
                                                        ))}
                                                    </select>
                                                    {errors.specialization && <span className="validation">Please select your specialization</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label><b>Qualification Document Photo</b></label>
                                                    <input type="file" name="document" className="form-control" onChange={onFileChange} placeholder="Document" required multiple/>
                                                    {errors.document && <span className="validation">Please upload your document</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                </form>
                                <div onClick={() => handleAdd()}><Icon className="addiconbutton" style={{ fontSize: 25 }}>add</Icon></div>
                                </TabPanel>

                                <TabPanel value={tabValue} index={2}>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <div className="form-group">
                                                <label><b>Doctor Experience</b></label>
                                                <input type="text" name="experience" value={updateData.experience} className="form-control" onChange={handleInputChange} placeholder="Doctor Experience"/>
                                                {errors.experience && <span className="validation">Please enter your experience</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 ">
                                            <div className="form-group">
                                                <label><b>Consult fee</b></label>
                                                <input type="text" name="fees" value={updateData.fees} className="form-control" onChange={handleInputChange} placeholder="Consult fee"/>
                                                {errors.fees && <span className="validation">Please enter your fees</span>}
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel value={tabValue} index={3}>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                        <div className="box_form">
                                            <div className="modalbtn">
                                                <div className="d-flex align-items-top justify-content-center">
                                                    <input type="button" className="btn_1" variant="primary" onClick={handleShow} value="ADD VISITING CLINIC" />
                                                </div>
                                                
                                            </div>    
                                            {clinicList.map((item, index)=>(
                                                <div className="row" id={`clinic-item-${item._id}`} key={item._id}>
                                                    <div className="col-md-6 ">    
                                                        <ul className="orderlist">                  
                                                            <li>{item.clinicName}</li>
                                                        </ul>
                                                    </div>    
                                                    <div className="col-md-6 ">
                                                        <div className="form-group">
                                                            <Link onClick={e => sessionShow(e, index)} className="patientlistlink">{<AccessTimeRoundedIcon style={{ fontSize:25 }}/>}</Link>
                                                        </div>
                                                        <Modal id={`modal-${item._id}`} show={activeModal === index} onHide={sessionClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Set Session</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <SetSession clinicId={item._id} onSubmit={onSessionFormSubmit} />
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={sessionClose}>
                                                                    Close 
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        </div>
                                        <div className="col-md-6 ">
                                        <div className="box_form">
                                            <div className="modalbtn">           
                                                <div className="d-flex align-items-top justify-content-center">
                                                    <input type="button" className="btn_1" variant="primary" onClick={ownClinicShow} value="ADD AS OWNED CLINIC"/>
                                                </div>
                                                <Modal show={ownClinic} onHide={ownClinicClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Add Own Clinic</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <AddOwnClinic onSubmit={ownClinicFormSubmit} />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={ownClinicClose}>
                                                            Close 
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                            {ownclinicList.map((uniq ,index)=>(
                                                <div className="row" id={`ownclinic-uniq-${uniq._id}`} key={uniq._id}>
                                                    <div className="col-md-6 ">    
                                                        <ul className="orderlist">                  
                                                            <li>{uniq.clinicName}</li>
                                                        </ul>
                                                    </div>    
                                                    <div className="col-md-6 ">
                                                        <div className="form-group">
                                                            <Link onClick={e => sessionShow(e, index)} className="patientlistlink">{<AccessTimeRoundedIcon style={{ fontSize:25 }}/>}</Link>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            <div className="text-center add_top_30"><input type="submit" className="btn_1" value="Verify & Save"/></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
