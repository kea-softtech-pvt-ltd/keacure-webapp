import { SetSession } from "../Session/setSession";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { setDoctorId } from "../../../../recoil/atom/setDoctorId";
import { SearchClinic } from "./searchClinic";
import AuthApi from "../../../../services/AuthApi";
import ReactPaginate from "react-paginate";

function AddDoctorClinicInfo() {
    const [showSession, setShowSession] = useState(false);
    const [activeModal, setActiveModal] = useState()
    const [clinicList, setClinicList] = useState([]);
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState();
    // const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    // const { clinicDelete } = ClinicApi()
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        getAllClinics(currentPage);
    }, [currentPage, clinicList])

    const pageSize = 5;
    const getAllClinics = (currentPage) => {
        getDrInfo({ doctorId }, currentPage, pageSize)
            .then((jsonRes) => {
                const clinicData = jsonRes['clinicList']
                setTotalPages(jsonRes.clinicListPages)
                setClinicList(clinicData)
            });
    }

    const handleSearchClose = () => setShowSearch(false)
    const handleSearchShow = () => setShowSearch(true)

    const sessionClose = () => {
        setShowSession(null)
        setActiveModal(null);
    };
    const sessionShow = (e, index) => {
        e.preventDefault();
        setActiveModal(index);
    }
    const onSessionFormSubmit = (e) => {
        e.preventDefault();
        sessionClose();
    };
    const handleClose = () => setShow(false);

    const onClinicFormSubmit = () => {
        handleClose();
        handleSearchClose()
    };
    
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1)
    }

    return (
        <div className="">
            <div className="modalbtn">
                <Modal show={showSearch} onHide={handleSearchClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SearchClinic doctorId={doctorId} onSubmit={onClinicFormSubmit} />
                    </Modal.Body>
                </Modal>
            </div>
            {clinicList ?
                <>
                    {clinicList.map((item, index) => (
                        <div className="" key={item._id}>
                            <div className='row'>
                                <figure className="col-md-1">
                                    <img
                                        className='clinicLogo borderRadius'
                                        src={item.clinicLogo}
                                        alt="Clinic Logo"
                                    />
                                </figure>
                                <div className="col-md-3 adminClinic" align='left'>
                                    <div className='fontS' ><b>{item.clinicName}</b></div>
                                    <div className="icon-location fontSize color">
                                        {item.address}
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <Link
                                        to="#"
                                        onClick={(e) => sessionShow(e, index)}
                                        className="patientlistlink">
                                        {<AccessTimeRoundedIcon
                                            style={{ fontSize: 30 }} />}
                                    </Link>
                                </div>
                                {/* <div className="col-md-1" >
                                    <Link className="patientlistlink" to="#" onClick={() => handleDeleteShow(item)}>
                                        <Icon className="icon-trash-2" style={{ fontSize: 25 }} ></Icon>
                                    </Link>
                                </div> */}
                            </div>

                            <Modal show={activeModal === index} onHide={sessionClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Set Session</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SetSession
                                        doctorId={doctorId}
                                        clinicId={item._id}
                                        onSubmit={onSessionFormSubmit}
                                    />
                                </Modal.Body>
                            </Modal>
                        </div>
                    ))}
                </> : null}

            <div align='right'>
                <MainButtonInput className='align-left ' onClick={handleSearchShow}>ADD CLINIC</MainButtonInput>
            </div>
            <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< Previous"
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={2}
                    containerClassName="pagination "
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
            {/* <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">You Want To Delete This Session</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => deleteClinicData(Item)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    )
}
export { AddDoctorClinicInfo }