import {
  RETRIEVE_CITY,
  UPDATE_TIME,
  TABLE_SORT_BY
} from '../actions/action-types';

const initialState = {
  cities: [],
  table: {
    sortBy: 'name',
    order: 'asc',
    entries: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CITY: {
      return {
        ...state,
        cities: [...state.cities, action.payload.city],
        table: {
          ...state.table,
          entries: [...state.table.entries, action.payload.city]
        }
      };
    }

    case UPDATE_TIME: {
      const cities = state.cities.map((city) =>
        city.name === action.payload.name
          ? { ...city, time: city.time + 60000 }
          : city
      );

      return { ...state, cities };
    }

    case TABLE_SORT_BY: {
      let column = action.payload.column || state.table.sortBy;
      const order = action.payload.column
        ? state.table.order === 'asc'
          ? 'desc'
          : 'asc'
        : state.table.order;

      if (column === 'sunset' || column === 'sunrise') {
        column += '_epoch';
      }

      const sortedArray = [...state.table.entries].sort((city1, city2) => {
        const dataType = typeof city1[column];

        if (order === 'asc') {
          if (dataType === 'string')
            return city1[column].localeCompare(city2[column]);
          if (dataType === 'number') return city1[column] - city2[column];
        } else {
          if (dataType === 'string')
            return city2[column].localeCompare(city1[column]);
          if (dataType === 'number') return city2[column] - city1[column];
        }

        return 0;
      });

      return {
        ...state,
        table: { sortBy: column, order, entries: sortedArray }
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
