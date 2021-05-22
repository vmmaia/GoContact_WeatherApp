import {
  SEARCH,
  SEARCH_RESET,
  SEARCH_SET_QUERY
} from '../../actions/action-types';
import mockSearchResult from '../../../test/mock-search-result';
import reducer from '../search-reducer';

describe('Search reducer tests', () => {
  it('Changes search state with search results / search state', () => {
    const mockAction = {
      type: SEARCH,
      payload: {
        isSearching: true,
        showResults: false,
        error: '',
        results: [mockSearchResult({})]
      }
    };

    const updatedState = reducer(undefined, mockAction);

    expect(updatedState.isSearching).toBe(true);
    expect(updatedState.showResults).toBe(false);
    expect(updatedState.query).toBe('');
    expect(updatedState.error).toBe('');
    expect(updatedState.results.length).toBe(1);
    expect(
      JSON.stringify(updatedState.results) ===
        JSON.stringify(mockAction.payload.results)
    ).toBe(true);
  });

  it('Changes search query', () => {
    const mockAction = {
      type: SEARCH_SET_QUERY,
      payload: {
        query: 'some query value'
      }
    };

    const updatedState = reducer(undefined, mockAction);

    expect(updatedState.isSearching).toBe(false);
    expect(updatedState.showResults).toBe(false);
    expect(updatedState.query).toBe(mockAction.payload.query);
    expect(updatedState.error).toBe('');
    expect(updatedState.results.length).toBe(0);
  });

  it('Resets search state', () => {
    const mockActionChangeState = {
      type: SEARCH,
      payload: {
        isSearching: true,
        showResults: false,
        error: 'error message',
        results: [mockSearchResult({})]
      }
    };

    const mockActionResetState = {
      type: SEARCH_RESET,
      payload: {}
    };

    reducer(undefined, mockActionChangeState);
    const updatedState = reducer(undefined, mockActionResetState);

    expect(updatedState.isSearching).toBe(false);
    expect(updatedState.showResults).toBe(false);
    expect(updatedState.query).toBe('');
    expect(updatedState.error).toBe('');
    expect(updatedState.results.length).toBe(0);
  });
});
