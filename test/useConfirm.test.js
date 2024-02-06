import React, { useState } from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { ConfirmProvider, useConfirm } from "../src/index";

describe("useConfirm", () => {
  const deleteConfirmed = jest.fn();
  const deleteCancelled = jest.fn();

  const DeleteButton = ({ confirmOptions }) => {
    const confirm = useConfirm();

    return (
      <button
        onClick={() =>
          confirm(confirmOptions).then(deleteConfirmed).catch(deleteCancelled)
        }
      >
        Delete
      </button>
    );
  };

  const TestComponent = ({ confirmOptions }) => (
    <ConfirmProvider>
      <DeleteButton confirmOptions={confirmOptions} />
    </ConfirmProvider>
  );

  test("resolves the promise on confirm", async () => {
    const { getByText, queryByText } = render(<TestComponent />);
    expect(queryByText("Are you sure?")).toBeFalsy();
    fireEvent.click(getByText("Delete"));
    expect(queryByText("Are you sure?")).toBeTruthy();
    fireEvent.click(getByText("Ok"));
    await waitForElementToBeRemoved(() => queryByText("Are you sure?"));
    expect(deleteConfirmed).toHaveBeenCalled();
    expect(deleteCancelled).not.toHaveBeenCalled();
  });

  test("rejects the promise on cancel", async () => {
    const { getByText, queryByText } = render(<TestComponent />);
    expect(queryByText("Are you sure?")).toBeFalsy();
    fireEvent.click(getByText("Delete"));
    expect(queryByText("Are you sure?")).toBeTruthy();
    fireEvent.click(getByText("Cancel"));
    await waitForElementToBeRemoved(() => queryByText("Are you sure?"));
    expect(deleteConfirmed).not.toHaveBeenCalled();
    expect(deleteCancelled).toHaveBeenCalled();
  });

  describe("options", () => {
    test("accepts custom text", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            title: "Remove this item?",
            description: "This will permanently remove the item.",
            cancellationText: "No way",
            confirmationText: "Yessir",
          }}
        />
      );
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Remove this item?")).toBeTruthy();
      expect(
        queryByText("This will permanently remove the item.")
      ).toBeTruthy();
      expect(queryByText("No way")).toBeTruthy();
      expect(queryByText("Yessir")).toBeTruthy();
    });

    test("accepts custom content", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            content: <div>Arbitrary content</div>,
          }}
        />
      );
      fireEvent.click(getByText("Delete"));
      expect(queryByText("Arbitrary content")).toBeTruthy();
    });
  });

  test("honours default options passed to the provider", () => {
    const { getByText, queryByText } = render(
      <ConfirmProvider
        defaultOptions={{
          confirmationText: "Yessir",
          cancellationText: "No way",
        }}
      >
        <DeleteButton confirmOptions={{ cancellationText: "Nope" }} />
      </ConfirmProvider>
    );
    fireEvent.click(getByText("Delete"));
    expect(queryByText("Yessir")).toBeTruthy();
    expect(queryByText("Nope")).toBeTruthy();
  });

  test("merges default options with local options in a deep manner", () => {
    const { getByText } = render(
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { "aria-label": "Confirm" },
        }}
      >
        <DeleteButton
          confirmOptions={{
            confirmationText: "Yes",
            confirmationButtonProps: { disabled: true },
          }}
        />
      </ConfirmProvider>
    );
    fireEvent.click(getByText("Delete"));
    const button = getByText("Yes");
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-label")).toEqual("Confirm");
  });

  test("respects updates to default options", () => {
    function App() {
      const [confirmationText, setConfirmationText] = useState("Yes");

      return (
        <ConfirmProvider defaultOptions={{ confirmationText }}>
          <DeleteButton />
          <button onClick={() => setConfirmationText("Ok")}>Change text</button>
        </ConfirmProvider>
      );
    }

    const { getByText, queryByText } = render(<App />);

    fireEvent.click(getByText("Delete"));

    expect(getByText("Yes")).toBeTruthy();
    expect(queryByText("Ok")).toBeFalsy();

    fireEvent.click(getByText("Change text"));

    expect(queryByText("Yes")).toBeFalsy();
    expect(getByText("Ok")).toBeTruthy();
  });

  describe("confirmation keyword", () => {
    test("renders textfield when confirmation keyword is set", () => {
      const { getByText, getAllByText } = render(
        <TestComponent
          confirmOptions={{
            confirmationKeyword: "DELETE",
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      const textfield = getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )[0];

      const confirmationButton = getByText("Ok");

      expect(textfield).toBeTruthy();

      expect(confirmationButton.disabled).toBe(true);

      fireEvent.change(textfield, { target: { value: "DELETE" } });

      expect(confirmationButton.disabled).toBe(false);
    });

    test("resets the input value on every open", () => {
      const { getByText, getAllByText } = render(
        <TestComponent
          confirmOptions={{
            confirmationKeyword: "DELETE",
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      let textfield = getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )[0];

      expect(textfield).toBeTruthy();
      fireEvent.change(textfield, { target: { value: "DELETE" } });

      fireEvent.click(getByText("Ok"));

      fireEvent.click(getByText("Delete"));

      textfield = getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )[0];

      expect(textfield.value).toEqual("");
    });
  });

  test("renders textfield with custom props", () => {
    const { getByText, queryByPlaceholderText } = render(
      <TestComponent
        confirmOptions={{
          confirmationKeyword: "DELETE",
          confirmationKeywordTextFieldProps: {
            placeholder: "Custom placeholder",
          },
        }}
      />
    );

    fireEvent.click(getByText("Delete"));

    const textfield = queryByPlaceholderText("Custom placeholder");

    expect(textfield).toBeTruthy();
  });

  describe("hide cancel button", () => {
    test("renders cancel button when hideCancelButton is false", () => {
      const { getByText } = render(
        <TestComponent
          confirmOptions={{
            hideCancelButton: false,
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      const cancelButton = getByText("Cancel");

      expect(cancelButton).toBeTruthy();
    });

    test("does not render cancel button when hideCancelButton is true", () => {
      const { getByText, queryByText } = render(
        <TestComponent
          confirmOptions={{
            hideCancelButton: true,
          }}
        />
      );

      fireEvent.click(getByText("Delete"));

      const cancelButton = queryByText("Cancel");

      expect(cancelButton).toBeFalsy();
    });
  });
});
