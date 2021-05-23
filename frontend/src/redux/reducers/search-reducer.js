import {
  SEARCH,
  SEARCH_RESET,
  SEARCH_SET_QUERY
} from '../actions/action-types';

const initialState = {
  isSearching: false,
  showResults: false,
  results: [],
  query: '',
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH: {
      return {
        ...state,
        isSearching: action.payload.isSearching,
        showResults: state.query === '' ? false : action.payload.showResults,
        error: action.payload.error,
        results: [...action.payload.results]
      };
    }

    case SEARCH_SET_QUERY: {
      return { ...state, query: action.payload.query };
    }

    case SEARCH_RESET: {
      return { ...initialState };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
