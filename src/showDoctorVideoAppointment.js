import { useState} from "react";
import { AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { slots} from "./constant";
import { setDoctorBooking} from "./recoil/atom/setDoctorBooking"
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function ShowDoctorVideoAppointment(props){
    const [coilDoctorBooking , setCoilDoctorBooking ] = useRecoilState(setDoctorBooking)
    const [showText, setShowText] = useState(false);

    const handleChange = () => {
        setShowText(true);
    };

    useEffect(()=>{
        setCoilDoctorBooking(slots)
    },[])
    
    return (
        <div className="row">
            <h6>select Appointment Date And Time</h6>
            <Carousel interval={null} controls={true} nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight/></div>} prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft/></div>}>
                {coilDoctorBooking.map(item=>(    
                    <Carousel.Item>
                        <div style={{ height: 100, background: "white", color: "black" }}>
                            <Carousel.Caption>
                                <div><b>{item.date}</b></div>
                                <Link onClick={handleChange}>{item.slot}</Link>
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            {showText?
                <section className="radiobutton">
                    {coilDoctorBooking.map(item=>(
                    <div>
                        <Link to={`/doctorbookingwithpatientlogin/${item._id}`} className="btn_1" type="radio" time={slots}>
                            <label>{item.time}</label>
                        </Link>
                    </div>
                    ))}
                </section>
            :null} 
        </div>
    )
}
export {ShowDoctorVideoAppointment}