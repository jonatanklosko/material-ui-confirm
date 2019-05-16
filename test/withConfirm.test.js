import React from 'react';
import { mount } from 'enzyme';

import withConfirm from '../src/withConfirm';

describe('withConfirm', () => {
  const handleClick = jest.fn();
  const TestComponent = ({ confirmOptions, confirm }) => {
    return (
      <button onClick={confirm(handleClick, confirmOptions)}>
        Delete
      </button>
    );
  };
  const TestComponentWithConfirm = withConfirm(TestComponent);

  beforeEach(() => handleClick.mockReset());

  test('calls confirmation callback on confirm', () => {
    const wrapper = mount(<TestComponentWithConfirm />);
    expect(wrapper.find('Dialog').props().open).toBe(false);
    wrapper.find('button[children="Delete"]').simulate('click');
    expect(wrapper.find('Dialog').props().open).toBe(true);
    wrapper.find('Button[children="Ok"]').simulate('click');
    expect(handleClick).toHaveBeenCalled();
    expect(wrapper.find('Dialog').props().open).toBe(false);
  });

  test('does not call confirmation callback on cancel', () => {
    const wrapper = mount(<TestComponentWithConfirm />);
    expect(wrapper.find('Dialog').props().open).toBe(false);
    wrapper.find('button[children="Delete"]').simulate('click');
    expect(wrapper.find('Dialog').props().open).toBe(true);
    wrapper.find('Button[children="Cancel"]').simulate('click');
    expect(handleClick).not.toHaveBeenCalled();
    expect(wrapper.find('Dialog').props().open).toBe(false);
  });

  describe('options', () => {
    test('accepts custom text', () => {
      const wrapper = mount(
        <TestComponentWithConfirm confirmOptions={{
          title: 'Remove this item?',
          description: 'This will permanently remove the item.',
          cancellationText: 'No way',
          confirmationText: 'Yessir',
        }} />
      );
      wrapper.find('button[children="Delete"]').simulate('click');
      expect(wrapper.text()).toMatch('Remove this item?');
      expect(wrapper.text()).toMatch('This will permanently remove the item.');
      expect(wrapper.find('Button[children="No way"]')).toHaveLength(1);
      expect(wrapper.find('Button[children="Yessir"]')).toHaveLength(1);
    });

    test('calls onCancel when cancaled', () => {
      const onCancel = jest.fn();
      const wrapper = mount(
        <TestComponentWithConfirm confirmOptions={{ onCancel }} />
      );
      wrapper.find('button[children="Delete"]').simulate('click');
      wrapper.find('Button[children="Cancel"]').simulate('click');
      expect(onCancel).toHaveBeenCalled();
      onCancel.mockReset();
      wrapper.find('button[children="Delete"]').simulate('click');
      wrapper.find('Button[children="Ok"]').simulate('click');
      expect(onCancel).not.toHaveBeenCalled();
    });

    test('calls onClose whenever dialog is closed', () => {
      const onClose = jest.fn();
      const wrapper = mount(
        <TestComponentWithConfirm confirmOptions={{ onClose }} />
      );
      wrapper.find('button[children="Delete"]').simulate('click');
      wrapper.find('Button[children="Cancel"]').simulate('click');
      expect(onClose).toHaveBeenCalled();
      onClose.mockReset();
      wrapper.find('button[children="Delete"]').simulate('click');
      wrapper.find('Button[children="Ok"]').simulate('click');
      expect(onClose).toHaveBeenCalled();
    });
  });
});
