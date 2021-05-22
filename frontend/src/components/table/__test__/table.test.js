import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxMockStore from 'redux-mock-store';
import mockCity from '../../../test/mock-city';
import Table from '../table';
import { TABLE_SORT_BY } from '../../../redux/actions/action-types';

describe('Table component tests', () => {
  it('Does not render if there are no cities', () => {
    const mockStore = ReduxMockStore();
    const store = mockStore({
      weather: {
        table: {
          entries: []
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const wrapper = component.queryByTestId('table-wrapper');

    expect(wrapper).not.toBeTruthy();
  });

  it('Renders if there are cities', () => {
    const mockStore = ReduxMockStore();
    const city = mockCity({});
    const store = mockStore({
      weather: {
        table: {
          entries: [city]
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const table = component.queryByTestId('table');
    const tableHead = table.children[0].children[0];
    const tableBody = table.children[1];

    expect(tableHead.children.length).toBe(5);
    expect(tableHead.innerHTML.includes('City')).toBe(true);
    expect(tableHead.innerHTML.includes('Location')).toBe(true);
    expect(tableHead.innerHTML.includes('Temperature (ºC)')).toBe(true);
    expect(tableHead.innerHTML.includes('Sunrise')).toBe(true);
    expect(tableHead.innerHTML.includes('Sunset')).toBe(true);

    expect(tableBody.children.length).toBe(1);
    const tableEntry = tableBody.children[0];

    expect(tableEntry.children[0].innerHTML).toBe(city.name);
    expect(tableEntry.children[1].innerHTML).toBe(city.details);
    expect(tableEntry.children[2].innerHTML).toBe(city.temperature.toString());
    expect(tableEntry.children[3].innerHTML).toBe(city.sunrise);
    expect(tableEntry.children[4].innerHTML).toBe(city.sunset);
  });

  it('Sorts by name column', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const cities = [mockCity({})];

    const store = mockStore({
      weather: {
        table: {
          sortBy: 'name',
          order: 'desc',
          entries: cities
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const table = component.queryByTestId('table');
    const nameHeader = table.children[0].children[0].children[0];

    fireEvent.click(nameHeader);

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find(
          (action) =>
            action.type === TABLE_SORT_BY && action.payload.column === 'name'
        )
      );

      done();
    }, 500);
  });

  it('Sorts by location column', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const cities = [mockCity({})];

    const store = mockStore({
      weather: {
        table: {
          sortBy: 'location',
          order: 'desc',
          entries: cities
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const table = component.queryByTestId('table');
    const nameHeader = table.children[0].children[0].children[0];

    fireEvent.click(nameHeader);

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find(
          (action) =>
            action.type === TABLE_SORT_BY &&
            action.payload.column === 'location'
        )
      );

      done();
    }, 500);
  });

  it('Sorts by temperature column', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const cities = [mockCity({})];

    const store = mockStore({
      weather: {
        table: {
          sortBy: 'temperature',
          order: 'desc',
          entries: cities
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const table = component.queryByTestId('table');
    const nameHeader = table.children[0].children[0].children[0];

    fireEvent.click(nameHeader);

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find(
          (action) =>
            action.type === TABLE_SORT_BY &&
            action.payload.column === 'temperature'
        )
      );

      done();
    }, 500);
  });

  it('Sorts by sunrise column', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const cities = [mockCity({})];

    const store = mockStore({
      weather: {
        table: {
          sortBy: 'sunrise',
          order: 'desc',
          entries: cities
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const table = component.queryByTestId('table');
    const nameHeader = table.children[0].children[0].children[0];

    fireEvent.click(nameHeader);

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find(
          (action) =>
            action.type === TABLE_SORT_BY && action.payload.column === 'sunrise'
        )
      );

      done();
    }, 500);
  });

  it('Sorts by sunset column', (done) => {
    const mockStore = ReduxMockStore([thunk]);
    const cities = [mockCity({})];

    const store = mockStore({
      weather: {
        table: {
          sortBy: 'sunset',
          order: 'desc',
          entries: cities
        }
      }
    });

    const component = render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const table = component.queryByTestId('table');
    const nameHeader = table.children[0].children[0].children[0];

    fireEvent.click(nameHeader);

    setTimeout(() => {
      const actionCalls = store.getActions();

      expect(
        actionCalls.find(
          (action) =>
            action.type === TABLE_SORT_BY && action.payload.column === 'sunset'
        )
      );

      done();
    }, 500);
  });
});
