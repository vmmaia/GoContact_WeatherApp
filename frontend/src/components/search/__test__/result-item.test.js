import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxMockStore from 'redux-mock-store';
import ResultItem from '../result-item';
import mockSearchResult from '../../../test/mock-search-result';
import mockCity from '../../../test/mock-city';

const mockRetrieveCityFunction = jest.fn();

jest.mock('../../../redux/actions/weather-actions', () => {
  const module = jest.requireActual('../../../redux/actions/weather-actions');
  return {
    ...module,
    retrieveCity: (query) => mockRetrieveCityFunction
  };
});

describe('Result-item component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly search result', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({});
    const mockResult = mockSearchResult({});

    const component = render(
      <Provider store={store}>
        <ResultItem result={mockResult} />
      </Provider>
    );

    const wrapper = component.queryByTestId('search-result-item');

    expect(wrapper.className).toBe('search-result-item');
    expect(component.getByText(mockResult.name)).toBeTruthy();
    expect(component.getByText(mockResult.details)).toBeTruthy();
  });

  it('Searches for city when clicked', () => {
    const mockStore = ReduxMockStore([thunk]);
    const store = mockStore({});

    const component = render(
      <Provider store={store}>
        <ResultItem result={mockSearchResult({})} />
      </Provider>
    );

    const wrapper = component.queryByTestId('search-result-item');

    fireEvent.click(wrapper, {});

    expect(mockRetrieveCityFunction).toHaveBeenCalledTimes(1);
  });
});
