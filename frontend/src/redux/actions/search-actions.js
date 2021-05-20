import { SEARCH, SEARCH_RESET } from './action-types';
import serializeErrors from '../../util/serialize-errors';
import backend from '../../apis/backend';

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
    const response = await backend.post('/search', {
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
    dispatch({
      type: SEARCH,
      payload: {
        isSearching: false,
        showResults: true,
        error: serializeErrors(err),
        results: []
      }
    });

    throw err;
  }
};

export const resetSearch = () => (dispatch) => {
  dispatch({
    type: SEARCH_RESET,
    payload: {}
  });
};
