import React from 'react';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  showDaysToSummer() {
    const CurrentDate = new Date();
    const summerStart = new Date(Date.UTC(CurrentDate.getUTCFullYear(), 4, 21));
    const summerEnd = new Date(Date.UTC(CurrentDate.getUTCFullYear(), 7, 23));

    let days;

    if (summerStart <= CurrentDate && CurrentDate <= summerEnd) {
      days = '';
    } else if (CurrentDate > summerEnd) {
      const currentYear = CurrentDate.getUTCFullYear();
      const nextYear = currentYear + 1;
      const nextSummer = new Date(Date.UTC(nextYear, 5, 21));
      days = Math.floor((nextSummer.getTime() - CurrentDate.getTime()) / (1000*60*60*24)) + ' days to summer!';
    } else if (CurrentDate < summerStart) {
      const oneDay = new Date(Date.UTC(CurrentDate.getUTCFullYear(), 5, 20));
      if (CurrentDate.getTime() === oneDay.getTime()) {
        days = '1 day to summer!';
      } else {
        days = Math.floor((summerStart.getTime() - CurrentDate.getTime()) / (1000*60*60*24)) + ' days to summer!';
      }
    }
    return days ;
  }

  render() {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{this.showDaysToSummer()}</h3>
      </div>
    );
  }
}

export default DaysToSummer;