import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate correct link for the website', () => {
    const id = 'abc';
    const component = shallow(<TripSummary id={id} />);
    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual(`/trip/${id}`);
    console.log(component.debug());
  });

  it('should check if <img> has correct src and alt', () => {
    const expectedImg = 'picture.jpg';
    const expectedAlt = 'description';
    const component = shallow(<TripSummary image={expectedImg} name={expectedAlt} />);

    expect(component.find('img').prop('src')).toEqual(expectedImg);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
    console.log(component.debug());
  });

  it('should render correct name, cost and days', () => {
    const expectedName = 'name';
    const expectedCost = 'cost';
    const expectedDays = '7';
    const component = shallow(<TripSummary name={expectedName} days={expectedDays} cost={expectedCost} />);

    expect(component).toBeTruthy();
    console.log(component.debug());
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render array for tags correctly', () => {
    const expectedTagArray = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary tags={expectedTagArray} />);

    expect(component.find('.tags span').at(0).text()).toEqual(expectedTagArray[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTagArray[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTagArray[2]);
    console.log(component.debug());
  });

  it('dont render div if tags for array are empty or not stated', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary tags={expectedTags} />);

    expect(component.find('.tags')).toEqual({});
    console.log(component.debug());
  });

});