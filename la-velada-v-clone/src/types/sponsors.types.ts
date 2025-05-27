


type SponsorId =
  | 'Alsa'
  | 'Cerave'
  | 'CocaCola'
  | 'Grefusa'
  | 'InfoJobs'
  | 'Mahou'
  | 'Maxibon'
  | 'Nothing'
  | 'Revolut'
  | 'Spotify'
  | 'Vicio';

type SponsorName =
  | 'Alsa'
  | 'CeraVe'
  | 'Coca-Cola'
  | 'Grefusa'
  | 'InfoJobs'
  | 'Mahou'
  | 'Maxibon'
  | 'Nothing'
  | 'Revolut'
  | 'Spotify'
  | 'Vicio';

  export interface Sponsor {
  id: SponsorId;
  name: SponsorName;
  url: string;
  imagen: {
    logo: any,
  };
}