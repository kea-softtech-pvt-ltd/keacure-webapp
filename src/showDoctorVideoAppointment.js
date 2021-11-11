import { useEffect, useState} from "react";
import { AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { ShowAvailableSlot } from "./showAvailableSlot";

function ShowDoctorVideoAppointment(props){
    const setSessions = props.setSessions;
    const [showSlot, setShowSlot] = useState(false);
    const [dayMonth , setDayMonth]=  useState('')
    const handleChange = (e) => {
        e.preventDefault();
        setShowSlot(true);
    };

    useEffect(()=>{
        showDateMonth();
    })

    const showDateMonth =() =>{
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var label = [{month: month}]
        var months = [];
        var m = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

        label.forEach(function(value){
            var monthName = m[value.month];
            months.push(monthName);
        });
        setDayMonth(date + ' ' + months  );
    }

    return (
        <div className="row">
            {setSessions ?(
            <>
            <div>
            {/* <h6>select Appointment Date And Time</h6> */}
            <Carousel interval={null} controls={true} nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight/></div>} prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft/></div>}>
                <Carousel.Item>
                    <div style={{ height: 100, background: "white", color: "black" }}>
                        <Carousel.Caption>
                            <div><b>{dayMonth} {setSessions[0].fees} fee</b></div>
                            <Link onClick={handleChange}>6 slot Available</Link>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
            </div>
            {showSlot?
                <ShowAvailableSlot sessionSlot={setSessions}/>
            :null} 
            </>
            ):null}
        </div>
    )
}
export {ShowDoctorVideoAppointment}