// https://www.weatherapi.com/docs/#intro-location

interface SearchResponse {
  lat: number;
  lon: number;
  name: string;
  region: string;
  country: string;
  tz_id?: string;
  localtime_epoch?: number;
  localtime?: string;
}

export default SearchResponse;
