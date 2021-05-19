import request from 'supertest';
import { app } from '../../app';

describe('Search route test cases', () => {
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

    const response = await request(app).post('/search').send({});

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
      .post('/search')
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

    const response = await request(app).post('/search').send({ query: '' });

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

    const response = await request(app).post('/search').send({ query: 1337 });

    expect(response.status === 400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrorArray)
    );
  });

  it('Returns an empty array when given a non existent location name', async () => {
    const response = await request(app)
      .post('/search')
      .send({ query: 'aveiroaveiroaveiro' });

    expect(response.status === 200);
    expect(response.body.results).toEqual(expect.arrayContaining([]));
  });

  it('Returns an array of places when given an existent location name', async () => {
    const response = await request(app)
      .post('/search')
      .send({ query: 'aveiro' });

    expect(response.status === 200);
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
