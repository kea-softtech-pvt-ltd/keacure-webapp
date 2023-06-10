import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@material-ui/core';

const GetMedicinePriscription = (props) => {
    const { reportId } = props;
    const { getMedicinePrescriptionData } = AuthApi();

    const [showMedicineData, setShowMedicineData] = useState([])

    useEffect(() => {
        getMedicineData()
    }, [showMedicineData])

    async function getMedicineData() {
        const result = await getMedicinePrescriptionData({ reportId })
        setShowMedicineData(result);

    }

    return (
        <div className='whiteBox'>
            {showMedicineData.length > 0 ?
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><b>Index</b></TableCell>
                            <TableCell align='center'><b>Medicine Name</b></TableCell>
                            <TableCell align='center'><b>Take</b></TableCell>
                            <TableCell align='center'><b>Duration</b></TableCell>
                            <TableCell align='center'><b>Slots</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showMedicineData.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align='center'>{i + 1}</TableCell>
                                    <TableCell align='center'>{item.medicineName}</TableCell>
                                    <TableCell align='center'>{item.timing}</TableCell>
                                    <TableCell align='center'>{item.days}</TableCell>
                                    <TableCell align='center'>
                                        {item['frequency'].map((schedule, index) => {
                                            return (
                                                <>{schedule.schedule}, </>
                                            )
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
          :  null}
        </div>

    )


}
export default GetMedicinePriscription;