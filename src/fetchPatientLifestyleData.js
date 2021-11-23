import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal} from "react-bootstrap";
import { EditLifeStyleData}  from "./editlifestyledata";
import { useRecoilState } from "recoil";
import { setPatientLifestyle}  from "./recoil/atom/setPatientLifestyle";

function FetchPatientLifestyleData(props){
    const { patientId} = props;
    const [ fetchPatientdata , setFetchPatientData] = useRecoilState(setPatientLifestyle)
    //const [ fetchPatientdata , setFetchPatientData] = useState([])
    console.log(fetchPatientdata)
    const [ activeModal, setActiveModal] = useState()

    const handleClose = () =>{
        setActiveModal(null)
    }

    const handleShow = (e ,index) =>{
        e.preventDefault()
        setActiveModal(index)
    };
    
    const lifeStyleData = () => {
        handleClose(true);
    };
    useEffect(()=>{
        getPatientData()
    },[])

    async function getPatientData(){
        const result = await axios.get(`http://localhost:9000/api/fetchPatientLifestyleInfo/${patientId}`);
        setFetchPatientData(result.data)
    }
    return(
        <>
        {fetchPatientdata.map((item , index)=>(
        <div className="box_form">
            <Link onClick={e => handleShow(e , index)} className="editbutton"><i className="icon_pencil-edit" title="Edit profile"></i></Link>
            <Modal show={activeModal === index} onHide={handleClose} id={`item-${item._id}`} key={item._id}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Patient Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditLifeStyleData patientId={patientId} lifeStyleId={item._id} onSubmit={lifeStyleData} />
                </Modal.Body>
            </Modal>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="fetchedudata">
                        <div><b>Smoking Habits</b></div>
                        <div>{item.smokingHabits}</div>
                    </div>
                    <div className="fetchedudata">
                        <div><b>Alcohol Consumption</b></div>
                        <div>{item.alcoholConsumption}</div>
                    </div>
                </div>

                <div className="col-md-6 ">
                    <div className="fetchedudata">
                        <div><b>Food Preferences</b></div>
                        <div>{item.foodPreferences}</div>
                    </div>
                    <div className="fetchedudata">
                        <div><b>Occupation</b></div>
                        <div>{item.occupation}</div>
                    </div>
                    {/* <div className="fetchedudata">
                        <div><b>ActivityLevel</b></div>
                        <div>{item.activityLevel}</div>
                    </div> */}
                </div>
            </div>
        </div> 
        ))}   
        </>
    )
}
export {FetchPatientLifestyleData}