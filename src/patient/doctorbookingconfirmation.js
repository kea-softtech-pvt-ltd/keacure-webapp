import axios from "axios";
import { API } from "../config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";

function DoctorBookingConfirmation(props) {
    const { patientId } = props;
    const [doctorName, setDoctorName] = useState([]);
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    useEffect(() => {
        getDoctorName();
    }, [])

    const getDoctorName = async () => {
        const result = await axios.get(`${API}/doctor/${doctorId}`);
        setDoctorName(result.data[0]);
    }

    return (
        <aside className="col-xl-4" id="sidebar">
            <div className="box_general_3 booking patientDetails">
                <form>
                    <div className="title">
                        <h3>Your booking</h3>
                    </div>
                    <div className="summary">
                        <ul>
                            <li className="linkAlign">
                                <h4 className="float-center">Dr. {doctorName.name}</h4>
                            </li>
                            <li className="linkAlign">
                                <b>Email : </b><strong className="float-center">{doctorName.personalEmail}</strong>
                            </li>
                            <li className="linkAlign">
                                <b>Address : </b><strong className="float-center">{doctorName.address}</strong>
                            </li>
                        </ul>
                    </div>
                    {
                        patientId ?
                            <div className="radius appColor">
                                <Link to={`booking/${patientId}`} className="btn">
                                    <span className=" appColor">Book Appointment</span>
                                </Link>
                            </div>
                            :
                            <div className="disabled-link">
                                <Link to="#" className="btn_2 full-width">Book Appointment</Link>
                            </div>
                    }

                </form>
            </div>
        </aside>
    )
}
export { DoctorBookingConfirmation }

