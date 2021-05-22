import { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTime } from '../../redux/actions/weather-actions';
import './card.css';

const Card = (props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      props.updateTime(props.city.name);
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentTime = (epoch) => {
    const date = new Date(epoch);

    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      data-testid={'weather-card-wrapper'}
      className={`weather-card ${
        props.city.is_day === 1 ? 'weather-card-day' : 'weather-card-night'
      }`}
    >
      <div className="weather-card-top-section">
        <img
          alt="weather icon"
          src={`/assets/weather-icons/${
            props.city.is_day === 1 ? 'day' : 'night'
          }/${props.city.weather_icon}`}
        />
        <span>{`${props.city.temperature}ºC`}</span>
      </div>

      <div className="weather-card-condition">
        <span>{props.city.weather}</span>
      </div>

      <hr />

      <div className="weather-card-location-section">
        <div>{props.city.name}</div>
        <div>{props.city.details}</div>
      </div>

      <hr />

      <div className="weather-card-details-section">
        <div>
          <span>Sunrise</span>
          <br />
          <span>{props.city.sunrise}</span>
        </div>
        <div>
          <span>Sunset</span>
          <br />
          <span>{props.city.sunset}</span>
        </div>
      </div>

      <div className="weather-card-time-section">{`Current time: ${currentTime(
        props.city.time
      )}`}</div>
    </div>
  );
};

export default connect(null, { updateTime })(Card);
