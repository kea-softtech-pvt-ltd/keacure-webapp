import { useEffect, useState} from "react";
import { AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { ShowAvailableSlot } from "./showAvailableSlot";
import { FaRupeeSign } from "react-icons/fa";

function ShowDoctorVideoAppointment(props){
    const setSessions = props.setSessions;
    const [showSlot, setShowSlot] = useState(false);
    const [dayMonth , setDayMonth]=  useState('')
    console.log(dayMonth)
    const handleChange = (e) => {
        e.preventDefault();
        setShowSlot(true);
    };

    useEffect(()=>{
        showDateMonth();
    })

    const showDateMonth =(days) =>{
        var date = new Date().getDate();
        // const date = new Date(this.valueOf());
        // date.setDate(date.getDate() + days);
        // var date = new Date();
        // date.setDate(date.getDate() + days);
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
                    <Carousel interval={null} controls={true} nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight/></div>} prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft/></div>}>
                        <Carousel.Item>
                            <div style={{ height: 100, background: "white", color: "black" }}>
                                <Carousel.Caption>
                                    <div><b>{dayMonth} <FaRupeeSign/> {setSessions[0].fees}</b></div>
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