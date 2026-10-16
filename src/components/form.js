import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import GlobalVariables from '../assets/global-variables';
import { useContext } from 'react';
import WeatherContext from '../components/weatherContext';
import { buildWeatherData } from '../functions/weatherDataBuilder';
import ISO3311a2 from 'iso-3166-1-alpha-2';

const Form_Custom = () => {
  const context = useContext(WeatherContext);

  const country_names = ISO3311a2.getData();

  let countriesList = Object.keys(country_names).map((key) => {
    return (
      <option key={key} value={key}>
        {key} - {country_names[key]}
      </option>
    );
  });

  const getData = async () => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;

    if (!city || !country) {
      alert('Please enter at least a city and country');
      return;
    }

    try {
      const query = state
        ? `${city},${state},${country}`
        : `${city},${country}`;
      const url1 = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${GlobalVariables.API_KEY}`;
      const geoRes = await fetch(url1);
      const geolocation = await geoRes.json();

      if (!geoRes.ok || !geolocation || geolocation.length === 0) {
        alert('City not found. Try a different search.');
        return;
      }

      const { lat, lon } = geolocation[0];
      const key = GlobalVariables.API_KEY;

      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        ),
      ]);

      if (!currentRes.ok || !forecastRes.ok) {
        throw new Error('Weather API error');
      }

      const current = await currentRes.json();
      const forecast = await forecastRes.json();

      context.setWeather(buildWeatherData(current, forecast));
      context.setMinutelyIsMissing(true);
      context.setHourlyIsMissing(false);
      context.setAlert('No alerts available.');
      context.setIsLoading(false);
      context.setIsError(false);
    } catch (err) {
      console.error('City search failed:', err);
      alert('Something went wrong fetching weather for that city.');
    }
  };

  return (
    <Container>
      <Form className="p-1" id="form1">
        <Form.Row className="m-2">
          <Form.Control placeholder="City" id="city" name="city" />
        </Form.Row>
        <Form.Row className="m-2">
          <InputGroup>
            <Form.Control placeholder="State (optional)" id="state" name="state" />
          </InputGroup>
        </Form.Row>
        <Form.Row className="m-2">
          <select id="country" name="country" className="form-control" defaultValue="CA">
            {countriesList}
          </select>
        </Form.Row>
        <Form.Row className="justify-content-center m-4">
          <Button variant="primary" size="sm" onClick={getData}>
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default Form_Custom;
