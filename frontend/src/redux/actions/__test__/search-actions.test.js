import axios from 'axios';
import { SEARCH, SEARCH_RESET, SEARCH_SET_QUERY } from '../action-types';
import { search, resetSearch, setQuery } from '../search-actions';
import mockSearchResult from '../../../test/mock-search-result';
import backendURL from '../../../backendURL';

jest.mock('axios');

describe('Search actions tests', () => {
  it('Searches when given a query', async () => {
    const mockDispatch = jest.fn();
    const searchQuery = 'Aveiro';

    const response = {
      data: {
        results: [mockSearchResult({}), mockSearchResult({})]
      }
    };

    axios.post.mockImplementation(() => Promise.resolve(response));

    await search(searchQuery)(mockDispatch);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${backendURL}/search`, {
      query: searchQuery
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch.mock.calls[0][0].type).toBe(SEARCH);
    expect(mockDispatch.mock.calls[0][0].payload.isSearching).toBe(true);
    expect(mockDispatch.mock.calls[1][0].type).toBe(SEARCH);
    expect(mockDispatch.mock.calls[1][0].payload.isSearching).toBe(false);
  });

  it('Serializes errors when received', async () => {
    const mockDispatch = jest.fn();
    const searchQuery = 'Aveiro';

    const response = {
      response: {
        data: {
          errors: [
            {
              message: 'error1'
            },
            {
              message: 'error2'
            }
          ]
        }
      }
    };

    axios.post.mockImplementation(() => {
      throw response;
    });

    await search(searchQuery)(mockDispatch);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${backendURL}/search`, {
      query: searchQuery
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch.mock.calls[0][0].type).toBe(SEARCH);
    expect(mockDispatch.mock.calls[0][0].payload.isSearching).toBe(true);
    expect(mockDispatch.mock.calls[1][0].type).toBe(SEARCH);
    expect(mockDispatch.mock.calls[1][0].payload.isSearching).toBe(false);
    expect(mockDispatch.mock.calls[1][0].payload.error).toBe('error1, error2');
  });

  it('Resets search state', async () => {
    const mockDispatch = jest.fn();

    resetSearch()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(SEARCH_RESET);
  });

  it('Sets searche query', async () => {
    const mockDispatch = jest.fn();

    setQuery()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(SEARCH_SET_QUERY);
  });
});
