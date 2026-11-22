export interface SpecialEvent {
  id: string;
  name: string;
  category: string;
  page: number;
  requirements: string[];
  description: string;
  screenshot: string;
}

export interface ArceusPlate {
  id: string;
  name: string;
  type: string;
  location: string;
}

export interface EventsData {
  totalEvents: number;
  totalPlates: number;
  events: SpecialEvent[];
  arceusPlates: ArceusPlate[];
}
