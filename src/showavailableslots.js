import { slots} from "./constant";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

const ShowVideoAppointSlots = (props)=>{
    const { sessionSlot} = props;
    const {showFeesBySlot} = props;
    return(
        <>
        <b>Fees - <FaRupeeSign/> {showFeesBySlot.fees} /-</b>
        <section>
            {sessionSlot.map((item , index)=>(
                <div key={index}>
                    <Link to={`/doctorbookingwithpatientlogin/${item._id}`} className="btn_1" type="radio">
                        <label>{item.slotTime}</label>
                    </Link>
                </div>
            ))}
        </section>
        </>
    )
}
export {ShowVideoAppointSlots}


const ShowInClinicAppointSlots = (props)=>{
    const {sessionSlot} = props
    const {showFeesBySlot} = props;
    return(
        <>
        <b>Fees - <FaRupeeSign/> {showFeesBySlot.fees} /-</b>
        <section className="radiobutton">
            {sessionSlot.map(item=>(
                <div>
                    <Link to={`/doctorbookingwithpatientlogin/${item._id}`} className="btn_1" type="radio" time={slots}>
                        <label>{item.slotTime}</label>
                    </Link>
                </div>
            ))}
        </section>
        </>
    )
}
export {ShowInClinicAppointSlots}