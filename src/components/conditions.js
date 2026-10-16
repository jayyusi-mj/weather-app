import { Container, Row, Col } from 'react-bootstrap';
import Condition from './condition';

const Conditions = (props) => {
  return (
    <Container>
      <Row>
        <Col className="p-0">
          <Condition name="Wind Speed" value={props.wind_speed} />
        </Col>
        <Col>
          <Condition name="Humidity" value={props.humidity} />
        </Col>
        <Col>
          <Condition name="Visibility" value={props.visibility}></Condition>
        </Col>
        <Col>
          <Condition name="Sunrise" value={props.sunrise}></Condition>
        </Col>
        <Col>
          <Condition name="Wind deg." value={props.wind_deg}></Condition>
        </Col>
        <Col>
          <Condition name="Pressure" value={props.pressure}></Condition>
        </Col>
        <Col>
          <Condition name="Dew Point" value={props.dew_point}></Condition>
        </Col>
        <Col className="p-0">
          <Condition name="Sunset" value={props.sunset}></Condition>
        </Col>
      </Row>
    </Container>
  );
};

export default Conditions;
