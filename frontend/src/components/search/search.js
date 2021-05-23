import ResultList from './result-list';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  search,
  resetSearch,
  setQuery
} from '../../redux/actions/search-actions';

import './search.css';

let searchTimer;

const Search = (props) => {
  useEffect(() => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    if (props.searchState.query && props.searchState.query.length <= 3) return;

    searchTimer = setTimeout(() => {
      props.search(props.searchState.query);
    }, 750);
  }, [props.searchState.query]);

  const handleSearchItem = (event) => {
    const value = event.target.value;

    props.setQuery(value);

    if (value.length === 0) {
      props.resetSearch();
    }
  };

  return (
    <div
      data-testid="search-wrapper"
      className={`search-wrapper ${
        props.searchState.showResults ? 'search-wrapper-with-results' : ''
      }`}
    >
      <input
        data-testid="search-input"
        className="search-input"
        type="text"
        placeholder="Find the weather in your city"
        onChange={handleSearchItem}
        onKeyUp={(e) => {
          if (e.code === 'Escape') {
            props.resetSearch();
          }
        }}
        value={props.searchState.query}
      />
      <i className="fa fa-search search-icon" aria-hidden="true"></i>

      {props.searchState.showResults ? <ResultList /> : <></>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { searchState: state.search };
};

export default connect(mapStateToProps, {
  search,
  resetSearch,
  setQuery
})(Search);
