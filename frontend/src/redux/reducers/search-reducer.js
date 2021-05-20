import { SEARCH, SEARCH_RESET } from '../actions/action-types';

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
        isSearching: action.payload.isSearching,
        showResults: action.payload.showResults,
        error: action.payload.error,
        results: [...action.payload.results]
      };

    case SEARCH_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
