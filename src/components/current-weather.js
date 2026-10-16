import { Container, Row, Col } from 'react-bootstrap';
import MyForm from './form';

const Current_Weather = (props) => {
  return (
    <Container className="">
      <Row className="p-3">
        {/* Current Weather */}
        <Col className="current-weather p-3">
          <div>{props.timezone && <span>{props.timezone}</span>}</div>
          <div>
            <span style={{ color: '#ffffff' }}>Updated on:</span>{' '}
            {props.todays_date && <div>{props.todays_date}</div>}
            {props.time && <div>{props.time}</div>}
          </div>
          <div>
            {props.temp && <span className="current-temp"> {props.temp}</span>}
            <span className="centigrade">° C</span>
            <span className="feels-like-text">feels like</span>
          </div>
          <span className="current-feels-like-temp">
            {props.feels_like && <span>{props.feels_like}</span>}
          </span>
          <div className="weather-icon">
            {props.icon && (
              <img id="weatherIcon" src={props.icon} alt="weather icon" />
            )}
          </div>
          <div className="weather-description">
            {props.description && <span>{props.description}</span>}
          </div>
        </Col>
        {/* Alerts */}
        <Col className="alerts">
          <div>Alerts:</div>
          <div>{props.alerts}</div>
        </Col>
        {/* Custom City */}
        <Col className="custom-city">
          <MyForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Current_Weather;
