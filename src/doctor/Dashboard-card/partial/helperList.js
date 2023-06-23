import React from 'react';
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
import { Icon } from '@material-ui/core';
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
    const { helperList, getHelperDetails } = props;
    const classes = useStyles();
    const { removeHelper } = AuthApi();

    const deleteHelper = async (details) => {
        const id = details._id;
        await removeHelper(id)
        getHelperDetails();
    }

    return (
        <div className="box_form">
            <TableContainer component={Paper}>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Helper Name</b></TableCell>
                            <TableCell align="center"><b>Email Id</b></TableCell>
                            <TableCell align="center"><b>Mobile Number</b></TableCell>
                            <TableCell align="center"><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {helperList.map((details, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="center">{details.username}</TableCell>
                                    <TableCell align="center">{details.email}</TableCell>
                                    <TableCell align="center">{details.mobile}</TableCell>
                                    <TableCell align="center">
                                        <Link to="#" onClick={() => deleteHelper(details)} >
                                            <Icon className="icon-trash-2" style={{ fontSize: 20 }} ></Icon>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    )
}