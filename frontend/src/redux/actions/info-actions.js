import { RETRIEVE_CITY, SEARCH_RESET } from './action-types';
import serializeErrors from '../../util/serialize-errors';
import backend from '../../apis/backend';

export const retrieveCity = (query) => async (dispatch) => {
  try {
    const response = await backend.post('/current', { query });

    dispatch({
      type: RETRIEVE_CITY,
      payload: {
        city: response.data
      }
    });
  } catch (err) {
    console.log(serializeErrors(err));
  } finally {
    dispatch({
      type: SEARCH_RESET,
      payload: {}
    });
  }
};
