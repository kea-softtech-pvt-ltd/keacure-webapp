import { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useNavigate } from "react-router-dom";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import HelperApi from "../../services/HelperApi";
import { setDoctorId } from "../../recoil/atom/setDoctorId";

export default function LoginDoctor() {
    const { loginHelperData } = HelperApi()
    const [loginData, setLoginData] = useState({});
    const [isError, setIsError] = useState(false);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorId, setDrId] = useRecoilState(setDoctorId)
    const navigate = useNavigate()
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    const saveData =  (e) => {
        e.preventDefault();
        const bodyData = {
            "username": loginData.username,
            "password": loginData.password
        }
         loginHelperData(bodyData)
            .then((res) => {
                setHelpersData(res)
                setDrId(res.doctorId)
                if (res === null) {
                    setIsError("Please Enter Valid Username and Password")
                }
                else {
                    navigate(`/dashboard/${res.doctorId}`)
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
                                        <div>
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