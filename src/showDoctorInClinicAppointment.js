import { useState } from "react";
import { AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { slots} from "./constant";

function ShowDoctorInClinicAppointment(props){
    const [showText, setShowText] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        setShowText(true);
    };
    const slot = slots;
    
    return(
        <>
        <div>
            <div className="row">
                <div>
                    <Carousel interval={null} controls={true} nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight/></div>} prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft/></div>}>
                        {slot.map((item, index) => {
                        return (
                            <Carousel.Item>
                                <div style={{ height: 100, background: "white", color: "black" }}>
                                    <Carousel.Caption>
                                    <div><b>{item.date}</b></div>
                                    <Link onClick={handleChange}>{item.slot}</Link>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        );
                        })}
                    </Carousel>
                </div>
                {showText? 
                    <section className="radiobutton">
                        <div>
                            <input type="radio" id="control_07" name="select" value="7" checked/>
                            <label for="control_07">
                                <span>12.00</span>
                            </label>
                        </div>
                    </section>
                :null} 
            </div>    
        </div>
        </>
    )
}
export {ShowDoctorInClinicAppointment}