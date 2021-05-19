// https://www.weatherapi.com/docs/#apis-astronomy

import Location from './search-response';

interface AstronomyResponse {
  location: Location;
  astronomy: {
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
  };
}

export default AstronomyResponse;
