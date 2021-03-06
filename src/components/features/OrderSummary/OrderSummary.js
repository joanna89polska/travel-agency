import React from 'react';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import styles from './OrderSummary.scss';
import PropTypes from 'prop-types';


const OrderSummary = ({cost, options}) => (
  <h2 className={styles.component}>
    Total:
    <strong>
    ${calculateTotal(formatPrice(cost), options)}
    </strong>
  </h2>
);

OrderSummary.propTypes = {
  cost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;