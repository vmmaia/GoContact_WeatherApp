interface CurrentResponse {
  name: string;
  details: string;
  time: number;
  temperature: number;
  is_day: number;
  weather: string;
  weather_icon: string;
  sunrise: string;
  sunrise_epoch: number;
  sunset: string;
  sunset_epoch: number;
}

export default CurrentResponse;
