import { Link,useParams} from "react-router-dom";
import {FetchDoctorPersonalDetails} from "./fetchDoctorPersonalDetails";
import { MainNav } from "./mainComponent/mainNav";

export default function DoctorProfile(){ 
    const {doctorId} = useParams()
    console.log(doctorId)
    return(
        <div>
            <main>
                <div id="breadcrumb">
                    <div className="container">
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="#">Category</Link></li>
                            <li>Page active</li>
                        </ul>
                    </div>
                </div>
                <div className="container margin_60">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <MainNav>
                                <ul className="clearfix">
                                    <li><Link to="#section_1" className="active">General info</Link></li>
                                    <li><Link to="#section_2">Reviews</Link></li>
                                    <li><Link to="#">Payment</Link></li>
                                    <li><Link to={`/editdoctorprofile/${doctorId}`}><i className="icon_pencil-edit" title="Edit profile"></i></Link></li>
                                </ul>
                            </MainNav> 
                                   
                            <div id="section_1">
                                <div className="box_general_3">
                                    <FetchDoctorPersonalDetails doctorId={doctorId}/> 
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>             
	        </main>
        </div>
    )
}