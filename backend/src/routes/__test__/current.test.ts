import request from 'supertest';
import { app } from '../../app';

describe('Current route test cases', () => {
  it('Returns a request validation error when given no search query', async () => {
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

    expect(response.status === 400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a request validation error when given wrong parameter name', async () => {
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

    expect(response.status === 400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a request validation error when given an empty query', async () => {
    const expectedErrorArray = [
      {
        message: 'Invalid value',
        field: 'query'
      }
    ];

    const response = await request(app).post('/current').send({ query: '' });

    expect(response.status === 400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a request validation error when given a non string query', async () => {
    const expectedErrorArray = [
      {
        message: 'You must provide a valid search query',
        field: 'query'
      }
    ];

    const response = await request(app).post('/current').send({ query: 1337 });

    expect(response.status === 400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns an error when given a non existent location name', async () => {
    const expectedErrorArray = [
      {
        message: 'Something went wrong with the external API'
      }
    ];

    const response = await request(app)
      .post('/current')
      .send({ query: 'aveiroaveiroaveiro' });

    expect(response.status === 500);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns a correctly formated object when given an existent location name', async () => {
    const response = await request(app)
      .post('/current')
      .send({ query: 'aveiro' });

    expect(response.status === 200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        details: expect.any(String),
        time: expect.any(String),
        temperature: expect.any(Number),
        is_day: expect.any(Number),
        sunset: expect.any(String),
        sunrise: expect.any(String)
      })
    );
  });
});
