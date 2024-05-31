import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState('');
  const [clicked, setClicked] = useState(false);
  const [timeDifference, setTimeDifference] = useState({ days:0, hours:0, minutes:0, seconds:0});
  const [cancelButton, setCancelButton] = useState(false);

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

    const diffTime = Math.abs(inputDate - currentDate);

    const days = Math.floor(diffTime/(1000*60*60*24))
    const hours = Math.floor((diffTime % (1000*60*60*24))/(1000*60*60))
    const minutes = Math.floor((diffTime % (1000*60*60))/(1000*60))
    const seconds = Math.floor((diffTime % (1000*60))/(1000))

    if(days > 99){
      alert('The maximum days for the countdown timer should be 99 days.')
      
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if(hours > 24){
      alert('The maximum hours for the countdown timer should be 23 hours')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if(minutes > 60){
      alert('The maximum minutes for the countdown timer should be 59 minutes')
      clearInterval(timerId);
      setClicked(false);
      return;
    }else if(seconds > 60){
      alert('The maximum seconds for the countdown timer should be 59 seconds')
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
        <button onClick={cancelTimer}>Cancel Timer</button> : <></>}
      </div>

      {clicked ? (
      <div className="timerCard">
        <h2>Days: {timeDifference.days}</h2>
        <h2>Hours: {timeDifference.hours}</h2>
        <h2>Minutes: {timeDifference.minutes}</h2>
        <h2>Seconds: {timeDifference.seconds}</h2>
      </div> ) : ( 
      <h1>Start Timer</h1>
      )}
    </div>
  );  
}

export default App;
