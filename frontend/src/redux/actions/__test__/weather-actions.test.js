import axios from 'axios';
import {
  RETRIEVE_CITY,
  SEARCH_RESET,
  UPDATE_TIME,
  TABLE_SORT_BY
} from '../action-types';
import { retrieveCity, updateTime, sortTable } from '../weather-actions';
import backendURL from '../../../backendURL';

jest.mock('axios');

describe('Weather actions tests', () => {
  it('Retrieves a city when given a query', async () => {
    const mockDispatch = jest.fn();
    const searchQuery = 'Aveiro, Aveiro, Portugal';

    const response = {
      data: {}
    };

    axios.post.mockImplementation(() => Promise.resolve(response));

    await retrieveCity(searchQuery)(mockDispatch);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${backendURL}/current`, {
      query: searchQuery
    });

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RETRIEVE_CITY);
    expect(mockDispatch.mock.calls[1][0].type).toBe(TABLE_SORT_BY);
    expect(mockDispatch.mock.calls[2][0].type).toBe(SEARCH_RESET);
  });

  it('Updates the current time for a given city', async () => {
    const mockDispatch = jest.fn();
    const cityName = 'Aveiro';

    updateTime(cityName)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(UPDATE_TIME);
  });

  it('Sorts the table by a given column', async () => {
    const mockDispatch = jest.fn();
    const columnName = 'name';

    sortTable(columnName)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(TABLE_SORT_BY);
  });
});
