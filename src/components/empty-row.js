import { Container, Row } from 'react-bootstrap';

const Empty_Row = (props) => {
  return (
    <Container>
      <Row>
        <div>{props.title && <div>&nbsp;Next 7 Days</div>}&nbsp;</div>
      </Row>
    </Container>
  );
};

export default Empty_Row;
