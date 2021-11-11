import { slots} from "./constant";
import { Link } from "react-router-dom";

const ShowAvailableSlot = (props)=>{
    const sessionSlot = props.sessionSlot
    
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
export {ShowAvailableSlot}