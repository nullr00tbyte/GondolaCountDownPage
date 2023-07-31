"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";

export default function Home() {
  const backgroundImage = 'Gondola_Josue_Angela.svg';

  const nextDate = moment('2023-10-04 07:50:00');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(60); // Default duration in seconds
  const [PlayingSound, setPlayingSound] = useState(true)
  const [themeMode, setThemeMode] = useState('dark')
  const [songPercent, setSongPercent] = useState(0)

  function toggleTheme() {
    setThemeMode(!themeMode)
  }

  function calculateRemainTime() {
    const secondsLeft = nextDate.diff(moment(), 'seconds');
    const minutes = Math.floor(secondsLeft / 60) % 60;
    const hours = Math.floor(secondsLeft / 3600) % 24;
    const days = Math.floor(secondsLeft / 86400);
    setSeconds(secondsLeft % 60);
    setMinutes(minutes);
    setHours(hours);
    setDays(days);

    // Interpolate the animation duration based on days remaining
    const maxDuration = 30; // Maximum duration in seconds (image rotation in 1 minute)
    const minDuration = 1; // Minimum duration in seconds (image rotation in 5 seconds)
    const remainingDays = days + hours / 24 + minutes / (24 * 60) + seconds / (24 * 60 * 60);
    const interpolatedDuration = minDuration + (remainingDays / 30) * (maxDuration - minDuration); // Adjust 30 based on your preference
    setAnimationDuration(interpolatedDuration);
  }

  const audioRef = useRef(null);

  function updateTimeSong(e) {
    const audio = audioRef.current;
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const toPlay = Math.round(((currentTime / duration) * 100));
    setSongPercent(toPlay);
  }

  function handleNotificationClick() {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      createNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          createNotification();
        } else {
          console.error("Permission for notifications was denied.");
        }
      });
    }
  }

  function createNotification() {
    const options = {
      body: 'Notification Body',
      icon: 'https://www.vkf-renzel.com/outs/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      dir: 'ltr',
    };

    const notification = new Notification("Hi there!", options);
    notification.onclick = () => {
      window.focus();
    };
  }

  function playSound() {
    const audio = audioRef.current;
    audio.play();
    setPlayingSound(false);
  }

  function pauseSound() {
    const audio = audioRef.current;
    audio.pause();
    setPlayingSound(true);
  }

  useEffect(() => {
    Notification.requestPermission();
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeMode(true);
    } else {
      setThemeMode(false);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const colorScheme = event.matches ? true : false;
      setThemeMode(colorScheme);
    });

    const timer = setInterval(() => {
      calculateRemainTime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className={themeMode ? 'bgImage' : 'bgImageLight'} >
      <div className="grid h-screen justify-center items-center  " style={{ position: 'relative' }}>
        <div className="drop-shadow-[25px_25px_60px_#fff] ">
          <a href="#" onClick={handleNotificationClick}>
            <Image
              className="drop-shadow-[-25px_-25px_60px_#f1889b]"
              src={backgroundImage}
              width={900}
              height={0}
              style={{
                zIndex: -1,
                animation: `rotation ${animationDuration}s infinite linear`,
              }}
            />
          </a>
        </div>

        <div className="grid columns-2 justify-center items-center">
          <div>
            <div className="flex items-center justify-center">
              <p className="text-center  sm:text-xl md:text-5xl">{days} Dias, {hours} Horas, {minutes} Minutos, {seconds} Segundos</p>
            </div>
            <div className="flex items-center justify-center">
              {PlayingSound ? <button onClick={playSound} className="font-bold py-2 px-4 rounded m-10">
                <svg className="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                  <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                </svg>
              </button> : <button onClick={pauseSound} className="text-white font-bold py-2 px-4 rounded m-10">
                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                  <path fillRule="evenodd" d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z" clipRule="evenodd" />
                </svg>
              </button>}
              <div className="w-full items-center justify-center bg-red rounded-full h-2.5 mb-4 bg-black dark:bg-white">
                <div className="bg-blue h-2.5 rounded-full bg-gradient-to-r from-white to-pink-500" style={{
                  width: `${songPercent}%`
                }}></div>
                Miranda! - Perfecta 
              </div>

              <div className="items-center justify-center h-2.5 mb-8 ml-3 mr-3 ">
                <svg className="w-6 h-6  text-red-800 dark:text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
              </div>

            </div>
            <audio onTimeUpdate={updateTimeSong} ref={audioRef}>
              <source src="perfecta.mp3" type="audio/mpeg" />
              Tu navegador no soporta la reproducción de audio.
            </audio>
          </div>
          <div className="flex text-center items-center justify-center">
            <p className="italic ">En el lienzo del destino, nuestros corazones se entrelazaron.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
