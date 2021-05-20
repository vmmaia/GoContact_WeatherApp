import ResultItem from './result-item';
import Spinner from '../spinner/spinner';
import { connect } from 'react-redux';
import './search.css';

const ResultList = (props) => {
  return (
    <div className="search-result-list">
      {props.searchState.isSearching ? (
        <Spinner />
      ) : props.searchState.error !== '' ? (
        <span>{props.searchState.error}</span>
      ) : props.searchState.results.length === 0 ? (
        <span>No results found</span>
      ) : (
        <>
          {props.searchState.results.map((r, i) => {
            return <ResultItem key={i} result={r} />;
          })}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { searchState: state.search };
};

export default connect(mapStateToProps, null)(ResultList);
