import React from 'react';
import { mount } from 'enzyme';

import withConfirm from '../src/withConfirm';

describe('withConfirm', () => {
  const handleClick = jest.fn();
  const TestComponent = ({ confirm }) => {
    return (
      <button onClick={confirm(handleClick, { message: 'This will permanently remove the item.' })}>
        Delete
      </button>
    );
  };
  const TestComponentWithConfirm = withConfirm(TestComponent);

  beforeEach(() => handleClick.mockReset());

  test('calls callback on confirm', () => {
    const wrapper = mount(<TestComponentWithConfirm />);
    expect(wrapper.find('Dialog').props().open).toBe(false);
    wrapper.find('button[children="Delete"]').simulate('click');
    expect(wrapper.find('Dialog').props().open).toBe(true);
    expect(wrapper.text()).toMatch('Are you sure?');
    expect(wrapper.text()).toMatch('This will permanently remove the item.');
    wrapper.find('Button[children="Yes"]').simulate('click');
    expect(handleClick).toHaveBeenCalled();
    expect(wrapper.find('Dialog').props().open).toBe(false);
  });

  test('does not call callback on cancel', () => {
    const wrapper = mount(<TestComponentWithConfirm />);
    expect(wrapper.find('Dialog').props().open).toBe(false);
    wrapper.find('button[children="Delete"]').simulate('click');
    expect(wrapper.find('Dialog').props().open).toBe(true);
    wrapper.find('Button[children="No"]').simulate('click');
    expect(handleClick).not.toHaveBeenCalled();
    expect(wrapper.find('Dialog').props().open).toBe(false);
  });
});
