// Appointments Component
import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment // return unchanged appointment if id doesn't match
      }),
    }))
  }

  onFilter = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="main-container">
        <div className="appointment-card">
          <div className="appointment-image">
            <form className="form" onSubmit={this.addAppointment}>
              <h1 className="form-header">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                onChange={this.onChangeTitleInput}
                value={titleInput}
                className="input"
                id="title"
                placeholder="Title"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                onChange={this.onChangeDateInput}
                value={dateInput}
                className="input"
                id="date"
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="line" />
          <div className="header-with-filter-container">
            <h1 className="form-header">Appointments</h1>
            <button
              type="button"
              onClick={this.onFilter}
              className={'filter-style ' + filterClassName}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
