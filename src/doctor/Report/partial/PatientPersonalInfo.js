import React from 'react';
export default function PatientPersonalInfo() {
    return (
        <div>
            <div className="row">
                <div className="col-lg-5">
                    <div className="datalist">
                        <dl>
                            <dd><b>Patient Name:</b>Komal Gore</dd>
                            <dd><b>Mob         :</b>9999999999</dd>
                            <dd><b>Age         :</b>24</dd>
                        </dl>
                    </div>
                    <label>Message</label>
                    <textarea type="text" className="form-control" placeholder="problem" />
                </div>
                <div className="col-lg-7">
                    {/* <div ><h6 text-align="center">Vital sign</h6></div> */}
                    <div className="row">
                        <div className="vital-signInput">
                            <label >Weight (kg)</label>
                            <input type="text" className="form-control " placeholder="weight" />
                        </div>
                        <div className="vital-signInput">
                            <label >Height (feet)</label>
                            <input type="text" className="form-control " placeholder="height" />
                        </div>
                        <div className="vital-signInput">
                            <label >BMI     </label>
                            <input type="text" className="form-control " placeholder="bmi" />
                        </div>
                        <div className="vital-signInput">
                            <label >BP     </label>
                            <input type="text" className="form-control " placeholder="Bp" />
                        </div>
                        <div className="vital-signInput">
                            <label >Temprature</label>
                            <input type="text" className="form-control " placeholder="Tempreture" />
                        </div>
                        <div className="text-center add_top_30 patientinfo">
                            <input type="submit" className="btn_1 patientinfo" value="Save" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}