import {
  SEARCH,
  SEARCH_RESET,
  SEARCH_RESULTS,
  SEARCH_TOGGLE_RESULTS,
  RETRIEVE_CITY,
  ADD_CITY
} from '../actions/action-types';

const initialState = {
  isSearching: false,
  showResults: false,
  results: [],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        isSearching: true
      };

    case SEARCH_RESULTS:
      const newState = { ...state };
      newState.results = action.payload.results;

      return {
        ...newState,
        isSearching: false,
        showResults: true,
        errors: action.payload.errors
      };

    case SEARCH_TOGGLE_RESULTS:
      return { ...state, showResults: action.payload.showResults };

    case SEARCH_RESET:
      return { ...initialState };

    case RETRIEVE_CITY:
      return { ...state };

    case ADD_CITY:
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
