import { Coordinats } from '@app/destinations/schemas/coordinats.schema';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherApiInterface {
  coord: Coordinats;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: { all: number };
  dt: number;
  sys: { sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
