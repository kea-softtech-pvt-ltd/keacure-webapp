import { Link } from "react-router-dom";
import { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import AuthApi from "../../services/AuthApi";
// import { useNavigate } from "react-router-dom/cjs/react-router-dom.min";
import {  useHistory } from "react-router-dom";
export default function LoginDoctor() {
    const { loginHelperData } = AuthApi()
    const [loginData, setLoginData] = useState({});
    const [isError, setIsError] = useState(false);
    const  history = useHistory()
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    const saveData = async (e) => {
        e.preventDefault();
        const bodyData = {
            "username": loginData.username,
            "password": loginData.password
        }
        await loginHelperData(bodyData)
            .then((res) => {
                console.log("=res========>", res)
                if (res === null) {
                    setIsError("Please Enter Valid Username and Password")
                }
                else {
                    history.push(`/dashboard/${res.doctorId}`, { state: { helperId: res._id, accessModule: res.access_module } })
                }
            })

    }


    return (
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            <h1 className="">Login</h1>
                            <form >
                                <div className="box_form clearfix">
                                    <div className="box_login last">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <MainInput
                                                    type="text"
                                                    name="username"
                                                    onChange={handleChange}
                                                    placeholder="User Name">
                                                </MainInput>
                                                <MainInput
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    placeholder="Password">
                                                </MainInput>
                                                {<span className="validation mb-2">{isError}</span>}

                                            </div>
                                        </div>
                                        <div className=" ">
                                            <MainButtonInput onClick={(e) => saveData(e)} >Login</MainButtonInput>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}