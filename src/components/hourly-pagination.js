import { Pagination } from 'react-bootstrap';
import { useContext } from 'react';
import WeatherContext from '../components/weatherContext';
import GlobalVariables from '../assets/global-variables';

const HourlyPagination = (props) => {
  const context = useContext(WeatherContext);
  const HoursPerPage = GlobalVariables.HOURS_PER_PAGE;
  let active = props.active;
  let items = [];
  for (let number = 1; number <= Math.ceil(48 / HoursPerPage); number++) {
    items.push(
      <Pagination.Item
        onClick={(e) => {
          e.preventDefault();
          //get ul list of page numbers
          const pagination_list = document.getElementById('pagination');
          //get the list of 'li' items in the 'ul' element
          const paginationCollection = pagination_list.children;
          //remove the 'active' class from any element that might have it.
          [].forEach.call(paginationCollection, (el) => {
            el.classList.remove('active');
          });
          //add the 'active' class to the clicked page
          paginationCollection[e.target.firstChild.data - 1].classList.add(
            'active'
          );

          context.setPaginationStartIndex(
            (e.target.firstChild.data - 1) * HoursPerPage
          );
          context.setPaginationEndIndex(
            e.target.firstChild.data * HoursPerPage - 1
          );
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="pagination">
      <Pagination id="pagination" size="sm">
        {items}
      </Pagination>
    </div>
  );
};

export default HourlyPagination;
