import { useEffect, useState } from "react";
import "./App.css";
import TimeCard from "./components/TimeCard";

function App() {
  const [date, setDate] = useState('');
  const [clicked, setClicked] = useState(false);
  const [timeDifference, setTimeDifference] = useState({ days:0, hours:0, minutes:0, seconds:0});
  const [cancelButton, setCancelButton] = useState(false);
  const [newAlert, setNewAlert] = useState('')

  const timer = (event) => {
   
    event.preventDefault();
    setClicked(true);
    setCancelButton(true);
  }
  
  useEffect(()=>{
    if(!clicked)  return; 
    const updateTimer = () => {
    const inputDate = new Date(date)
    const currentDate = new Date();

    const diffTime = inputDate - currentDate;

    const days = Math.floor(diffTime/(1000*60*60*24))
    const hours = Math.floor((diffTime % (1000*60*60*24))/(1000*60*60))
    const minutes = Math.floor((diffTime % (1000*60*60))/(1000*60))
    const seconds = Math.floor((diffTime % (1000*60))/(1000))
    if(days > 99){
      setNewAlert('The maximum days for the countdown timer should be 99 days.')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if(hours > 24){
      setNewAlert('The maximum hours for the countdown timer should be 23 hours')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if(minutes > 60){
      setNewAlert('The maximum minutes for the countdown timer should be 59 minutes')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if(seconds > 60){
      setNewAlert('The maximum seconds for the countdown timer should be 59 seconds')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if((days || hours || minutes || seconds) < 0){
      setNewAlert('The countdown timer has expired')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else {
      setTimeDifference({days, hours, minutes, seconds});
      }
    }
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);

  },[clicked, date]);

  const cancelTimer = () => {
    setClicked(false);
    setCancelButton(false);
  }

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div>
        <form className="datepicker" onSubmit={timer}>
          <input type="datetime-local" id="date" name="date" onChange={event => setDate(event.target.value)} value={date} required/>
          <input type="submit" value="Submit" />
        </form>
        {clicked && cancelButton ? 
        <button onClick={cancelTimer}>Cancel Timer</button> : <><div><h4>{newAlert}</h4></div></>}
      </div>

      {clicked ? (
      <div className="timerCard">
        <TimeCard timeDifference={timeDifference.days} title={'Days'} />
        <TimeCard timeDifference={timeDifference.hours} title={'Hours'} />
        <TimeCard timeDifference={timeDifference.minutes} title={'Minutes'} />
        <TimeCard timeDifference={timeDifference.seconds} title={'Seconds'} />
      </div> ) : newAlert === '' ? (
        <h1>Start Timer</h1> ): null
      }
    </div>
  );  
}

export default App;
