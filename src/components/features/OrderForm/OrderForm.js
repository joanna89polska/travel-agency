import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../../features/OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import settings from '../../../data/settings';
import styles from './OrderForm.scss';
import Button from '../../common/Button/Button';
import pricing from '../../../data/pricing.json';
import { formatPrice } from '../../../utils/formatPrice';
import OrderOption from '../../features/OrderOption/OrderOption';
import { calculateTotal } from '../../../utils/calculateTotal';

const sendOrder = (options, tripCost, countryCode, tripName, tripId) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    countryCode,
    tripName,
    tripId,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({ options, tripCost, setOrderOption, countryCode, tripName, tripId }) => {
  const isEnabled = options.name.length >= 1 && options.contact.length >= 1;
  return (
    <Row className={styles.component}>
      {pricing.map(option => (
        <Col key={option.id} md={4}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary cost={tripCost} options={options} />
        <Button disabled={!isEnabled} onClick={() => sendOrder(options, tripCost,countryCode, tripName, tripId)}>Order now!</Button>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  countryCode: PropTypes.any,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
};

export default OrderForm;