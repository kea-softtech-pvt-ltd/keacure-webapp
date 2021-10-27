import React, { useState ,useEffect} from "react";
import axios from "axios";
import {useParams}from "react-router-dom";
import { useRecoilState } from "recoil";
import {setDoctorOwnClinic} from "./recoil/atom/setDoctorOwnClinic";
import { PlacesAutocompleteInput } from "./mainComponent/placesAutocomplete";
import { MainInput } from "./mainComponent/mainInput";
import { MainSelect } from "./mainComponent/mainSelect";
import { MainButtonInput } from "./mainComponent/mainButtonInput";

const AddOwnClinic = (onSubmit) => {
    const { doctorId } = useParams();
    const [coilDoctorOwnClinicInfo , setCoilDoctorOwnClinicInfo] =useRecoilState(setDoctorOwnClinic)
	const [drspecialization ,setDrSpecialization] = useState([])
    const [ownClinicInfo ,setownClinicInfo]=useState({});
    function handleChange(event){
        const{name, value}= event.target;
            setownClinicInfo(prevInput =>{
                return{
                    ...prevInput,
                    [name]:value
                }
            })
        } 
    async function sendownClinicInfo(e) {
        e.preventDefault();
        const newClinicData ={
            doctorId:doctorId,
            specialization:ownClinicInfo.specialization,
            clinicName:ownClinicInfo.clinicName,
            address:ownClinicInfo.address,
            clinicNumber:ownClinicInfo.clinicNumber,
            services:ownClinicInfo.services
        }
        const res = await axios.post("http://localhost:9000/api/insertownclinic" , newClinicData)
        .then(res=>{
            setCoilDoctorOwnClinicInfo(coilDoctorOwnClinicInfo.concat(res.data))
            onSubmit.onSubmit()
        })
    }
    
    //google map
    function handleChangeAddress(address) {
        setownClinicInfo(prevInput =>{
            return{
                ...prevInput,
                ['address']:address
            }
        })
    }
    //for select
	useEffect(()=>{
		fetchSpecializations()
	},[])
    const fetchSpecializations = async () =>{
        const result = await axios.get(`http://localhost:9000/api/drspecialization`); 
        setDrSpecialization(result.data);   
    }
return (
    <div className="col-lg-12">
        <form onSubmit={sendownClinicInfo}>
            <div className="row">
                <div className="col-lg-12">
                    <label>Clinic Name</label>
                    <MainInput 
                        type="text" 
                        name="clinicName" 
                        onChange={handleChange} 
                        value={ownClinicInfo.clinicname} 
                        placeholder="Enter clinic name">
                    </MainInput>
                </div>    
            </div>
                  
            <div className="row">
                <div className="col-lg-12">
                    <PlacesAutocompleteInput 
                        value={ownClinicInfo.address} 
                        onChange={handleChangeAddress}>Location
                    </PlacesAutocompleteInput>
                </div>
            </div> 

            <div className="row">
                <div className="col-lg-6">
                    <label>Clinic Number</label>
                    <MainInput 
                        type="text" 
                        name="clinicNumber" 
                        onChange={handleChange} 
                        value={ownClinicInfo.clinicnumber} 
                        placeholder="Enter clinic number">
                    </MainInput>
                </div>

                <div className="col-lg-6">
                    <label>Clinic Specialization</label>
                    <MainSelect 
                        name="specialization" 
                        onChange={handleChange} 
                        value={ownClinicInfo.specialization}>
                        {drspecialization.map(item =>(
                        <option>{item.specialization}</option>
                        ))}
                    </MainSelect>
                </div>    
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <label>Clinic Services</label>
                    <MainInput 
                        type="text" 
                        name="services" 
                        onChange={handleChange} 
                        value={ownClinicInfo.services} 
                        placeholder="Enter clinic Services"
                    />
                </div>       
            </div>
            
            <div className="text-center add_top_30">
                <MainButtonInput value="Add Clinic"/>
            </div>    
        </form>
    </div> 
         
    );
  };
export {AddOwnClinic}
