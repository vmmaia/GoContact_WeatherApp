import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReduxMockStore from 'redux-mock-store';
import ResultList from '../result-list';
import mockSearchResult from '../../../test/mock-search-result';

describe('Result-list component tests', () => {
  it('Renders spinner while searching', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      search: {
        isSearching: true,
        error: '',
        results: []
      }
    });

    const component = render(
      <Provider store={store}>
        <ResultList />
      </Provider>
    );

    expect(component.getByTestId('spinner-wrapper')).toBeTruthy();
  });

  it('Renders errors when present', () => {
    const mockStore = ReduxMockStore();
    const errorMessage = 'This is an error message';
    const store = mockStore({
      search: {
        isSearching: false,
        error: errorMessage,
        results: []
      }
    });

    const component = render(
      <Provider store={store}>
        <ResultList />
      </Provider>
    );

    expect(component.getByText(errorMessage)).toBeTruthy();
  });

  it('Renders empty list when there are no results', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      search: {
        isSearching: false,
        error: '',
        results: []
      }
    });

    const component = render(
      <Provider store={store}>
        <ResultList />
      </Provider>
    );

    expect(component.getByText('No results found')).toBeTruthy();
  });

  it('Renders list of results when there results', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      search: {
        isSearching: false,
        error: '',
        results: [
          mockSearchResult({}),
          mockSearchResult({}),
          mockSearchResult({})
        ]
      }
    });

    const component = render(
      <Provider store={store}>
        <ResultList />
      </Provider>
    );

    const wrapper = component.getByTestId('search-result-list');

    expect(wrapper.children.length).toBe(3);
  });
});
