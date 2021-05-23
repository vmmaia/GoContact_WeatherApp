import axios from 'axios';
import request from 'supertest';
import { app } from '../../app';
import { weather_api_key } from '../../config.json';
import getFormattedDate from '../../utils/date';

jest.mock('axios');

// cast because of typescript
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Current route test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Returns a request validation error when given no search query', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    const expectedErrorArray = [
      {
        message: 'You must provide a valid search query',
        field: 'query'
      },
      {
        message: 'Invalid value',
        field: 'query'
      }
    ];

    const response = await request(app).post('/current').send({});

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(response.status === 400).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a request validation error when given wrong parameter name', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    const expectedErrorArray = [
      {
        message: 'You must provide a valid search query',
        field: 'query'
      },
      {
        message: 'Invalid value',
        field: 'query'
      }
    ];

    const response = await request(app)
      .post('/current')
      .send({ wrongParameterName: 'aveiro' });

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(response.status === 400).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a request validation error when given an empty query', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    const expectedErrorArray = [
      {
        message: 'Invalid value',
        field: 'query'
      }
    ];

    const response = await request(app).post('/current').send({ query: '' });

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(response.status === 400).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a request validation error when given a non string query', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    const expectedErrorArray = [
      {
        message: 'You must provide a valid search query',
        field: 'query'
      }
    ];

    const response = await request(app).post('/current').send({ query: 1337 });

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(response.status === 400).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns an error when given a non existent location name', async () => {
    mockedAxios.all.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            error: {
              code: 1006,
              message: 'No matching location found.'
            }
          }
        }
      })
    );
    mockedAxios.get = jest.fn();

    const mockQuery = 'aveiroaveiroaveiro';

    const currentURL = `http://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${mockQuery}&aqi=no`;
    const astroURL = `http://api.weatherapi.com/v1/astronomy.json?key=${weather_api_key}&q=${mockQuery}&dt=${getFormattedDate()}`;

    const expectedErrorArray = [
      {
        message: 'No matching location found.'
      }
    ];

    const response = await request(app)
      .post('/current')
      .send({ query: mockQuery });

    expect(mockedAxios.all).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(currentURL);
    expect(mockedAxios.get).toHaveBeenCalledWith(astroURL);

    expect(response.status === 500).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a correctly formated object when given an existent location name', async () => {
    const mockQuery = 'aveiro';

    const currentURL = `http://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${mockQuery}&aqi=no`;
    const astroURL = `http://api.weatherapi.com/v1/astronomy.json?key=${weather_api_key}&q=${mockQuery}&dt=${getFormattedDate()}`;

    mockedAxios.all.mockImplementation(() =>
      Promise.resolve([
        {
          data: {
            location: {
              name: 'Aveiro',
              region: 'Aveiro',
              country: 'Portugal',
              lat: 40.63,
              lon: -8.65,
              tz_id: 'Europe/Lisbon',
              localtime_epoch: 1621792233,
              localtime: '2021-05-23 18:50'
            },
            current: {
              last_updated_epoch: 1621791900,
              last_updated: '2021-05-23 18:45',
              temp_c: 16.0,
              temp_f: 60.8,
              is_day: 1,
              condition: {
                text: 'Partly cloudy',
                icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                code: 1003
              },
              wind_mph: 11.9,
              wind_kph: 19.1,
              wind_degree: 330,
              wind_dir: 'NNW',
              pressure_mb: 1023.0,
              pressure_in: 30.7,
              precip_mm: 0.0,
              precip_in: 0.0,
              humidity: 82,
              cloud: 50,
              feelslike_c: 16.0,
              feelslike_f: 60.8,
              vis_km: 10.0,
              vis_miles: 6.0,
              uv: 5.0,
              gust_mph: 17.4,
              gust_kph: 28.1
            }
          }
        },
        {
          data: {
            location: {
              name: 'Aveiro',
              region: 'Aveiro',
              country: 'Portugal',
              lat: 40.63,
              lon: -8.65,
              tz_id: 'Europe/Lisbon',
              localtime_epoch: 1621792211,
              localtime: '2021-05-23 18:50'
            },
            astronomy: {
              astro: {
                sunrise: '06:12 AM',
                sunset: '08:50 PM',
                moonrise: '02:55 PM',
                moonset: '03:32 AM',
                moon_phase: 'First Quarter',
                moon_illumination: '66'
              }
            }
          }
        }
      ])
    );

    mockedAxios.get = jest.fn();

    const response = await request(app)
      .post('/current')
      .send({ query: mockQuery });

    expect(mockedAxios.all).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(currentURL);
    expect(mockedAxios.get).toHaveBeenCalledWith(astroURL);

    expect(response.status === 200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        details: expect.any(String),
        time: expect.any(Number),
        temperature: expect.any(Number),
        is_day: expect.any(Number),
        weather: expect.any(String),
        weather_icon: expect.any(String),
        sunset: expect.any(String),
        sunset_epoch: expect.any(Number),
        sunrise: expect.any(String),
        sunrise_epoch: expect.any(Number)
      })
    );
  });
});
