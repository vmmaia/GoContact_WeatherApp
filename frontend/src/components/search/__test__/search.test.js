import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxMockStore from 'redux-mock-store';
import Search from '../search';

const mockSearchFunction = jest.fn();

jest.mock('../../../redux/actions/search-actions', () => {
  const module = jest.requireActual('../../../redux/actions/search-actions');
  return {
    ...module,
    search: (query) => mockSearchFunction
  };
});

describe('Result-item component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('Searches for a place given a query', async () => {
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

    await waitFor(() => {
      expect(mockSearchFunction).toHaveBeenCalledTimes(1);
    });
  });
});
