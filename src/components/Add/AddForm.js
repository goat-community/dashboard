import classes from './AddForm.module.css';
import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

const AddForm = () => {
  const history = useHistory();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log(Moment(selectedDate).format('DD-MM-YYYY'));
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://goat-dev.plan4better.de/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({
     
        first_name: name,
        middle_name: middleName,
        last_name: lastName,
        email: email,
       
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        history.replace('/');
        alert(`Item added!`) 
       });
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
      <label >Id</label>
        <input  type="text" 
          value={id}
          onChange={(e) => setId(e.target.value)} />
        <label >First Name</label>
        <input  type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} />
            <label >Middle Name</label>
            <label >Last Name</label>
        <input  type="text" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} />
        <label >Email</label>
        <input  type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <label >Password</label>
          <input className={classes.input} type='password' id='password' placeholder='Password'   />
          <label >Confirm Password</label>
          <input className={classes.input} type='password' id='password' placeholder=' Confirm Password' />
   
      </div>
      <div className={classes.action}>
        <button type="submit" >Add new employee</button>
      </div>
    </form>
  );
}

export default AddForm;
