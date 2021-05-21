import SearchBar from '../../components/search/search';
import WeatherCardList from '../../components/weather-card/card-list';
import WeatherGraph from '../../components/graph/graph';
import WeatherTable from '../../components/table/table';

import './landing.css';

const Landing = (props) => {
  return (
    <>
      <SearchBar />
      <div className="landing-info-container">
        <WeatherCardList />
      </div>
      <div className="landing-info-container">
        <WeatherTable />
        <WeatherGraph />
      </div>
    </>
  );
};

export default Landing;
