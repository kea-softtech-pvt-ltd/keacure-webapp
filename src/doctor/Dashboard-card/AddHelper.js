import React, { useState, useEffect } from 'react';
import { MainInput } from '../../mainComponent/mainInput';
import { MainButtonInput } from '../../mainComponent/mainButtonInput';
import { useParams, Link } from 'react-router-dom';
import { MainNav } from '../../mainComponent/mainNav';
import AuthApi from '../../services/AuthApi';
export default function AddHelper() {
    const { doctorId } = useParams();
    const { getAccessModule, createHelper } = AuthApi();
    const [accessModule, setAccessModule] = useState([]);
    const [selectedModule, setSelectedModule] = useState([]);
    const [checked, setChecked] = useState([]);
    const [loginName, setLoginName] = useState([]);
    const [password, setPassword] = useState([])
    useEffect(() => {
        getAccess();
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setLoginName(e.target.value)
    }
    const handlePassChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }
    const clearData = () => {
        setPassword('')
        setLoginName('')
        // setSelectedModule(!checked)
    }
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
            "doctorId": doctorId,
            "username": loginName,
            "password": password,
            "access_module": selectedModule,
        }
        console.log("///bodyData////", bodyData)

        await createHelper(bodyData)
            .then((res) => {
                console.log("///////", res)
            })
        clearData()
    }
    return (
        <main>
            <div className="container margin_120_95">
                <div className="row ">
                    <div className="col-lg-12 ml-auto">
                        <MainNav>
                            <ul className="clearfix">
                                <li>
                                    <Link to={`/dashboard/${doctorId}`}>
                                        <i className="arrow_back backArrow" title="back button"></i>
                                    </Link>
                                </li>
                                <li className='float-none' style={{ fontSize: 'inherit' }}>Add Helper</li>
                            </ul>
                        </MainNav>
                        <div className='whiteBox'>
                            <div className="row p-4">
                                <div className="col-lg-6 AddHelper">
                                    <label className='helperLabel float-left'><b>User Name</b></label>
                                    <MainInput
                                        type="text"
                                        name="username"
                                        value={loginName}
                                        onChange={handleChange}
                                        placeholder="Enter Your Name">
                                    </MainInput>
                                    <div>
                                        <label className='helperLabel float-left'><b>Password</b></label>
                                    </div>
                                    <MainInput
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePassChange}
                                        placeholder="Password">
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

                    </div>
                </div>
            </div>

        </main>
    )
}