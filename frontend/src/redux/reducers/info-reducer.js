import { RETRIEVE_CITY, REMOVE_CITY } from '../actions/action-types';

const initialState = {
  cities: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CITY:
      return { ...state, cities: [...state.cities, action.payload.city] };

    case REMOVE_CITY:
      return { ...state };
  }
};

export default reducer;
