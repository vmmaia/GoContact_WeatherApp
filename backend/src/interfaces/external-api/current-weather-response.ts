// https://www.weatherapi.com/docs/#apis-realtime
import Location from './search-response';

interface CurrentWeatherResponse {
  location: Location;
  current: {
    last_updated: string;
    last_updated_epoch: number;
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: {
      text: string;
      icon: string;
      code: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    is_day: 0 | 1;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

export default CurrentWeatherResponse;
