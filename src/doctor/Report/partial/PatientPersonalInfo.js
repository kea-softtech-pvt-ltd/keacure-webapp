import React, { useState, useEffect } from 'react';
import AuthApi from '../../../services/AuthApi';
// import axios from 'axios';
// import { API } from '../../../config';
export default function PatientPersonalInfo(props) {
    const { insertPatientVitalSignsData } = AuthApi()
    // const [patientId, setPatientId] = useState();
    // console.log("===========result", patientId)

    const [changeData, setChangeData] = useState({
        age: "",
        weight: "",
        height: "",
        BMI: "",
        temp: "",
        bp: "",
        pulse: "",
        problem: ""
    })
    const [savingData, setSavingData] = useState([])
    const { reportId } = props;

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("++++++++++++++//////////", name)
        setChangeData({ ...changeData, [name]: value })
    }
    const saveData = async (e) => {
        e.preventDefault();
        const bodyData = {
            "age": changeData.age,
            "weight": changeData.weight,
            "height": changeData.height,
            "BMI": changeData.BMI,
            "temp": changeData.temp,
            "bp": changeData.bp,
            "pulse": changeData.pulse,
            "problem": changeData.problem,
        }
        await insertPatientVitalSignsData({ reportId }, bodyData)
            .then((res) => {
                console.log("++++++++++++++res", res)
                setSavingData(res)
                // setPatientId(res.patientId)
            })
    }
  

    return (
        <div>
            <div className="row">
                <div className="col-lg-5">
                    {/* <div className="datalist">
                        <dl>
                            <dd><b>Patient Name:</b>{savingData.name}</dd>
                            <dd><b>Mob         :</b>9999999999</dd>
                            <dd><b>Age         :</b>24</dd>
                        </dl>
                    </div> */}
                    <div className="row">
                    <div className="mx-3">
                        <label>Message</label>
                        <textarea type="text" value={changeData.problem} onChange={handleChange} className="form-control" name="problem" placeholder="problem" />
                    </div>
                    </div>

                </div>

                <div className="col-lg-7">
                    <div className="row">
                        <div className="vital-signInput">
                            <label >Weight (kg)</label>
                            <input type="text" value={changeData.weight} className="form-control" name="weight" placeholder="weight" onChange={handleChange} ></input>
                        </div>
                        <div className="vital-signInput">
                            <label >Height (feet)</label>
                            <input type="text" className="form-control" value={changeData.height} name="height" placeholder="height" onChange={handleChange} ></input>
                        </div>
                        <div className="vital-signInput">
                            <label >BMI     </label>
                            <input type="text" className="form-control " value={changeData.BMI} name="BMI" placeholder="bmi" onChange={handleChange} ></input>
                        </div>
                        <div className="vital-signInput">
                            <label >BP     </label>
                            <input type="text" className="form-control " value={changeData.bp} name="bp" placeholder="Bp" onChange={handleChange} ></input>
                        </div>
                        <div className="vital-signInput">
                            <label >Temprature</label>
                            <input type="text" className="form-control " value={changeData.temp} name="temp" placeholder="Tempreture" onChange={handleChange} ></input>
                        </div>
                        <div className="vital-signInput">
                            <label >Pulse</label>
                            <input type="text" className="form-control " value={changeData.pulse} name="pulse" placeholder="Pulse" onChange={handleChange} ></input>
                        </div>
                        <div className="text-center add_top_30 patientinfo">
                            <input type="submit" className="btn_1 patientinfo" value="Save" onClick={saveData} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
