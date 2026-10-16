import { Container } from 'react-bootstrap';

const CelsiusFahrenheit = () => {
  return (
    <div className="moto p-1">
      <Container className="d-flex justify-content-between">
        <div className="">Your weather when it really matters ™</div>
        {/* <div>
          <a href="/." className="celsius">
            ° C
          </a>
          <a href="/." className="fahrenheit">
            ° F
          </a>
        </div> */}
      </Container>
    </div>
  );
};

export default CelsiusFahrenheit;
