import { connect } from 'react-redux';
import Card from './card';
import './card.css';

const CardList = (props) => {
  return props.weatherState.cities.map((city, i) => {
    return <Card key={i} city={city} />;
  });
};

const mapStateToProps = (state) => {
  return { weatherState: state.weather };
};

export default connect(mapStateToProps, null)(CardList);
