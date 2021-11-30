import { Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import avatarImage from "./img/profile.png";

function FetchPatientInfo(props){
    const {patientId} = props;
    const [fetchPatientData ,setFetchPatientData] = useState([])
    
    useEffect(()=>{
        getAllPatientData()
    },[])

    function getAllPatientData(){
		fetch(`http://localhost:9000/api/patientById/${patientId}`).then(res =>{
			if(res){
				return res.json()
            }
        }).then(jsonRes => {
            setFetchPatientData(jsonRes)
        });
    }
     
    return(
        <>
        <div className="borderhead">
            <div className="form_title">
                <h3>Your Details</h3>
            </div>
        </div>
        <div className="patientDataStyle">
            <div className="row">
                <div className="col-md-6">
                    <div className="doctorphoto">
                    <img
                        src={avatarImage}
                        className="doctorphotoStyle"
                        alt="doctorPhoto"
                    />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-8">
                            <label><b>Patient name :</b></label>
                            {fetchPatientData.name}
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-8">
                            <label><b>Age :</b></label>
                            {fetchPatientData.age}
                        </div>
                    </div>    
                    <div className="row">    
                        <div className="col-md-8">
                            <label><b>Gender :</b></label>
                            {fetchPatientData.gender}
                        </div>
                    </div>    
                    <div className="row">    
                        <div className="col-md-8">
                            <label><b>Email :</b></label>
                            {fetchPatientData.email}
                        </div>
                    </div>
                </div> 
            </div> 
        </div>      
        </>    
    )
}
export {FetchPatientInfo}