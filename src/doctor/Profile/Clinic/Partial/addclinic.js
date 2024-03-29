import React, { useState, useEffect } from "react";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from "../../../../mainComponent/mainInput";
import ClinicApi from "../../../../services/ClinicApi";
import EducationalApi from "../../../../services/EducationalApi";
import { Autocomplete, TextField } from "@mui/material";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import uuid from "uuid";
const AddClinic = (props) => {
    const { doctorId } = props;
    const [coilDoctorClinicData, setCoilDoctorClinicData] = useRecoilState(setDoctorClinic)
    const [selectedService, setSelectedService] = useState([]);
    const [drspecialization, setDrSpecialization] = useState([])
    const [clinicInfo, setClinicInfo] = useState([]);
    const { fetchDrSpecialization } = EducationalApi()
    const [servicess, setServicess] = useState([])
    const { getServicess, addAnotherClinic } = ClinicApi()

    useEffect(() => {
        fetchSpecializations()
        fetchServicess()
    }, [])

    const fetchSpecializations = () => {
        fetchDrSpecialization()
            .then((result) => {
                setDrSpecialization(result);
            })
    }
    const fetchServicess = () => {
        getServicess()
            .then((res) => {
                setServicess(res)
            })
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
    const handleService = (e, selectedValue) => {
        e.preventDefault()
        setSelectedService(selectedValue)
    }

    // const handleSpecialization = (e, selectedValue) => {
    //     e.preventDefault()
    //     setSelectedSpecialization(selectedValue)
    // }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), uuid.v4());

        const result = await uploadBytes(fileRef, blob);

        // blob.close();
        return await getDownloadURL(fileRef);
    }

    async function sendClinicInfo(e) {
        e.preventDefault();
        const resultUrl = await uploadImageAsync(clinicInfo.clinicLogo)
        const newClinicData = {
            clinicLogo: resultUrl,
            clinicName: clinicInfo.clinicName,
            address: clinicInfo.address,
            clinicNumber: clinicInfo.clinicNumber,
            services: selectedService
        }
        addAnotherClinic(newClinicData, doctorId)
            .then((res) => {
                setCoilDoctorClinicData(coilDoctorClinicData.concat(res))
            });
        props.onSubmit()
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={sendClinicInfo}>
                <div className="text-left">
                    <label><b>Clinic Logo</b></label>
                    <MainInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            setClinicInfo({ ...clinicInfo, ['clinicLogo']: URL.createObjectURL(e.target.files[0]) })
                        }}
                        name="clinicLogo">
                    </MainInput>
                </div>
                <div className="form-group">
                    <label><b>Clinic Name</b></label>
                    <MainInput
                        type="text"
                        name="clinicName"
                        onChange={handleChange}
                        value={clinicInfo.clinicname}
                        placeholder="Enter clinic name">
                    </MainInput>
                </div>

                <label><b>Location</b></label>
                <MainInput
                    type="text"
                    name="address"
                    value={clinicInfo.address}
                    onChange={handleChange}
                    placeholder="Enter clinic address">
                </MainInput>

                <label><b>Clinic Number</b></label>
                <MainInput
                    type="text"
                    name="clinicNumber"
                    onChange={handleChange}
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    maxLength={10}
                    value={clinicInfo.clinicnumber}
                    placeholder="Clinic Number (+XX)">
                </MainInput>

                {/* <div className='align-left '>
                    <div align='left' className="patientData mb-2">
                        <b>Clinic Specialization</b>
                    </div>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        multiple={true}
                        className='autocompleteWidth'
                        id={drspecialization._id}
                        value={selectedSpecialization}
                        onChange={handleSpecialization}
                        getOptionLabel={(drspecialization) => `${drspecialization.specialization}`}
                        options={drspecialization}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Specializaation" />}
                    />
                </div> */}
                <div className='align-left '>
                    <div align='left' className="patientData mt-2 mb-2">
                        <b>Clinic Services</b>
                    </div>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        multiple={true}
                        className='autocompleteWidth'
                        id={servicess._id}
                        value={selectedService.name}
                        onChange={handleService}
                        getOptionLabel={(servicess) => `${servicess.name}`}
                        options={servicess}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Service" />}
                    />
                </div>
                <div className="text-center m-3">
                    <MainButtonInput value="Add Clinic" />
                </div>
            </form >
        </div >
    );
};
export { AddClinic }
