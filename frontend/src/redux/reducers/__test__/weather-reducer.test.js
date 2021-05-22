import {
  RETRIEVE_CITY,
  UPDATE_TIME,
  TABLE_SORT_BY
} from '../../actions/action-types';
import mockCity from '../../../test/mock-city';
import reducer from '../weather-reducer';

describe('Weather reducer tests', () => {
  it('Adds city to state', () => {
    const mockAction = {
      type: RETRIEVE_CITY,
      payload: {
        city: mockCity({})
      }
    };

    const updatedState = reducer(undefined, mockAction);

    expect(updatedState.cities.length).toBe(1);
    expect(
      JSON.stringify(updatedState.cities[0]) ===
        JSON.stringify(mockAction.payload.city)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(1);
    expect(
      JSON.stringify(updatedState.table.entries[0]) ===
        JSON.stringify(mockAction.payload.city)
    ).toBe(true);
  });

  it('Only adds city once', () => {
    const mockAction = {
      type: RETRIEVE_CITY,
      payload: {
        city: mockCity({})
      }
    };

    reducer(undefined, mockAction);
    const updatedState = reducer(undefined, mockAction);

    expect(updatedState.cities.length).toBe(1);
    expect(
      JSON.stringify(updatedState.cities[0]) ===
        JSON.stringify(mockAction.payload.city)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(1);
    expect(
      JSON.stringify(updatedState.table.entries[0]) ===
        JSON.stringify(mockAction.payload.city)
    ).toBe(true);
  });

  it('Updates city time by 1 minute', () => {
    const mockAction = {
      type: UPDATE_TIME,
      payload: mockCity({ name: 'Dubai' })
    };

    const mockInitialState = {
      cities: [
        mockCity({ name: 'Dubai', time: 0 }),
        mockCity({ name: 'New York', time: 0 })
      ],
      table: {
        sortBy: 'name',
        order: 'asc',
        entries: [
          mockCity({ name: 'Dubai', time: 0 }),
          mockCity({ name: 'New York', time: 0 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(updatedState.cities.length).toBe(2);
    expect(updatedState.cities[0].time).toBe(
      mockInitialState.cities[0].time + 60000
    );
    expect(
      JSON.stringify(updatedState.cities[1]) ===
        JSON.stringify(mockInitialState.cities[1])
    ).toBe(true);

    expect(updatedState.table.entries.length).toBe(2);
    expect(
      JSON.stringify(updatedState.table.entries[0]) ===
        JSON.stringify(mockInitialState.table.entries[0])
    ).toBe(true);
    expect(
      JSON.stringify(updatedState.table.entries[1]) ===
        JSON.stringify(mockInitialState.table.entries[1])
    ).toBe(true);
  });

  it('Sorts table by name asc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'name'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ name: 'Finland' }),
        mockCity({ name: 'Zambia' }),
        mockCity({ name: 'Australia' })
      ],
      table: {
        sortBy: 'name',
        order: 'desc',
        entries: [
          mockCity({ name: 'Finland' }),
          mockCity({ name: 'Zambia' }),
          mockCity({ name: 'Australia' })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].name).toBe('Australia');
    expect(updatedState.table.entries[1].name).toBe('Finland');
    expect(updatedState.table.entries[2].name).toBe('Zambia');
  });

  it('Sorts table by name desc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'name'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ name: 'Finland' }),
        mockCity({ name: 'Zambia' }),
        mockCity({ name: 'Australia' })
      ],
      table: {
        sortBy: 'name',
        order: 'asc',
        entries: [
          mockCity({ name: 'Finland' }),
          mockCity({ name: 'Zambia' }),
          mockCity({ name: 'Australia' })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].name).toBe('Zambia');
    expect(updatedState.table.entries[1].name).toBe('Finland');
    expect(updatedState.table.entries[2].name).toBe('Australia');
  });

  it('Sorts table by details asc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'details'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ details: 'Finland' }),
        mockCity({ details: 'Zambia' }),
        mockCity({ details: 'Australia' })
      ],
      table: {
        sortBy: 'details',
        order: 'desc',
        entries: [
          mockCity({ details: 'Finland' }),
          mockCity({ details: 'Zambia' }),
          mockCity({ details: 'Australia' })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].details).toBe('Australia');
    expect(updatedState.table.entries[1].details).toBe('Finland');
    expect(updatedState.table.entries[2].details).toBe('Zambia');
  });

  it('Sorts table by details desc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'details'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ details: 'Finland' }),
        mockCity({ details: 'Zambia' }),
        mockCity({ details: 'Australia' })
      ],
      table: {
        sortBy: 'details',
        order: 'asc',
        entries: [
          mockCity({ details: 'Finland' }),
          mockCity({ details: 'Zambia' }),
          mockCity({ details: 'Australia' })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].details).toBe('Zambia');
    expect(updatedState.table.entries[1].details).toBe('Finland');
    expect(updatedState.table.entries[2].details).toBe('Australia');
  });

  it('Sorts table by temperature asc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'temperature'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ temperature: 5 }),
        mockCity({ temperature: 20 }),
        mockCity({ temperature: -2 })
      ],
      table: {
        sortBy: 'temperature',
        order: 'desc',
        entries: [
          mockCity({ temperature: 5 }),
          mockCity({ temperature: 20 }),
          mockCity({ temperature: -2 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].temperature).toBe(-2);
    expect(updatedState.table.entries[1].temperature).toBe(5);
    expect(updatedState.table.entries[2].temperature).toBe(20);
  });

  it('Sorts table by temperature desc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'temperature'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ temperature: 5 }),
        mockCity({ temperature: 20 }),
        mockCity({ temperature: -2 })
      ],
      table: {
        sortBy: 'temperature',
        order: 'asc',
        entries: [
          mockCity({ temperature: 5 }),
          mockCity({ temperature: 20 }),
          mockCity({ temperature: -2 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].temperature).toBe(20);
    expect(updatedState.table.entries[1].temperature).toBe(5);
    expect(updatedState.table.entries[2].temperature).toBe(-2);
  });

  it('Sorts table by sunrise asc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'sunrise'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ sunrise_epoch: 5 }),
        mockCity({ sunrise_epoch: 20 }),
        mockCity({ sunrise_epoch: -2 })
      ],
      table: {
        sortBy: 'sunrise',
        order: 'desc',
        entries: [
          mockCity({ sunrise_epoch: 5 }),
          mockCity({ sunrise_epoch: 20 }),
          mockCity({ sunrise_epoch: -2 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].sunrise_epoch).toBe(-2);
    expect(updatedState.table.entries[1].sunrise_epoch).toBe(5);
    expect(updatedState.table.entries[2].sunrise_epoch).toBe(20);
  });

  it('Sorts table by sunrise desc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'sunrise'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ sunrise_epoch: 5 }),
        mockCity({ sunrise_epoch: 20 }),
        mockCity({ sunrise_epoch: -2 })
      ],
      table: {
        sortBy: 'sunrise',
        order: 'asc',
        entries: [
          mockCity({ sunrise_epoch: 5 }),
          mockCity({ sunrise_epoch: 20 }),
          mockCity({ sunrise_epoch: -2 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].sunrise_epoch).toBe(20);
    expect(updatedState.table.entries[1].sunrise_epoch).toBe(5);
    expect(updatedState.table.entries[2].sunrise_epoch).toBe(-2);
  });

  it('Sorts table by sunset asc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'sunset'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ sunset_epoch: 5 }),
        mockCity({ sunset_epoch: 20 }),
        mockCity({ sunset_epoch: -2 })
      ],
      table: {
        sortBy: 'sunset',
        order: 'desc',
        entries: [
          mockCity({ sunset_epoch: 5 }),
          mockCity({ sunset_epoch: 20 }),
          mockCity({ sunset_epoch: -2 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].sunset_epoch).toBe(-2);
    expect(updatedState.table.entries[1].sunset_epoch).toBe(5);
    expect(updatedState.table.entries[2].sunset_epoch).toBe(20);
  });

  it('Sorts table by sunset desc', () => {
    const mockAction = {
      type: TABLE_SORT_BY,
      payload: {
        column: 'sunset'
      }
    };

    const mockInitialState = {
      cities: [
        mockCity({ sunset_epoch: 5 }),
        mockCity({ sunset_epoch: 20 }),
        mockCity({ sunset_epoch: -2 })
      ],
      table: {
        sortBy: 'sunset',
        order: 'asc',
        entries: [
          mockCity({ sunset_epoch: 5 }),
          mockCity({ sunset_epoch: 20 }),
          mockCity({ sunset_epoch: -2 })
        ]
      }
    };

    const updatedState = reducer(mockInitialState, mockAction);

    expect(
      JSON.stringify(updatedState.cities) ===
        JSON.stringify(mockInitialState.cities)
    ).toBe(true);
    expect(updatedState.table.entries.length).toBe(3);
    expect(updatedState.table.entries[0].sunset_epoch).toBe(20);
    expect(updatedState.table.entries[1].sunset_epoch).toBe(5);
    expect(updatedState.table.entries[2].sunset_epoch).toBe(-2);
  });
});
