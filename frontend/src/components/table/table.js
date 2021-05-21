import { connect } from 'react-redux';
import { sortTable } from '../../redux/actions/weather-actions';
import './table.css';

const Table = (props) => {
  const handleTableSort = (column) => {
    props.sortTable(column);
  };

  const generateSortIcon = (column) => {
    let order = 'asc';
    let visibility = 'table-selected-icon-invisible';

    if (props.weatherState.table.sortBy === column) {
      order = props.weatherState.table.order;
      visibility = 'table-selected-icon-visible';
    }

    return (
      <i
        className={`fa fa-sort-amount-${order} ${visibility}`}
        aria-hidden="true"
      ></i>
    );
  };

  return props.weatherState.table.entries.length !== 0 ? (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleTableSort('name')}>
              City
              {generateSortIcon('name')}
            </th>
            <th onClick={() => handleTableSort('details')}>
              Location
              {generateSortIcon('details')}
            </th>
            <th onClick={() => handleTableSort('temperature')}>
              Temperature (ºC)
              {generateSortIcon('temperature')}
            </th>
            <th onClick={() => handleTableSort('sunrise')}>
              Sunrise
              {generateSortIcon('sunrise')}
            </th>
            <th onClick={() => handleTableSort('sunset')}>
              Sunset
              {generateSortIcon('sunset')}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.weatherState.table.entries.map((city, i) => {
            return (
              <tr key={i}>
                <td>{city.name}</td>
                <td>{city.details}</td>
                <td>{city.temperature}</td>
                <td>{city.sunrise}</td>
                <td>{city.sunset}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => {
  return { weatherState: state.weather };
};

export default connect(mapStateToProps, { sortTable })(Table);
