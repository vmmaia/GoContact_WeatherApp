function mockCity({
  name = 'Murtosa',
  details = 'Aveiro, Portugal',
  time = 1621678620000,
  temperature = 15,
  is_day = 1,
  weather = 'Partly cloudy',
  weather_icon = '116.png',
  sunrise = '06:11 AM',
  sunrise_epoch = 1621663860000,
  sunset = '08:52 PM',
  sunset_epoch = 1621716720000
}) {
  return {
    name,
    details,
    time,
    temperature,
    is_day,
    weather,
    weather_icon,
    sunrise,
    sunrise_epoch,
    sunset,
    sunset_epoch
  };
}

export default mockCity;
