import Filter from './Filter';
import Cards from './Cards';
import './App.css';
import { useState, useEffect } from 'react';
import { tickets } from './backend/tickets';
import logo from '../public/images/logo.png';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('RUB');
  const [selectedStops, setSelectedStops] = useState({
    all: true,
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
  });
  const [filteredTickets, setFilteredTickets] = useState(tickets); 

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleFilterChange = (selectedStops) => {
    setSelectedStops(selectedStops);
  };

  useEffect(() => {
    const exchangeRates = {
      RUB: 1,
      USD: 0.013,
      EUR: 0.011,
    };

    const rate = exchangeRates[selectedCurrency];

    const filteredByStops = tickets.filter(ticket => {
   
      if (selectedStops.all) return true;
      return (
        (selectedStops.noStops && ticket.stops === 0) ||
        (selectedStops.oneStop && ticket.stops === 1) ||
        (selectedStops.twoStops && ticket.stops === 2) ||
        (selectedStops.threeStops && ticket.stops === 3)
      );
    });

   
    if (filteredByStops.length === 0) {
      setFilteredTickets([]);
    } else {
  
      const filteredAndConvertedTickets = filteredByStops.map(ticket => ({
        ...ticket,
        price: Math.round(ticket.price * rate),
      }));
      setFilteredTickets(filteredAndConvertedTickets);
    }
  }, [selectedCurrency, selectedStops]);

  return (
    <div className='page'>
      <a href='/'><img src={logo} className='logo'/></a>
      <div className="inner">
        <Filter 
          onCurrencyChange={handleCurrencyChange} 
          onFilterChange={handleFilterChange} 
        />
        {filteredTickets.length > 0 ? (
          <Cards 
            tickets={filteredTickets} 
            selectedCurrency={selectedCurrency} 
            currencySymbols={{ RUB: "₽", USD: "$", EUR: "€" }} 
          />
        ) : (
          <div className="no-tickets">
            <p>Билеты не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
