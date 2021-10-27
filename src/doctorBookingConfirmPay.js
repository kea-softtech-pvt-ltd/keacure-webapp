import axios from "axios";
import { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
//import { setDoctorBooking} from "./recoil/atom/setDoctorBooking";
import { doctorBookingState}  from "./recoil/selector/doctorBookingState"
import { useRecoilValue } from "recoil";
import { slots } from "./constant";

function DoctorBookingConfirmPay(props){
    const {time} = props;
    const {doctorId} = props;
    const [doctorName ,setDoctorName] = useState({})
    const [bookingData ,setBookingData] = useRecoilValue(doctorBookingState);
    console.log(time)

    useEffect(()=>{
        getDoctorName();
       // getBookingData();
    },[])

    const getDoctorName = async () =>{
        const result = await axios.get(`http://localhost:9000/api/doctor/${doctorId}`); 
        setDoctorName(result.data);
    }

    // const getBookingData = async() =>{
    //     const result = await axios(
    //         slots
    //     );
    //     setBookingData(result.data);
    // }

    return(
        <aside className="col-xl-4 col-lg-4" id="sidebar">
            <div className="box_general_3 booking">
                <form>
                    <div className="title">
                        <h3>Your booking</h3>
                    </div>
                    <div className="summary">
                        <ul>
                            <li className="linkAlign">Dr. Name : <strong className="float-center">{doctorName.name}</strong></li>
                            <li className="linkAlign">Dr. Fees : <strong className="float-center">500</strong></li>
                            <li className="linkAlign">Date : <strong className="float-center">11/12/2017</strong></li>
                            <li className="linkAlign">Time : <strong className="float-right">{time}</strong></li>
                            <li className="linkAlign">Appointment Type : <strong className="float-right"></strong></li>
                        </ul>
                    </div>
                    <div className="disabled-link">
                        <Link to="/bookingconfirm" className="btn_2 full-width">Confirm and pay</Link>
                    </div>
                </form>
            </div>
        </aside>
    )
}
export{DoctorBookingConfirmPay}

function DoctorBookingConfirmPayment(props){
    const {doctorId} = props;
    const [doctorName ,setDoctorName] = useState({})
    
    useEffect(()=>{
        getDoctorName()
    },[])

    const getDoctorName = async () =>{
        const result = await axios.get(`http://localhost:9000/api/doctor/${doctorId}`); 
        setDoctorName(result.data);   
    }

    return(
        <aside className="col-xl-4 col-lg-4" id="sidebar">
            <div className="box_general_3 booking">
                <form>
                    <div className="title">
                        <h3>Your booking</h3>
                    </div>
                    <div className="summary">
                        <ul>
                        <li className="linkAlign">Dr. Name : <strong className="float-center">{doctorName.name}</strong></li>
                            <li className="linkAlign">Dr. Fees : <strong className="float-center">500</strong></li>
                            <li className="linkAlign">Date : <strong className="float-center">11/12/2017</strong></li>
                            <li className="linkAlign">Time : <strong className="float-right"></strong></li>
                            <li className="linkAlign">Appointment Type : <strong className="float-right"></strong></li>
                        </ul>
                    </div>
                    <Link to="/bookingconfirm" className="btn_1 full-width">Confirm and pay</Link>
                </form>
            </div>
        </aside>
    )
}
export{DoctorBookingConfirmPayment}