import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

const mockProps = {
  title: 'days to summer!',
};

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });
});

const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if (args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now() {
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:00.000Z`);

    const component = shallow(<DaysToSummer {...mockProps}/>);
    const renderedDays = component.find('.title').text();
    expect(renderedDays).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDate('2020-06-21', '');
  checkDescriptionAtDate('2019-09-23', '');

  checkDescriptionAtDate('2020-01-01', '171 days to summer!');
  checkDescriptionAtDate('2019-10-24', '241 days to summer!');

  checkDescriptionAtDate('2020-06-20', '1 day to summer!');
  checkDescriptionAtDate('2020-06-19', '2 days to summer!');
});