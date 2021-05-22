import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReduxMockStore from 'redux-mock-store';
import mockCity from '../../../test/mock-city';
import CardList from '../card-list';

describe('Card-list component tests', () => {
  it('Renders correctly without cities in store', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      weather: {
        cities: []
      }
    });

    const component = render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(component.container.children.length).toBe(0);
  });

  it('Renders correctly with cities in store', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      weather: {
        cities: [mockCity({}), mockCity({}), mockCity({})]
      }
    });

    const component = render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(component.container.children.length).toBe(3);

    for (let i = 0; i < 3; i++) {
      expect(
        component.container.children[i].classList.contains('weather-card')
      ).toBe(true);
    }
  });
});
