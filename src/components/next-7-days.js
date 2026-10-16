import { Container, Row, Col } from 'react-bootstrap';
import Day from './day';
import { useContext } from 'react';
import { useFetchGeolocation } from '../functions/useFetchGeolocation';
import WeatherContext from '../components/weatherContext';
import GlobalVariables from '../assets/global-variables';
const Next_Seven_Days = (props) => {
  const context = useContext(WeatherContext);
  const weather = context.weather;
  // useFetchGeolocation(GlobalVariables.GEOLOCATION_DATABASE_CDN);
  const days = props.days;
  //console.log('days =', days);
  return (
    <Container>
      {weather && (
        <h5 className="text-center m-3">
          {weather.timezone.replace(/_/g, ' ')} - Next 5 Days
        </h5>
      )}
      <Row className="m-0">
        <div className="d-flex align-items-end">
          <Col className="legend p-2">
            <div>Feels like</div>
            <div>Wind</div>
            <div>Wind deg.</div>
          </Col>
        </div>

        {days.map((day) => (
          <Col className="day-column">
            <Day
              name={day.date}
              date={day.condition}
              icon={day.icon}
              temp={day.temp}
              feels_like={day.feels_like}
              wind_speed={day.wind_speed}
              wind_deg={day.wind_deg}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Next_Seven_Days;
