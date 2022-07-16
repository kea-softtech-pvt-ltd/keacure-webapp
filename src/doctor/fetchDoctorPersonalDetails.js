import { Link} from "react-router-dom";
import { API } from "../config";
import { useState ,useEffect } from "react";
import axios from "axios";
import Experience from "./totalExperience";

function FetchDoctorPersonalDetails(props) {

    const doctorId = props.doctorId;
    const [fetchPersonalData ,setFetchPersonalData] = useState([])
    
    useEffect(() => {
        getDoctorPersonalDetails();
    },[props])

    const getDoctorPersonalDetails = async () =>{
        const result = await axios.get(`${API}/doctor/${doctorId}`); 
        setFetchPersonalData(result.data[0]);   
    }

    return(
        <div className="profile" >
            <div className="row" key={fetchPersonalData.id}>
                <div className="col-lg-5 col-md-4">
                    <figure>
                        <img 
                            src={`../images/${fetchPersonalData.photo}`}
                            alt="doctorProfile"
                        />
                    </figure>
                </div>
                <div className="col-lg-7 col-md-8">
                    <h1>{fetchPersonalData.name}</h1>
                    <span className="rating">
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star"></i>
                        <small>(145)</small>
                        <Link to="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" className="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""/></Link>
                    </span>
                    <ul className="statistic">
                        <li>854 Views</li>
                        <li>124 Patients</li>
                    </ul>
                    <ul className="contacts">
                        <li>
                            <h6>Address</h6>
                            <address>{fetchPersonalData.address}</address>
                            <Link to="#"> <strong>View on map</strong></Link>
                        </li>
                        <li>
                            <h6>Phone</h6>{fetchPersonalData.mobile}
                            <h6>Email </h6>{fetchPersonalData.personalEmail}
                            {fetchPersonalData["experienceList"]?
                                (
                                <Experience experienceData={fetchPersonalData.experienceList}></Experience>
                                ):null
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export {FetchDoctorPersonalDetails}