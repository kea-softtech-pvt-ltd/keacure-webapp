import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'react-bootstrap';
import AuthApi from '../../services/AuthApi';
import { useParams, Link } from 'react-router-dom';
import CalendarModalBox from './partial/CalendarModalBox';
import { MainNav } from '../../mainComponent/mainNav';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from './partial/uselinks';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
const localizer = momentLocalizer(moment)

export default function Calender() {
  const { doctorId } = useParams();
  const { calendarEvent } = AuthApi()
  const [getData, setGetData] = useState([])
  const [show, setShow] = useState(false);
  const [patientIdDetails, setPatientIdDetails] = useState([])
  const [helpersData, setHelpersData] = useRecoilState(setHelperData)

  useEffect(() => {
    handleOnSelectSlot();
  }, [])

  const handleClose = () => {
    setShow(false)
  }

  const handleModalButtonClick = (item) => {
    const patientId = item.patientId
    setShow(true)
    setPatientIdDetails(patientId)
  }
  const handleOnSelectSlot = async () => {
    const result = await calendarEvent({ doctorId })
    const calendarData = []
    result.map((item) => {
      calendarData.push({
        id: item._id,
        title: item.patientDetails[0].name,
        start: new Date(item.startDate),
        end: new Date(moment(item.startDate).add({ hours: 0, minutes: item.timeSlot }).toString()),
        timeslots: item.timeSlot,
        status: item.status,
        patientId: item.patientDetails[0]._id

      })
    })
    setGetData(calendarData);
  }
  const eventPropGetter = (event) => {
    const backgroundColor = event.status === "Completed" ? '#c0d2fc' : '#1a3c8b';
    const color = event.status === "Completed" ? '#333' : '#fff';
    return { style: { backgroundColor, color } }
  }

  return (
    <Wrapper>
      <MainNav>
        <ul className="clearfix">
          {/* <li>
            <Link to={`/dashboard/${doctorId}`}>
              <i className="arrow_back backArrow" title="back button"></i>
            </Link>
          </li> */}
          <li className='float-none' style={{ fontSize: 'inherit' }}>Schedule-Calendar</li>
        </ul>
      </MainNav>
      <div className="row">
        <UserLinks
          doctorId={doctorId}
          helperId={helpersData._id}
          accessModule={helpersData.access_module}
        />
        <div className="common_box">
          <div className="myCustomHeight ">
            <Calendar
              messages={{
                agenda: 'Schedule'
              }}
              localizer={localizer}
              events={getData}
              startAccessor="start"
              endAccessor="end"
              defaultView='agenda'
              eventPropGetter={eventPropGetter}
              showMultiDayTimes={true}
              selectable={true}
              onSelectEvent={handleModalButtonClick}
              // style={{width:1000, height:500}}
              style={{ height: 'calc(80vh - 80px)', width: '100%' }}
            />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarModalBox patientId={patientIdDetails} onSubmit={handleModalButtonClick} />
        </Modal.Body>
      </Modal>
    </Wrapper>

  )
}