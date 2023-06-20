import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'react-bootstrap';
import AuthApi from '../../services/AuthApi';
import { useParams, Link } from 'react-router-dom';
import CalendarModalBox from './partial/CalendarModalBox';
import { MainNav } from '../../mainComponent/mainNav';
const localizer = momentLocalizer(moment)

export default function Calender() {
  const { doctorId } = useParams();
  const { calendarEvent } = AuthApi()
  const [getData, setGetData] = useState([])
  const [show, setShow] = useState(false);
  const [patientIdDetails, setPatientIdDetails] = useState([])
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
    <main>
      <div className="container margin_120_95">
        <div className="row">
          <div className="col-lg-12 ml-auto">
            <MainNav>
              <ul className="clearfix">
                <li>
                  <Link to={`/dashboard/${doctorId}`}>
                    <i className="arrow_back backArrow" title="back button"></i>
                  </Link>
                </li>
                <li className='float-none' style={{ fontSize: 'inherit' }}>Calendar</li>
              </ul>
            </MainNav>
            <div className="box_form">
              <div className="myCustomHeight">
                <Calendar
                  messages={{
                    agenda: 'Schedule'
                  }}
                  localizer={localizer}
                  events={getData}
                  startAccessor="start"
                  endAccessor="end"
                  // allDayAccessor="start"
                  defaultView='agenda'
                  // onEventDrop={onEventDrop}
                  // onSelectSlot={addEvent}
                  eventPropGetter={eventPropGetter}
                  //onSelectSlot={getData}
                  showMultiDayTimes={true}
                  onSelectEvent={handleModalButtonClick}
                  style={{ height: 500, width: 1000 }}
                />
              </div>
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
      </div>
    </main>

  )
}