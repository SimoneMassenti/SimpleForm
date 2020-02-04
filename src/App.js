import React, { useState } from 'react'
import {
  Container,
  Form,
  Button,
  FormControl,
  Modal,
  Spinner,
} from 'react-bootstrap'
import DatePicker from 'react-datepicker'

import "./App.css";

const arrCourses = [
  'Technical Report Writing',
  'English Literature',
  'Computer Sciences'
]

const arrSubjects = [
  [
    'Short Reports',
    'Annual Reports',
    'Presentations'
  ],
  [
    'Poetry',
    'Short Stories',
    'Drama'
  ],
  [
    'Web Development',
    'Desktop Software Development',
    'Research and Analysis'
  ]
]

const App = () => {
  const [validation, setValidation] = useState(false)
  const [course, setCourse] = useState(-1)
  const [subject, setSubject] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleOnChangeDate = date => {
    setStartDate(date)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setValidation(true)

    if (isSubmittable()) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setCompleted(true)
      }, 3000)
    }
  }

  const handleClose = () => setCompleted(false);

  const isSubmittable = () => {
    if (course === -1) return false

    if (course === -1) return false

    if (notes.length > 0 && (notes.length < 20 || notes.length > 500)) return false

    return isValidDate(startDate)
  }

  const isValidDate = (someDate) => {
    const isEqual = (yyyy, mm, dd) => {
      const day = new Date(yyyy, mm, dd)
      return someDate.getDate() === day.getDate() &&
        someDate.getMonth() === day.getMonth() &&
        someDate.getFullYear() === day.getFullYear()
    }

    return isEqual(2019, 11, 20) || isEqual(2020, 0, 15) || isEqual(2020, 1, 1)
  }

  return (
    <Container style={{
      width: '500px',
      margin: '100px auto 0 auto',
      padding: '1rem',
      border: '.2rem solid #ececec',
      borderWidth: '.2rem',
      borderRadius: '8px',
    }}>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <Form.Group>
            <Form.Label>Course</Form.Label>
            {
              arrCourses.map((label, index) => (
                <Form.Check
                type="radio"
                label={label}
                name="formRadioCourses"
                key={`formRadioCourseItem${index}`}
                onClick={() => {
                  setCourse(index)
                  setSubject(-1)
                }}
              />
              ))
            }
            {
              validation && course === -1 && 
              <div className="invalid-field">Course is a required field.</div>
            }
          </Form.Group>
        </fieldset>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          {
            course >=0 && 
            <Form.Control as="select" value={subject} onChange={(e) => {setSubject(e.target.value)}}>
              <option value={-1} disabled>Please select</option>
            {
              arrSubjects[course].map((label, index) => 
                <option 
                  key={`formSelectSubjectItem${course * 3 + index}`}
                  value={index}
                >{label}</option>
              )
            }
          </Form.Control>
          }
          {
            validation && course === -1 && 
            <div className="invalid-field">Please select course first.</div>
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label><br/>
          <DatePicker
            id="startDatePicker"
            selected={startDate} 
            onChange={handleOnChangeDate}
            placeholderText="Click to select a date"
          />
          {
            validation && startDate === null && 
            <div className="invalid-field">Select your start date.</div>
          }
          {
            validation && startDate && !isValidDate(startDate) && 
            <div className="invalid-field">Your selected course and subject is not offered beginning from your selected date.</div>
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>Additional Notes</Form.Label>
          <FormControl as="textarea" 
            id="addtionalNotes"
            value={notes} 
            onChange={(e) => {
              setNotes(e.target.value)
          }}/>
          {
            validation && notes.length > 0 && (notes.length < 20 || notes.length > 500) &&
            <div className="invalid-field">The length must be between 20 ~ 500.</div>
          }
        </Form.Group>
        <Button type="submit">
          { loading && <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />}
          Submit
        </Button>
      </Form>
      <Modal show={completed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your course has been successfully registered!</Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
