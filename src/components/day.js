import { Container } from 'react-bootstrap';

const Day = (props) => {
  return (
    <Container className="d-flex flex-column m-0 p-0">
      <div>
        <div>{props.name && <div>{props.name}</div>}</div>
        <div>{props.date && <div>{props.date}</div>}</div>
        <div>{props.description && <div>{props.description}</div>}</div>
      </div>
      <div>
        {props.icon && (
          <div>
            <img
              id="weatherIcon"
              src={props.icon}
              alt="weather icon"
              height="50vmin"
            />
          </div>
        )}
        <div>{props.temp && <div>{props.temp} ° C</div>}</div>
      </div>
      <div className="white-background-weather-boxes p-2 m-2">
        <div>{props.feels_like && <div>{props.feels_like} °C</div>}</div>
        <div>{props.wind_speed && <div>{props.wind_speed} km/h</div>}</div>
        <div>{props.wind_deg && <div>{props.wind_deg}°</div>}</div>
      </div>
    </Container>
  );
};

export default Day;
