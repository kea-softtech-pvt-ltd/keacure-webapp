import { slots} from "./constant";
import { Link } from "react-router-dom";

const ShowVideoAppointSlots = (props)=>{
    const { fetchSessionSlots} = props;
    console.log(fetchSessionSlots)
    const { sessionSlot} = props;

    return(
        <section className="radiobutton">
            {sessionSlot.map((item , index)=>(
                <div key={index}>
                    <Link to={`/doctorbookingwithpatientlogin/${item._id}`} className="btn_1" type="radio" time={slots}>
                        <label>{new Date(item.fromTime).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit',timeZone: 'Asia/Kolkata'})}</label>
                    </Link>
                </div>
            ))}
        </section>
    )
}
export {ShowVideoAppointSlots}


const ShowInClinicAppointSlots = (props)=>{
    const {sessionSlot} = props
    console.log(sessionSlot)
    return(
        <section className="radiobutton">
            {sessionSlot.map(item=>(
                <div>
                    <Link to={`/doctorbookingwithpatientlogin/${item._id}`} className="btn_1" type="radio" time={slots}>
                        <label>{new Date(item.fromTime).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit',timeZone: 'Asia/Kolkata'})}</label>
                    </Link>
                </div>
            ))}
        </section>
    )
}
export {ShowInClinicAppointSlots}