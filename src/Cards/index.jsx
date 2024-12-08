import PropTypes from 'prop-types';
import './Cards.css';
import img from './plane.png';
function getStopsLabel(number) {
    const titles = ['пересадка', 'пересадки', 'пересадок'];
    const cases = [2, 0, 1, 1, 1, 2];
    return `${number} ${titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const day = date.getDate(); 
    const month = months[date.getMonth()]; 
    const year = date.getFullYear(); 
    const weekday = weekdays[date.getDay()];

    return `${day} ${month} ${year}, ${weekday}`;
}

export default function Cards({ tickets, selectedCurrency, currencySymbols }) {
    return (
        <div className="container">
            {tickets.map((data) => (
                <div key={data.id || data.uniqueKey} className="card">
                    <div className="left">
                        <div className="carrier-button">
                        <img 
                src={`/images/${data.carrier_image}`} 
                alt={`${data.carrier} logo`} 
                className="carrier-logo"
              />
                        
                            <button className="buy-button">
                                <p>Купить</p>
                                <p>за {data.price}{currencySymbols[selectedCurrency]}</p>
                            </button>
                        </div>
                    </div>
                    <div className="right">
                        <div className="table">
                            <div className="upper">
                                <span className="header">{data.departure_time}</span>
                                <div className="moving">
                                    <div className='center'>
                                    <div>
                                        {data.stops === 0
                                            ? 'Без пересадок'
                                            : getStopsLabel(data.stops)}
                                    </div>
                                    <div className="line"/>
                                    <img src={img} className="plane" alt="plane" />
                                </div>
                                </div>
                                <span className="header">{data.arrival_time}</span>
                            </div>
                            <div className="lower">
                                <div className="departure">
                                    <span>{data.origin}, {data.origin_name}</span>
                                    <p>{formatDate(data.departure_date)}</p>
                                </div>
                                <div className="arrival">
                                    <span>{data.destination}, {data.destination_name}</span>
                                    <p>{formatDate(data.arrival_date)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
Cards.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            carrier: PropTypes.string.isRequired,
            carrier_image: PropTypes.string.isRequired,
            departure_time: PropTypes.string.isRequired,
            arrival_time: PropTypes.string.isRequired,
            departure_date: PropTypes.string.isRequired,
            arrival_date: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            stops: PropTypes.number.isRequired,
            origin: PropTypes.string.isRequired,
            origin_name: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired,
            destination_name: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedCurrency: PropTypes.string.isRequired,
    currencySymbols: PropTypes.object.isRequired,
};
