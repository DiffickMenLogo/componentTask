export interface INotebook {
  id: string;
  model: string;
  img: string;
  screenDiagonal: string;
  screenResolution: string;
  screenRefreshRate: string;
  processorModel: string;
  RAM: string;
  SSDcapacity: string;
  VideoCardModel: string;
  popular: boolean;
}

export type StateCardType = {
  like: string;
  likesNumber: number;
  favourite: string;
};

export interface IStateInput {
  setSearchName: (value: string) => void;
}

//new ________________________________________________-
export interface IMainProps {
  characters: RootObject;
  searchName: string;
  isModalOpen: boolean;
  modalId: number;
}
export interface ICardProps {
  character: Result;
  info: Info;
  openModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setModalId: (value: number) => void;
}
export interface IStateForm {
  id: number;
  name: string;
  species: string;
  status: string;
  type: string;
  gender: string;
  image: string | ArrayBuffer;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Result {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RootObject {
  info: Info;
  results: Result[];
}
