import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AuthApi from "../../../services/AuthApi";
import { CardActions, Icon } from '@material-ui/core';
import { Button, Card, Modal } from 'react-bootstrap';
import { MainCards } from '../../../mainComponent/mainCards';
//for table
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    table: {
        minWidth: 650,
    },

}));

export default function HelperList(props) {
    const { doctorId } = props;
    const classes = useStyles();
    const [helperList, setHelperList] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [details, setDetails] = useState([])
    const { removeHelper, getHelper } = AuthApi();
    // const { state } = useLocation()
    // const { doctorId } = state.data

    useEffect(() => {
        getHelperDetails();
    }, [])
    const handleDeleteShow = (details) => {
        setDetails(details)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false)
    async function getHelperDetails() {
        const result = await getHelper(doctorId);
        const data = result.filter((helper) => {
            if (helper.isDeleted === false) {
                return helper
            }
        })
        setHelperList(data)
    }

    async function deleteHelper(details) {
        const id = details._id;
        await removeHelper(id)
        getHelperDetails()
        handleDeleteClose()
    }

    return (
        <div>
            <div className='row'>
                {helperList.map((details, i) => {
                    return (
                        <div className="col-md-3">
                            <div className="mainCards">
                                <span className='cardSpan'>
                                    <i className='icon-user color' />
                                    <b className=' fontSize'>{details.username}</b>
                                </span>
                                <span className='cardSpan'>
                                    <i className='icon-email color' />
                                    {details.email}
                                </span>
                                <span className='cardSpan'>
                                    <i className='icon-mobile-1 color' />
                                    {details.mobile}
                                </span>
                                <span className='cardSpan'>
                                    <Link to={`/edithelper/${details._id}`} >
                                        <Button className='appColor helperBtn' >Edit</Button>
                                    </Link>
                                    <Link to="#" onClick={() => handleDeleteShow(details)}>
                                        <Button className="appColor helperBtn" >Delete</Button>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">
                        You Want To Delete This Assistant
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='appColor' variant="default " onClick={() => deleteHelper(details)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </div >

    )
}