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
  const Messages = [
    "En el encuentro de dos almas, se despiertan infinitas posibilidades.",
    "La distancia entre tú y yo solo existe en la ilusión de la separación.",
    "Eres como un espejo, reflejando la belleza que hay en mí.",
    "El amor es un misterio, un laberinto sin fin de conexiones y significados.",
    "Cada instante de espera es un peldaño que nos acerca al reencuentro.",
    "Eres un enigma que me cautiva, una pregunta sin respuesta.",
    "El tiempo es solo una ilusión, nuestro amor trasciende las dimensiones.",
    "En cada mirada se revela el universo que vive en tus ojos.",
    "La esencia de la vida es fluir como un río, sin resistencia ni apego.",
    "Eres un sueño dentro de un sueño, una realidad tejida de fantasías.",
    "Nuestro amor es un eco en el tiempo, resonando en el corazón del universo.",
    "En el abrazo del infinito, nuestros corazones encuentran su hogar.",
    "Eres un universo por descubrir, con galaxias de emociones y pensamientos.",
    "La existencia es un baile cósmico, donde nuestras almas se entrelazan.",
    "En cada palabra compartida se forja el entendimiento de dos seres.",
    "El amor es un viaje eterno, en el cual siempre estamos en camino.",
    "Eres una melodía en la sinfonía del cosmos, un acorde perfecto.",
    "La eternidad se revela en un instante, cuando nuestros corazones se encuentran.",
    "Somos como hojas flotando en el río del destino, navegando juntos.",
    "En cada encuentro, el universo conspira para unir nuestras almas.",
    "Eres el enigma que da sentido a mi existencia, un puzle por resolver.",
    "La conexión entre tú y yo trasciende cualquier lógica o razón.",
    "Eres la danza del ser, en el fluir constante del tiempo y el espacio.",
    "En cada suspiro, nos sumergimos en el océano de lo desconocido.",
    "El amor es una búsqueda infinita, donde cada encuentro es un hallazgo.",
    "Eres una pregunta sin respuesta, una búsqueda incesante de significado.",
    "La vida es un lienzo en blanco, donde escribimos nuestra historia juntos.",
    "En el tejido del destino, nuestros hilos se entrelazan con propósito.",
    "Eres el reflejo de mi alma, en el espejo de la existencia.",
    "El amor es como un río que fluye sin cesar, llevándonos hacia lo desconocido.",
    "En cada pensamiento, encuentro una razón para amarte más.",
    "Eres la pregunta que da sentido a mi búsqueda, un enigma por resolver.",
    "La vida es una danza cósmica, donde nuestros pasos están sincronizados.",
    "En cada latido, se dibuja la geometría del amor en el universo.",
    "Eres la melodía que mece mi corazón, en el ritmo de la existencia.",
    "El amor es un enigma divino, donde cada respuesta conduce a una nueva pregunta.",
    "En el silencio del universo, nuestras almas se encuentran sin palabras.",
    "Eres una partícula en el tejido del cosmos, conectada con todo lo que existe.",
    "La esencia del amor es el encuentro de dos almas en el eterno ahora.",
    "En cada encuentro, la sincronicidad del universo nos une en un solo latido.",
    "Eres el eco de mi ser, resonando en los confines del universo.",
    "El amor es una danza eterna, donde nuestros pasos se funden en un solo compás.",
    "En cada pensamiento, encuentro la poesía de tu existencia.",
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
