import Main from '../../public/videos/Portals.webm';
import DPortal from '../../public/videos/DPortal.webm';
import IPortal from '../../public/videos/IPortal.webm';

export const videoSources = {
  Main,
  DPortal,
  IPortal
};

export const videoConfig = {
  preloadSources: [
    { src: Main, key: 'main' },
    { src: DPortal, key: 'dportal' },
    { src: IPortal, key: 'iportal' }
  ],
  timeRanges: {
    main: { start: 0.25, end: 1.25 },
    dportal: { start: 0, end: null },
    iportal: { start: 0, end: null }
  },
  playbackSpeeds: {
    main: 0.40,
    dportal: 0.40,
    iportal: 0.40
  }
};

export const portalMap = {
  "right": { source: DPortal, newPortal: "Right", key: "dportal" },
  "left": { source: IPortal, newPortal: "Left", key: "iportal" },
  "main": { source: Main, newPortal: "main", key: "main" }
};

export const portalContent = {
  main: {
    title: "Bienvenido a la sala de los portales!!",
    description: "Desde esta sala puedes acceder a diferentes portales y explorar nuevas dimensiones en busca de \"la Espada del Destino\" capaz de traer la paz al multiverso y felicidad a sus habitantes.",
    subtitle: "Pulsa en un portal para continuar tu aventura\nSigamosle la pista a La Espada del Destino hasta el Lago de La Dama",
    portalText: "Portal al Lago",
    portalSubtext: "(Proyectos)",
    href: "/portfolio"
  },
  Right: {
    title: "Portal del Bosque de las Hadas",
    description: "¿Encontraremos la espada en el Bosque Encantado de las Hadas?",
    subtitle: "(contacto)",
    href: "/contact"
  },
  Left: {
    title: "Portal al Laboratorio",
    description: "Investiguemos en el laboratorio alguna pista sobre la ubicacion de La Espada",
    subtitle: "(about-me)",
    href: "/about"
  }
};
