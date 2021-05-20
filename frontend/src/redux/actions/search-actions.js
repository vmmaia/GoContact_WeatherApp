import {
  SEARCH,
  SEARCH_RESET,
  SEARCH_RESULTS,
  SEARCH_TOGGLE_RESULTS,
  RETRIEVE_CITY,
  ADD_CITY
} from './action-types';
import backend from '../../apis/backend';

export const search = (query) => async (dispatch) => {
  dispatch({
    type: SEARCH_RESET,
    payload: {}
  });

  dispatch({
    type: SEARCH,
    payload: {}
  });

  dispatch({
    type: SEARCH_TOGGLE_RESULTS,
    payload: {
      showResults: true
    }
  });

  try {
    const response = await backend.post('/search', {
      query
    });

    dispatch({
      type: SEARCH_RESULTS,
      payload: {
        results: response.data.results,
        errors: ''
      }
    });
  } catch (error) {
    const response = error.response.data.errors;
    const errors = response
      .reduce((acc, val) => (acc += `, ${val.message}`), '')
      .substring(2);

    dispatch({
      type: SEARCH_RESULTS,
      payload: {
        results: [],
        errors
      }
    });

    throw error;
  }
};

export const retrieveCity = (query) => async (dispatch) => {
  dispatch({
    type: RETRIEVE_CITY,
    payload: {
      isSearching: true,
      showResults: true,
      results: []
    }
  });

  try {
    const response = await backend.post('/current', { query });

    dispatch({
      type: ADD_CITY,
      payload: {
        city: response.data
      }
    });
  } catch (error) {}
};

export const resetSearch = () => (dispatch) => {
  dispatch({
    type: SEARCH_RESET,
    payload: {}
  });
};

export const toggleResults = (showResults) => (dispatch) => {
  dispatch({
    type: SEARCH_TOGGLE_RESULTS,
    payload: {
      showResults
    }
  });
};
