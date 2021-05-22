import axios from 'axios';
import { SEARCH, SEARCH_RESET, SEARCH_SET_QUERY } from './action-types';
import serializeErrors from '../../util/serialize-errors';
import backendURL from '../../backendURL';

export const search = (query) => async (dispatch) => {
  dispatch({
    type: SEARCH,
    payload: {
      isSearching: true,
      showResults: true,
      error: '',
      results: []
    }
  });

  try {
    const response = await axios.post(`${backendURL}/search`, {
      query
    });

    dispatch({
      type: SEARCH,
      payload: {
        isSearching: false,
        showResults: true,
        error: '',
        results: response.data.results
      }
    });
  } catch (err) {
    const error = serializeErrors(err);

    if (error) {
      dispatch({
        type: SEARCH,
        payload: {
          isSearching: false,
          showResults: true,
          error,
          results: []
        }
      });

      return;
    }

    throw err;
  }
};

export const resetSearch = () => (dispatch) => {
  dispatch({
    type: SEARCH_RESET,
    payload: {}
  });
};

export const setQuery = (query) => (dispatch) => {
  dispatch({
    type: SEARCH_SET_QUERY,
    payload: {
      query
    }
  });
};
