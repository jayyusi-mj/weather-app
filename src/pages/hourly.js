import { Container, Row, Col } from 'react-bootstrap';
import HourlyPagination from '../components/hourly-pagination';
import { useContext, useState } from 'react';
import WeatherContext from '../components/weatherContext';
import HourlyLegend from '../components/hourly-legend';
import HourlySinglePage from '../components/hourly-single-page';
import { useFetchGeolocation } from '../functions/useFetchGeolocation';
import GlobalVariables from '../assets/global-variables';
const Hourly = () => {
  const context = useContext(WeatherContext);
  const begin = context.paginationStartIndex;
  const end = context.paginationEndIndex;
  //console.log('context = ', context);
  const weather = context.weather;
  const hoursPerPage = GlobalVariables.HOURS_PER_PAGE;
  //useFetchGeolocation(GlobalVariables.GEOLOCATION_DATABASE_CDN);
  if (context.isLoading) {
    return (
      <div className="text-center">
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (context.hourlyIsMissing) {
    return (
      <div className="text-center">
        <h5>
          Hourly weather is currently unavailable for this location,
          <br /> try a different location, e.g. Toronto, Ontario, Canada
        </h5>
      </div>
    );
  }

  if (context.isError) {
    return (
      <div className="text-center">
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <Container className="hourly-container">
      {weather && (
        <h5 className="text-center m-3">
	  {weather.timezone.replace(/_/g, ' ')} - 5 Day Forecast (3-hour steps)
          {/* replace underscore with space */}
        </h5>
      )}
      <Row className="hourly-row m-0">
        <HourlyLegend />
        <HourlySinglePage weather={weather} begin={begin} end={end} />
      </Row>

      <HourlyPagination
        active={(context.paginationEndIndex + 1) / hoursPerPage}
      />
    </Container>
  );
};

export default Hourly;
