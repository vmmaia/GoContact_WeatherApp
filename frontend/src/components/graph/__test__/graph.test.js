import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReduxMockStore from 'redux-mock-store';
import mockCity from '../../../test/mock-city';
import * as chart from 'react-apexcharts';
import Graph from '../graph';

describe('Graph component tests', () => {
  beforeAll(() => {
    chart.default = () => <h1>Mock graph</h1>;
  });

  it('Does not show if there are no cities', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      weather: {
        cities: []
      }
    });

    const component = render(
      <Provider store={store}>
        <Graph />
      </Provider>
    );

    const wrapper = component.getByTestId('graph-wrapper');

    expect(wrapper.children.length).toBe(0);
  });

  it('Renders if there are cities', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      weather: {
        cities: [mockCity({})]
      }
    });

    const component = render(
      <Provider store={store}>
        <Graph />
      </Provider>
    );

    const wrapper = component.getByTestId('graph-wrapper');

    expect(wrapper.children.length).toBe(1);
  });
});
