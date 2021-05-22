import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReduxMockStore from 'redux-mock-store';
import Card from '../card';
import mockCity from '../../../test/mock-city';

describe('Card component tests', () => {
  it('Renders correctly at day time', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({});

    const city = mockCity({ is_day: 1 });
    const date = new Date(city.time);
    const currentTime = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const component = render(
      <Provider store={store}>
        <Card city={city} />
      </Provider>
    );

    const wrapper = component.queryByTestId('weather-card-wrapper');

    expect(wrapper.classList.contains('weather-card')).toBe(true);
    expect(wrapper.classList.contains('weather-card-day')).toBe(true);

    expect(component.getByText(city.name)).toBeTruthy();
    expect(component.getByText(city.details)).toBeTruthy();
    expect(component.getByText(city.weather)).toBeTruthy();
    expect(component.getByText(`${city.temperature}ºC`)).toBeTruthy();
    expect(component.getByText(city.sunrise)).toBeTruthy();
    expect(component.getByText(city.sunset)).toBeTruthy();
    expect(component.getByText(`Current time: ${currentTime}`)).toBeTruthy();
  });

  it('Renders correctly at night time', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({});

    const city = mockCity({ is_day: 0 });
    const date = new Date(city.time);
    const currentTime = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const component = render(
      <Provider store={store}>
        <Card city={city} />
      </Provider>
    );

    const wrapper = component.queryByTestId('weather-card-wrapper');

    expect(wrapper.classList.contains('weather-card')).toBe(true);
    expect(wrapper.classList.contains('weather-card-night')).toBe(true);

    expect(component.getByText(city.name)).toBeTruthy();
    expect(component.getByText(city.details)).toBeTruthy();
    expect(component.getByText(city.weather)).toBeTruthy();
    expect(component.getByText(`${city.temperature}ºC`)).toBeTruthy();
    expect(component.getByText(city.sunrise)).toBeTruthy();
    expect(component.getByText(city.sunset)).toBeTruthy();
    expect(component.getByText(`Current time: ${currentTime}`)).toBeTruthy();
  });
});
