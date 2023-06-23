import React, { useState, useEffect } from 'react';
import { MainInput } from '../../mainComponent/mainInput';
import { MainButtonInput } from '../../mainComponent/mainButtonInput';
import AuthApi from '../../services/AuthApi';
import { useHistory } from 'react-router-dom';
export default function AddHelper(props) {
    const { getAccessModule, createHelper } = AuthApi();
    const [accessModule, setAccessModule] = useState([]);
    const [selectedModule, setSelectedModule] = useState([]);
    const [checked, setChecked] = useState([]);
    const [loginData, setLoginData] = useState([]);
    // const [passwordType, setPasswordType] = useState('password')
    // const [passwordInput, setPasswordInput] = useState("");

    // const [password, setPassword] = useState([])
    const history = useHistory()
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    // const handlePasswordChange = (event) => {
    //     setPasswordInput(event.target.value);

    // }
    // const togglePassword = () => {
    //     if (passwordType === "password") {
    //         setPasswordType("text")
    //         return;
    // onClick={passwordType === "password" ? <i onClick={togglePassword} className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
    //     }
    //     setPasswordType("password")
    // }
    useEffect(() => {
        getAccess();
    }, [])

    const getAccess = async () => {
        await getAccessModule()
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
                moduleName: accessModule[index].module_name
            })
        } else {
            let m = module.filter((item, i) => {
                return (item.moduleId !== accessModule[index]._id)
            })
            module = m
        }
        setSelectedModule(module)
    }
    const saveData = async (e) => {
        const bodyData = {
            "doctorId": props.doctorId,
            "username": loginData.username,
            "password": loginData.password,
            "email": loginData.email,
            "mobile": loginData.mobile,
            "access_module": selectedModule,
        }
        console.log("///bodyData////", bodyData)

        await createHelper(bodyData)
            .then((res) => {
            })
        history.push(`/dashboard/${props.doctorId}`)
    }
    return (
        <div className='whiteBox'>
            <div className="row p-4">
                <div className="col-lg-6 AddHelper">
                    <label className='helperLabel float-left'><b>User Name</b></label>
                    <MainInput
                        type="text"
                        name="username"
                        // value='username'
                        onChange={handleChange}
                        placeholder="Enter Your Name">
                    </MainInput>
                    <div>
                        <label className='helperLabel float-left'><b>Password</b></label>
                    </div>
                    <MainInput
                        type="password"
                        name="password"
                        // value={passwordInput}
                        onChange={handleChange}
                        placeholder="Password">

                    </MainInput>
                    <div>
                        <label className='helperLabel float-left'><b>Email</b></label>
                    </div>
                    <MainInput
                        type="email"
                        name="email"
                        // value='email'
                        onChange={handleChange}
                        placeholder="Email">
                    </MainInput>
                    <div>
                        <label className='helperLabel float-left'><b>Mobile Number</b></label>
                    </div>
                    <MainInput
                        type="mobile"
                        name="mobile"
                        // value='email'
                        onChange={handleChange}
                        placeholder="Mobile Number">
                    </MainInput>
                </div>
                <div className="col-lg-6 ">
                    <span><b>Select Access</b></span>
                    <div className='helperDiv'>
                        {accessModule.map((item, index) => {
                            return (
                                <div key={index} className='row'>
                                    <input
                                        type="checkbox"
                                        onChange={() => changeSelectedModule(index)}
                                        className="mx-3 helperCheckbox"
                                    // value={item.module_name}
                                    />
                                    <label className='helperspan '>{item.module_name}</label>
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
        </div>

    )
}