import axios from 'axios';
import request from 'supertest';
import { app } from '../../app';
import { weather_api_key } from '../../config.json';

jest.mock('axios');

// cast because of typescript
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Search route test cases', () => {
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

    const response = await request(app).post('/search').send({});

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
      .post('/search')
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

    const response = await request(app).post('/search').send({ query: '' });

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

    const response = await request(app).post('/search').send({ query: 1337 });

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(response.status === 400).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns an empty array when given a non existent location name', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    const searchQuery = 'aveiroaveiroaveiro';

    const response = await request(app)
      .post('/search')
      .send({ query: searchQuery });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://api.weatherapi.com/v1/search.json?key=${weather_api_key}&q=${searchQuery}`
    );

    expect(response.status === 200).toBe(true);
    expect(response.body.results).toEqual(expect.arrayContaining([]));
  });

  it('Returns an array of places when given an existent location name', async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: 1997845,
            name: 'Aveiro, Aveiro, Portugal',
            region: 'Aveiro',
            country: 'Portugal',
            lat: 40.63,
            lon: -8.65,
            url: 'aveiro-aveiro-portugal'
          }
        ]
      })
    );

    const searchQuery = 'aveiro';

    const response = await request(app)
      .post('/search')
      .send({ query: searchQuery });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://api.weatherapi.com/v1/search.json?key=${weather_api_key}&q=${searchQuery}`
    );

    expect(response.status === 200).toBe(true);
    expect(response.body.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          details: expect.any(String)
        })
      ])
    );
  });
});
