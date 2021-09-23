import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

import { ConfirmProvider, useConfirm } from '../src/index';

describe('useConfirm', () => {
  const deleteConfirmed = jest.fn();
  const deleteCancelled = jest.fn();

  const DeleteButton = ({ confirmOptions }) => {
    const confirm = useConfirm();

    return (
      <button onClick={() => confirm(confirmOptions).then(deleteConfirmed).catch(deleteCancelled)}>
        Delete
      </button>
    );
  };

  const TestComponent = ({ confirmOptions }) => (
    <ConfirmProvider>
      <DeleteButton confirmOptions={confirmOptions} />
    </ConfirmProvider>
  );

  test('resolves the promise on confirm', async () => {
    const { getByText, queryByText } = render(<TestComponent />);
    expect(queryByText('Are you sure?')).toBeFalsy();
    fireEvent.click(getByText('Delete'));
    expect(queryByText('Are you sure?')).toBeTruthy();
    fireEvent.click(getByText('Ok'));
    await waitForElementToBeRemoved(() => queryByText('Are you sure?'));
    expect(deleteConfirmed).toHaveBeenCalled();
    expect(deleteCancelled).not.toHaveBeenCalled();
  });

  test('rejects the promise on cancel', async () => {
    const { getByText, queryByText } = render(<TestComponent />);
    expect(queryByText('Are you sure?')).toBeFalsy();
    fireEvent.click(getByText('Delete'));
    expect(queryByText('Are you sure?')).toBeTruthy();
    fireEvent.click(getByText('Cancel'));
    await waitForElementToBeRemoved(() => queryByText('Are you sure?'));
    expect(deleteConfirmed).not.toHaveBeenCalled();
    expect(deleteCancelled).toHaveBeenCalled();
  });

  describe('options', () => {
    test('accepts custom text', () => {
      const { getByText, queryByText } = render(
        <TestComponent confirmOptions={{
          title: 'Remove this item?',
          description: 'This will permanently remove the item.',
          cancellationText: 'No way',
          confirmationText: 'Yessir',
        }} />
      );
      fireEvent.click(getByText('Delete'));
      expect(queryByText('Remove this item?')).toBeTruthy();
      expect(queryByText('This will permanently remove the item.')).toBeTruthy();
      expect(queryByText('No way')).toBeTruthy();
      expect(queryByText('Yessir')).toBeTruthy();
    });

    test('accepts custom content', () => {
      const { getByText, queryByText } = render(
        <TestComponent confirmOptions={{
          content: <div>Arbitrary content</div>
        }} />
      );
      fireEvent.click(getByText('Delete'));
      expect(queryByText('Arbitrary content')).toBeTruthy();
    });
  });

  test('honours default options passed to the provider', () => {
    const { getByText, queryByText } = render(
      <ConfirmProvider
        defaultOptions={{ confirmationText: 'Yessir', cancellationText: 'No way' }}
      >
        <DeleteButton confirmOptions={{ cancellationText: 'Nope' }} />
      </ConfirmProvider>
    );
    fireEvent.click(getByText('Delete'));
    expect(queryByText('Yessir')).toBeTruthy();
    expect(queryByText('Nope')).toBeTruthy();
  });

  test('merges default options with local options in a deep manner', () => {
    const { getByText } = render(
      <ConfirmProvider
        defaultOptions={{ confirmationButtonProps: { 'aria-label': 'Confirm' } }}
      >
        <DeleteButton confirmOptions={{ confirmationText: 'Yes', confirmationButtonProps: { disabled: true } }} />
      </ConfirmProvider>
    );
    fireEvent.click(getByText('Delete'));
    const button = getByText('Yes');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-label')).toEqual('Confirm');
  });
});
