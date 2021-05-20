import SearchBar from '../components/search/search';
import WeatherCard from '../components/weather-card/card';
import WeatherGraph from '../components/graph/graph';
import WeatherTable from '../components/table/table';

const Landing = (props) => {
  return (
    <>
      <SearchBar />
      <div className="weather-card-wrapper">
        <WeatherCard />
      </div>
      <div className="info-wrapper">
        <div>
          <WeatherGraph />
        </div>
        <div>
          <WeatherTable />
        </div>
      </div>
    </>
  );
};

export default Landing;
