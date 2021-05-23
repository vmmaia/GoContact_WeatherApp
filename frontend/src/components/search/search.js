import ResultList from './result-list';
import { connect } from 'react-redux';
import {
  search,
  resetSearch,
  setQuery
} from '../../redux/actions/search-actions';

import './search.css';

let searchCounter = 0;

const Search = (props) => {
  const handleSearchItem = (event) => {
    const value = event.target.value;

    props.setQuery(value);

    if (!value || value.length === 0) {
      props.resetSearch();
      return;
    }

    searchCounter++;
    const counter = searchCounter;

    setTimeout(() => {
      searchItem(counter, value);
    }, 750);
  };

  const searchItem = (counter, value) => {
    if (counter === searchCounter) {
      props.search(value);
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
          if (e.keyCode === 27) {
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
