import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxMockStore from 'redux-mock-store';
import Search from '../search';
import {
  SEARCH,
  SEARCH_SET_QUERY,
  SEARCH_RESET
} from '../../../redux/actions/action-types';

describe('Result-item component tests', () => {
  it('Does not render results if showResults is false', () => {
    const mockStore = ReduxMockStore([thunk]);
    const store = mockStore({
      search: {
        showResults: false
      }
    });

    const component = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const wrapper = component.queryByTestId('search-wrapper');

    expect(
      wrapper.classList.contains('search-wrapper-with-results')
    ).not.toBeTruthy();
    expect(component.queryByTestId('search-result-list')).not.toBeTruthy();
  });

  it('Renders results if showResults is true', () => {
    const mockStore = ReduxMockStore([thunk]);
    const store = mockStore({
      search: {
        showResults: true
      }
    });

    const component = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const wrapper = component.queryByTestId('search-wrapper');

    expect(
      wrapper.classList.contains('search-wrapper-with-results')
    ).toBeTruthy();
    expect(component.queryByTestId('search-result-list')).toBeTruthy();
  });

  it('Searches for a place given a query', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const store = mockStore({
      search: {
        showResults: false
      }
    });

    const component = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = component.queryByTestId('search-input');
    const searchQuery = 'Aveiro';

    fireEvent.change(input, { target: { value: searchQuery } });

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find(
          (action) =>
            action.type === SEARCH_SET_QUERY &&
            action.payload.query === searchQuery
        )
      ).toBeTruthy();

      expect(
        actionCalls.find(
          (action) =>
            action.type === SEARCH && action.payload.isSearching === true
        )
      ).toBeTruthy();

      expect(
        actionCalls.find(
          (action) =>
            action.type === SEARCH && action.payload.isSearching === false
        )
      ).toBeTruthy();

      done();
    }, 4000);
  });
});
