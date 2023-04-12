import React from 'react';


export default function PatientPersonalInfo() {
    return (
        <div>
            <div className="row">
                <div className="col-lg-3 ">
                    <div className="datalist">
                        <dl>
                            {/* <dd><b>Patient Name:</b>{row.PatientName}</dd> */}
                            <dd><b>Age:</b>24</dd>
                        </dl>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div><h6>Vital sign</h6></div>
                    <div className="row">
                        <div className="col-lg-4">
                            <label>Weight (kg)</label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="col-lg-4">
                            <label>Height(feet)</label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="col-lg-3">
                            <label>BMI</label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 ">
                    <input type="text" className="form-control" placeholder="Duration" />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="textarea">
                        <textarea type="text" className="form-control" placeholder="problem" />
                    </div>
                </div>
            </div>
        </div>
    )
}