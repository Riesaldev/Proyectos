"use client";

import type { Sponsor } from '../types/sponsors.types';

import Alsa from '../assets/sponsors/Alsa.svg';
import Cerave from '../assets/sponsors/Cerave.svg';
import CocaCola from '../assets/sponsors/CocaCola.svg';
import Grefusa from '../assets/sponsors/Grefusa.svg';
import InfoJobs from '../assets/sponsors/Infojobs.svg';
import Mahou from '../assets/sponsors/Mahou.svg';
import Maxibon from '../assets/sponsors/Maxibon.svg';
import Nothing from '../assets/sponsors/Nothing.svg';
import Revolut from '../assets/sponsors/Revolut.svg';
import Spotify from '../assets/sponsors/Spotify.svg';
import Vicio from '../assets/sponsors/Vicio.svg';

const SPONSORS: Sponsor[] = [
  {
    id: 'Alsa',
    name: 'Alsa',
    url: 'https://www.alsa.es/',
    imagen: {
      logo: Alsa,
    }
  },
  {
    id: 'Cerave',
    name: 'CeraVe',
    url: 'https://www.cerave.com/',
    imagen: {
      logo: Cerave,
    }
  },
  {
    id: 'CocaCola',
    name: 'Coca-Cola',
    url: 'https://www.coca-cola.com/',
    imagen: {
      logo: CocaCola,
    }
  },
  {
    id: 'Grefusa',
    name: 'Grefusa',
    url: 'https://www.grefusa.com/',
    imagen: {
      logo: Grefusa,
    }
  },
  {
    id: 'InfoJobs',
    name: 'InfoJobs',
    url: 'https://www.infojobs.net/',
    imagen: {
      logo: InfoJobs,
    }
  },
  {
    id: 'Mahou',
    name: 'Mahou',
    url: 'https://www.mahou.es/',
    imagen: {
      logo: Mahou,
    }
  },
  {
    id: 'Maxibon',
    name: 'Maxibon',
    url: 'https://www.maxibon.com/',
    imagen: {
      logo: Maxibon,
    
    }
  },
  {
    id: 'Nothing',
    name: 'Nothing',
    url: 'https://www.nothing.com/',
    imagen: {
      logo: Nothing,
    }
  },
  {
    id: 'Revolut',
    name: 'Revolut',
    url: 'https://www.revolut.com/',
    imagen: {
      logo: Revolut,
    }
  },
  {
    id: 'Spotify',
    name: 'Spotify',
    url: 'https://www.spotify.com/',
    imagen: {
      logo: Spotify,
    }
  },
  {
    id: 'Vicio',
    name: 'Vicio',
    url: 'https://www.vicio.com/',
    imagen: {
      logo: Vicio,
    }
  }
];

export const Sponsors: React.FC = () => {

  const firstRow = SPONSORS.slice(0, 5);
  const secondRow = SPONSORS.slice(5);

  return (
    <>
      <div className='grid grid-cols-5 text-[#f7d8fd]'>
        {
          firstRow.map((sponsor) => (
            <a
              href={sponsor.url}
              target='_blank'
              rel='noopener noreferrer'
              key={sponsor.name}
              className='hover:scale-125 transition flex items-center justify-center'
              title={sponsor.name}
            >
              <div className="w-24 h-12 flex items-center justify-center">
                <sponsor.imagen.logo
                  className="w-24 h-12 object-fit"
                />
              </div>
            </a>
          ))
        }
      </div>
      <div className='grid grid-cols-6 text-[#f7d8fd]'>
        {
          secondRow.map((sponsor) => (
            <a
              href={sponsor.url}
              target='_blank'
              rel='noopener noreferrer'
              key={sponsor.name}
              className='hover:scale-125 transition flex items-center justify-center'
              title={sponsor.name}
            >
              <div className="w-24 h-12 flex items-center justify-center">
                <sponsor.imagen.logo
                  className="w-24 h-12 object-fit"
                />
              </div>
            </a>
          ))
        }
      </div>
    </>
  );
};
