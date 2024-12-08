import './Filter.css';
import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function getStopsLabel(number) {
  const titles = ['пересадка', 'пересадки', 'пересадок'];
  const cases = [2, 0, 1, 1, 1, 2];
  return `${number} ${titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;
}

function Filter({ onCurrencyChange, onFilterChange }) {
    const exchangeRates = {
        RUB: 1,
        USD: 0.013,
        EUR: 0.011,
    };

    const [selectedCurrency, setSelectedCurrency] = useState('RUB');
    const [selectedStops, setSelectedStops] = useState({
        all: true,
        noStops: false,
        oneStop: false,
        twoStops: false,
        threeStops: false,
    });

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        onCurrencyChange(currency);
    };

    const handleStopSelect = (stopType) => {
        const updatedStops = { ...selectedStops };

        if (stopType === 'all') {
            updatedStops.all = true;
            updatedStops.noStops = false;
            updatedStops.oneStop = false;
            updatedStops.twoStops = false;
            updatedStops.threeStops = false;
        } else {
            updatedStops.all = false;
            updatedStops[stopType] = !updatedStops[stopType];
        }

        setSelectedStops(updatedStops);
        onFilterChange(updatedStops); 
    };

    return (
        <div className="filter">
            <span className="head">ВАЛЮТА</span>
            <div className="choose-currency">
                {Object.keys(exchangeRates).map(currency => (
                    <button
                        key={currency}
                        onClick={() => handleCurrencySelect(currency)}
                        className={classNames('button-1', { 'active': selectedCurrency === currency })}
                    >
                        {currency}
                    </button>
                ))}
            </div>

            <div className="head">Количество пересадок</div>
            <form>
                {Object.keys(selectedStops).map(stopType => (
                    <label key={stopType}>
                        <input
                            type="checkbox"
                            checked={selectedStops[stopType]}
                            onChange={() => handleStopSelect(stopType)}
                        />
                        <p>
                        {stopType === 'all'
                            ? 'Все'
                            : stopType === 'noStops'
                              ? 'Без пересадок'
                              : stopType === 'oneStop'
                                ? getStopsLabel(1)
                                : stopType === 'twoStops'
                                  ? getStopsLabel(2)
                                  : stopType === 'threeStops'
                                    ? getStopsLabel(3)
                                    : ''}
                        </p>
                    </label>
                ))}
            </form>
        </div>
    );
}
Filter.propTypes = {
  onCurrencyChange: PropTypes.func.isRequired, 
  onFilterChange: PropTypes.func.isRequired,   
};

export default Filter;
