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
};

export type WeatherResponse = {
  request: Request;
  location: Location;
  current: Current;
};
