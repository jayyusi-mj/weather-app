import { Row, Col } from 'react-bootstrap';

const HourlyWeather = (props) => {
  const hourly = props.hourly;
  return (
    <>
      {hourly.map((hour) => (
        <Col className="hourly-column">
          <ul>
            <li>
              <b>{hour.day}</b>
            </li>
            <li>{hour.time}</li>
            <li>{hour.description}</li>
            <li>
              {hour.icon && (
                <img id="weatherIcon" src={hour.icon} alt="weather icon" />
              )}
            </li>
            <li>
              <b>{hour.temp} </b> <sup>°</sup>C
            </li>
            <li>{hour.main}</li>
            <li className="text-white">{hour.sep}</li>
            <div className="hourly-white-box">
              <li>
                {hour.feels_like} <sup>°</sup>C
              </li>
              <li>
                {hour.pressure} <sup>hPa</sup>
              </li>
              <li>
                {hour.humidity} <sup>%</sup>
              </li>
		<li>
		  {hour.dew_point ?? 'N/A'} <sup>°</sup>
		</li>
		<li>{hour.uvi ?? 'N/A'}</li>
              <li>
                {hour.clouds} <sup>%</sup>
              </li>
              <li>
                {hour.visibility} <sup>km</sup>
              </li>
              <li>
                {hour.wind_speed} <sup>km/h</sup>
              </li>
              <li>
                {hour.wind_deg} <sup>°</sup>
              </li>
              <li>
                {hour.pop} <sup>%</sup>
              </li>
            </div>
          </ul>
        </Col>
      ))}
    </>
  );
};

export default HourlyWeather;
