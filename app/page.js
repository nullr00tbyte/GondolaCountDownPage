"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";

export default function Home() {
  const backgroundImage = 'Gondola_Josue_Angela.svg';

  const nextDate = moment('2023-9-14 07:50:00');
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
  const Messages = [
   
    "Eres la melodía que mece mi alma, en el concierto del cosmos.",
    "La vida es una obra maestra, donde tú eres mi musa y mi inspiración.",
    "En el lienzo de la realidad, pintamos nuestro amor con colores eternos.",
    "Eres la clave que desvela el misterio de mi ser, la respuesta que anhelo encontrar.",
    "El amor es un sendero sin fin, donde cada paso nos acerca a la verdad.",
    "En cada mirada, descubro un universo de posibilidades.",
    "Eres la estrella que guía mi destino, en el firmamento de la existencia.",
    "La esencia del amor es el encuentro de dos almas que se reconocen en la eternidad.",
    "En cada encuentro, la sincronicidad del universo nos une en un solo latido.",
    "Eres el enigma que impulsa mi búsqueda, una pregunta sin respuesta.",
    "El amor es una sinfonía que resuena en el corazón, en cada nota del destino.",
    "En la danza cósmica, nuestros pasos se entrelazan con propósito divino.",
  ];
  

  
  
  return (
    <main className={themeMode ? 'bgImage' : 'bgImageLight'} >
      <div className="grid h-screen justify-center items-center  " style={{ position: 'relative' }}>
        <div className="drop-shadow-[25px_25px_60px_#fff] ">
          <a href="#" onClick={handleNotificationClick}>
            <Image
            alt="Gondola Duality"
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
            <iframe className="pt-5 pb-5 shadow-5" width="560" height="315" src="https://www.youtube.com/embed/EvkCcbd7oJM?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            </div>
            <audio onTimeUpdate={updateTimeSong} ref={audioRef}>
              <source src="lana.mp3" type="audio/mpeg" />
              Tu navegador no soporta la reproducción de audio.
            </audio>
          </div>
          <div className="flex text-center items-center justify-center">
            <p className="italic ">{Messages[days-6]} </p>
          </div>
        </div>
      </div>
    </main>
  )
}
