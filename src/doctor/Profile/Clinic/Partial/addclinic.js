import React, { useState, useEffect } from "react";
import { API } from "../../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from "../../../../mainComponent/mainInput";
import { PlacesAutocompleteInput } from "./placesAutocomplete";
import { MainSelect } from "../../../../mainComponent/mainSelect";
import AuthApi from "../../../../services/AuthApi";
const AddClinic = (props) => {
    const { doctorId } = useParams();
    const [coilDoctorClinicData, setCoilDoctorClinicData] = useRecoilState(setDoctorClinic)

    //for fetch specialization data
    const [drspecialization, setDrSpecialization] = useState([])
    const [clinicInfo, setClinicInfo] = useState([]);
    console.log("--------clinicInfo--------",clinicInfo)
    const { insertClinicData, fetchDrSpecialization } = AuthApi()
    //for fetch specialization data
    useEffect(() => {
        fetchSpecializations()
    }, [])

    const fetchSpecializations = async () => {
        const result = await fetchDrSpecialization();
        console.log("--------------result", result)
        setDrSpecialization(result);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setClinicInfo(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    async function sendClinicInfo(e) {
        e.preventDefault();
        const newClinicData = {
            doctorId: doctorId,
            specialization: clinicInfo.specialization,
            clinicName: clinicInfo.clinicName,
            address: clinicInfo.address,
            clinicNumber: clinicInfo.clinicNumber,
            services: clinicInfo.services
        }
        console.log('======newClinicData',newClinicData)
        // const res = await axios.post(`${API}/insertclinic`, newClinicData)
        
       await insertClinicData({newClinicData} )
        .then((res) => {
            setCoilDoctorClinicData(coilDoctorClinicData.concat(res.data))
                props.onSubmit()
            });
    }
    //google map
    function handleChangeAddress(address) {
        setClinicInfo(prevInput => {
            return {
                ...prevInput,
                ['address'] : address
            }
        })
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={sendClinicInfo}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Clinic Name</label>
                            <MainInput
                                type="text"
                                name="clinicName"
                                onChange={handleChange}
                                value={clinicInfo.clinicname}
                                placeholder="Enter clinic name">
                            </MainInput>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <PlacesAutocompleteInput
                            value={clinicInfo.address}
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
                            value={clinicInfo.clinicnumber}
                            placeholder="Enter clinic number">
                        </MainInput>
                    </div>

                    <div className="col-lg-6">
                        <label>Clinic Specialization</label>
                        <MainSelect
                            name="specialization"
                            onChange={handleChange}
                            value={clinicInfo.specialization}>
                            {drspecialization.map((item, index) => (
                                <option key={index}>{item.specialization}</option>
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
                            value={clinicInfo.services}
                            placeholder="Enter clinic Services">
                        </MainInput>
                    </div>
                </div>

                <div className="text-center add_top_30">
                    <MainButtonInput value="Add Clinic" />
                </div>
            </form>
        </div>
    );
};
export { AddClinic }
