import axios from 'axios';
import {
  RETRIEVE_CITY,
  SEARCH_RESET,
  UPDATE_TIME,
  TABLE_SORT_BY
} from './action-types';
import serializeErrors from '../../util/serialize-errors';
import backendURL from '../../backendURL';

export const retrieveCity = (query) => async (dispatch) => {
  try {
    const response = await axios.post(`${backendURL}/current`, { query });

    dispatch({
      type: RETRIEVE_CITY,
      payload: {
        city: { ...response.data }
      }
    });

    dispatch({
      type: TABLE_SORT_BY,
      payload: {}
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

export const updateTime = (name) => (dispatch) => {
  dispatch({
    type: UPDATE_TIME,
    payload: {
      name
    }
  });
};

export const sortTable = (column) => (dispatch) => {
  dispatch({
    type: TABLE_SORT_BY,
    payload: {
      column
    }
  });
};
