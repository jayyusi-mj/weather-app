import { Container } from 'react-bootstrap';

const Condition = (props) => {
  return (
    <Container className="condition-column d-flex flex-column justify-content-between p-2">
      <div className="condition-name">{props.name}</div>
      <div className="condition-value">{props.value}</div>
    </Container>
  );
};

export default Condition;
