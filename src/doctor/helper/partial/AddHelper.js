import React, { useState, useEffect } from 'react';
import { MainInput } from '../../../mainComponent/mainInput';
import { MainButtonInput } from '../../../mainComponent/mainButtonInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HelperApi from '../../../services/HelperApi';
import Toaster from '../../Toaster';
import "react-toastify/dist/ReactToastify.css";

export default function AddHelper(props) {
    const { getAccessModule, createHelper } = HelperApi();
    const [ accessModule, setAccessModule ] = useState([]);
    const [ selectedModule, setSelectedModule ] = useState([]);
    const [ checked, setChecked ] = useState([]);
    const [ loginData, setLoginData ] = useState([]);

    const navigate = useNavigate()
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    useEffect(() => {
        getAccess();
    }, [])

    const getAccess = () => {
        getAccessModule()
            .then((res) => {
                setAccessModule(res)
            })
    };

    const changeSelectedModule = (index) => {
        let newState = [...checked]
        newState[index] = !checked[index]
        setChecked(newState)
        let module = []
        module = [...selectedModule];
        let value = newState[index];
        if (value) {
            module.push({
                moduleId: accessModule[index]._id,
                moduleName: accessModule[index].moduleName
            })
        } else {
            let m = module.filter((item, i) => {
                return (item.moduleId !== accessModule[index]._id)
            })
            module = m
        }
        setSelectedModule(module)
    }
    const saveData = (e) => {
        const bodyData = {
            "doctorId": props.doctorId,
            "username": loginData.username,
            "password": loginData.password,
            "email": loginData.email,
            "mobile": loginData.mobile,
            "access_module": selectedModule,
        }

        createHelper(bodyData)
            .then(() => {
                navigate(`/dashboard/${props.doctorId}`)
            })
        toast.success("Saved Successfully!")
    }
    return (
        <div className='white-box'>
            <div className="row p-4">
                <div className="col-lg-5 AddHelper">
                    <label className='helperLabel float-left'><b>User Name</b></label>
                    <MainInput
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter Your Name">
                    </MainInput>
                    <div>
                        <label className='helperLabel float-left'><b>Password</b></label>
                    </div>
                    <div>
                        <MainInput
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className=''
                            placeholder="Password">
                        </MainInput>
                    </div>
                    <div>
                        <label className='helperLabel float-left'><b>Email</b></label>
                    </div>
                    <MainInput
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email">
                    </MainInput>
                    <label className='helperLabel float-left'><b>Mobile Number</b></label>
                    <MainInput
                        type="mobile"
                        name="mobile"
                        onChange={handleChange}
                        maxLength={10}
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        placeholder="Phone Number (+XX)">
                    </MainInput>
                </div>
                <div className="col-lg-4">
                    <label className='helperLabel' ><b>Select Access</b></label>
                    <div className='helperDiv'>
                        {accessModule.map((item, index) => {
                            return (
                                <div key={index} className='row'>
                                    <input
                                        type="checkbox"
                                        onChange={() => changeSelectedModule(index)}
                                        className="mx-3 helperCheckbox"
                                    />
                                    <label className='helperspan '>{item.moduleName}</label>
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
            </div>
            <div className="text-center add_top_30 pb-2">
                <MainButtonInput onClick={saveData}>Save</MainButtonInput>
            </div>
            <div className="row float-right toaster">
                <Toaster />
            </div>
        </div>

    )
}