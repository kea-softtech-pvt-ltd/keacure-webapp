import React,{ useState , useEffect} from "react";
import { AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import {ShowInClinicAppointSlots}  from "./showavailableslots";
import { FaRupeeSign } from "react-icons/fa";

function ShowDoctorInClinicAppointment(props){
    const {setSessions} = props;
    const [showText, setShowText] = useState(false);
    const [dayMonth , setDayMonth]=  useState([])
    console.log(dayMonth)
    const handleChange = (e) => {
        e.preventDefault();
        setShowText(true);
    };

    useEffect(()=>{
        showDateMonth();
        getNextSevenDays();
    },[])

    const showDateMonth =(days) =>{
        //var date = new Date();
        //var month = new Date().getMonth();
        //var month = new Date().getMonth()+1;
        
        var m = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
        //return days + ' ' + m[month] 
        return  m[days]
    }

    const getStringDay = (dayId) => {
        let days = ["sun","mon","tue","wed","thu","fri","sat"]
        return days[dayId]
    }

    const getNextSevenDays = () => {
        let sevenDates = []
        for(let i=0; i<7;i++) {
            let d = new Date();
            let apochDate = d.setDate(d.getDate()+i)
            const day = getStringDay(new Date(apochDate).getDay())
            sevenDates.push({"date": new Date(apochDate).getDate(apochDate), "day":day, "fullDate": new Date(apochDate), "dayMonth": showDateMonth(new Date(apochDate).getDate(new Date(apochDate)))})
        }
        setDayMonth(sevenDates)
        console.log(sevenDates)
    }
    
    return(
        <>
        <div>
            <div className="row">
                {setSessions ? 
                <>
                <div style={{width: "100%"}}>
                    <Carousel interval={null} controls={true} nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight/></div>} prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft/></div>}>
                        {dayMonth.map((item ,index) => (
                            <Carousel.Item key={index}>
                                <div style={{ height: 100, background: "white", color: "black" }}>
                                    <Carousel.Caption>
                                    <div><b>{item.day} {item.dayMonth} <FaRupeeSign/> {setSessions[0].fees}</b></div>
                                    <Link to="#" onClick={handleChange}>Show Available Slots</Link>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                {showText? 
                    <ShowInClinicAppointSlots sessionSlot={setSessions}/>
                :null} 
                </>
                :null}
            </div>    
        </div>
        </>
    )
}
export {ShowDoctorInClinicAppointment}