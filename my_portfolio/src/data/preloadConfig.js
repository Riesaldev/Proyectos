import Main from '../../public/videos/Portals.webm';
import DPortal from '../../public/videos/DPortal.webm';
import IPortal from '../../public/videos/IPortal.webm';
import PuertaVideo from '../../public/videos/puerta.mp4';
import Lake from '../../public/videos/Lake.webm';
import Lab from '../../public/videos/Lab.webm';
import Sword from '../../public/videos/Sword.webm';

export const preloadConfig = {
  videos: [
    { url: Main, key: 'main' },
    { url: DPortal, key: 'dportal' },
    { url: IPortal, key: 'iportal' },
    { url: PuertaVideo, key: 'puerta' },
    { url: Lake, key: 'lake' },
    { url: Lab, key: 'lab' },
    { url: Sword, key: 'sword' }
  ],
  
  initialVideoStates: {
    main: false,
    dportal: false,
    iportal: false,
    puerta: false,
    lake: false,
    lab: false,
    sword: false,
  },
  
  initialProgressStates: {
    main: 0,
    dportal: 0,
    iportal: 0,
    puerta: 0,
    lake: 0,
    lab: 0,
    sword: 0,
  },
  
  magicPhrases: [
    "Conjurando el código...",
    "Elaborando pociones de UI...",
    "Invocando las animaciones...",
    "Domesticando bugs...",
    "Implorando a los Dioses Antiguos..."
  ],
  
  totalVideos: 7,
  dragonProgressWeight: 30, // 30% del progreso total
  videoProgressWeight: 70,  // 70% del progreso total
  phraseChangeInterval: 800, // ms
  progressUpdateInterval: 200, // ms
  dragonLoadDelay: 100 // ms
};
