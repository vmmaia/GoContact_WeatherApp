import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxMockStore from 'redux-mock-store';
import ResultItem from '../result-item';
import { RETRIEVE_CITY } from '../../../redux/actions/action-types';
import mockSearchResult from '../../../test/mock-search-result';
import mockCity from '../../../test/mock-city';
import axios from 'axios';

jest.mock('axios');

describe('Result-item component tests', () => {
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

  it('Searches for city when clicked', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const store = mockStore({});

    const response = {
      data: mockCity({})
    };

    axios.post.mockImplementation(() => Promise.resolve(response));

    const component = render(
      <Provider store={store}>
        <ResultItem result={mockSearchResult({})} />
      </Provider>
    );

    const wrapper = component.queryByTestId('search-result-item');

    fireEvent.click(wrapper, {});

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find((action) => action.type === RETRIEVE_CITY)
      ).toBeTruthy();
      done();
    }, 4000);
  });
});
