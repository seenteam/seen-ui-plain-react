import React, { useState, useEffect } from 'react'
import './Countdown.css'
const dayjs = require('dayjs')
const LocalizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(LocalizedFormat)

const Countdown = () => {

  const [endtime, setEndTime] = useState('')
  const [timerHours, setTimerHours] = useState('')
  const [timerMinutes, setTimerMinutes] = useState('')
  const [timerSeconds, setTimerSeconds] = useState('')
  useEffect(() => {
    let mounted = true;
    const setTime = () => {
      const time = `${dayjs().add(1, 'day').format('LL')} 23:59:59 GMT+0200`;
      setEndTime(time)
    }
    if (mounted) setTime()
    return () => mounted = false;
  })

  const getRemainingTime = () => {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
      return {
      total,
      hours,
      minutes,
      seconds
    };
  }

  const initializeClock = () => {
    if (endtime) {
      const timeinterval = setInterval(() => {
        const t = getRemainingTime(endtime);
        setTimerHours(t.hours)
        setTimerMinutes(t.minutes)
        setTimerSeconds(t.seconds)
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      },1000);
    }
  }

  return (
    <div>
      {initializeClock()}
      <section className="clock">
        <h2>Next Redistribution in:</h2>
        <div className="timer-container">
          <div className="hours">
            <h3>{timerHours}</h3>
            <p>Hours</p>
          </div>
          <div className="minutes">
            <h3>{timerMinutes}</h3>
            <p>Minutes</p>
          </div>
          <div className="seconds">
            <h3>{timerSeconds}</h3>
            <p>Seconds</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Countdown
