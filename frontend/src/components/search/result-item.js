import { connect } from 'react-redux';
import { retrieveCity } from '../../redux/actions/info-actions';
import './search.css';

const ResultItem = (props) => {
  return (
    <div
      className="search-result-item"
      onClick={() =>
        props.retrieveCity(`${props.result.name}, ${props.result.details}`)
      }
    >
      <i className="fa fa-map-marker" aria-hidden="true"></i>
      <div className="search-results-details-wrapper">
        <div className="search-result-name">{props.result.name}</div>
        <div className="search-result-details">{props.result.details}</div>
      </div>
    </div>
  );
};

export default connect(null, { retrieveCity })(ResultItem);
