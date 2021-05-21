import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import './graph.css';

const Graph = (props) => {
  const series = [
    {
      name: 'Temperature',
      data: props.weatherState.cities.map((city) => city.temperature)
    }
  ];

  const options = {
    chart: {
      id: 'barchart'
    },
    xaxis: {
      categories: props.weatherState.cities.map((city) => city.name)
    }
  };

  return (
    <div className="graph-wrapper">
      {props.weatherState.cities.length !== 0 ? (
        <Chart series={series} options={options} type="bar" height="250px" />
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { weatherState: state.weather };
};

export default connect(mapStateToProps, null)(Graph);
