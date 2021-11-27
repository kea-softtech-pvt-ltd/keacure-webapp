import { useEffect, useState} from "react";
import { AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link, useParams } from "react-router-dom";
import { ShowVideoAppointSlots } from "./showavailableslots";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";

function ShowDoctorVideoAppointment(props){
    const { doctorId } =  useParams()
    const { clinicId } = props;
    const { setSessions } = props;
    const [ showSlot, setShowSlot ] = useState(false);
    const [ dayMonth , setDayMonth ] =  useState([])

    const handleChange = (e, item) => {
        e.preventDefault();
        fetch(`http://localhost:9000/api/fetchDaysSlots`,{
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            day: item.day,
            doctorId:doctorId,
            clinicId:clinicId,
            Appointment:"VideoAppointment" ,
            })      
        })
        .then(res=>res.json())
        .then(response =>{
            console.log(response.data)
        })  
        //const result = axios.get(`http://localhost:9000/api/fetchDaysSlots`,( item.day, doctorId, clinicId, "VideoAppointment"));
        // console.log(item.day, doctorId, clinicId, "VideoAppointment")
        // console.log(result.data)
        setShowSlot(true);
    };

    useEffect(()=>{
        showDateMonth();
        getNextSevenDays();
    },[])

    const showDateMonth =(days) =>{
        var date = new Date();
        var month = new Date().getMonth();
        var m = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
        return days + ' ' + m[month] 
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
            sevenDates.push({"date": new Date(apochDate).getDate(), "day":day, "fullDate": new Date(apochDate), "dayMonth": showDateMonth(new Date(apochDate).getDate(new Date(apochDate)))})
        }
        setDayMonth(sevenDates)
    }

    return (
        <div className="row">
            {setSessions ?(
                <>
                <div style={{width: "100%"}}>
                    <Carousel interval={null} controls={true} nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight/></div>} prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft/></div>}>
                    {dayMonth.map((item, index) => (
                        <Carousel.Item key={index}>
                            <div style={{ height: 100, background: "white", color: "black" }}>
                                <Carousel.Caption>
                                    <div><b>{item.day} {item.dayMonth}<FaRupeeSign/> {setSessions[0].fees}</b></div>
                                    <Link to="#" onClick={(e)=> handleChange(e,item) }>Show Available Slots</Link>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    ))}
                    </Carousel>
                </div>
                
                <>
                {showSlot?
                <ShowVideoAppointSlots sessionSlot={setSessions}/>
                :null} 
                </>
                
                </>
            ):null}
        </div>
    )
}
export {ShowDoctorVideoAppointment}