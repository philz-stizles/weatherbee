export type Request = {
  type: string;
  query: string;
  language: string;
  unit: string;
};

export type Location = {
  name: string;
  country: string;
  region: string;
  lat: 40.714;
  lon: -74.006;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
};

export type Current = {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
};

export type WeatherResponse = {
  request: Request;
  location: Location;
  current: Current;
};

export type OpenWeather = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type Clouds = { all: number };

type Coord = { lon: number; lat: number };

type Weather = {
  id: string;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Wind = { speed: number; deg: number; gust: number };

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export type Variant =
  | 'white'
  | 'black'
  | 'success'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'flat'
  | 'outlined';
