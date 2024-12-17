import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import CurrencyConverter from "@/modules/CurrencyConverter/CurrencyConverter";
import { renderWithQueryClient } from "@/test-helpers/renderWrapper";

describe("CurrencyConverter", () => {
  it("renders correctly and fetches currencies", async () => {
    renderWithQueryClient(<CurrencyConverter />);

    // Verify the main title is visible immediately
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("converts currency successfully", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<CurrencyConverter />);

    // Wait for currencies to load
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Open the 'From Currency' dropdown
    const fromCurrencyDropdown = screen.getAllByRole("combobox")[0];
    await user.click(fromCurrencyDropdown);

    // Select 'US Dollar'
    const usdOption = screen.getByText(/US Dollar/i);
    await user.click(usdOption);

    // Assert the selected value
    expect(fromCurrencyDropdown).toHaveTextContent(/US Dollar/i);

    // Open the 'To Currency' dropdown
    const toCurrencyDropdown = screen.getAllByRole("combobox")[1]; // Second dropdown
    await user.click(toCurrencyDropdown);

    // Select 'Euro'
    const euroOption = screen.getByText(/Euro/i);
    await user.click(euroOption);

    // Assert the selected value
    expect(toCurrencyDropdown).toHaveTextContent(/Euro/i);

    // Enter amount
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    await user.clear(amountInput);
    await user.type(amountInput, "100");

    expect(amountInput).toHaveValue(100);

    // Trigger conversion
    const convertButton = await screen.findByRole('button', { name: 'Convert' });
    fireEvent.click(convertButton);

    // Wait for the conversion result
    await waitFor(() => {
      expect(screen.getByText(/Converted from USD to EUR/i)).toBeInTheDocument();
      expect(screen.getByText(/95\.16/)).toBeInTheDocument();
    });
  });

  it("currencies can be swapped", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<CurrencyConverter />);

    // Wait for currencies to load
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Open the 'From Currency' dropdown
    const fromCurrencyDropdown = screen.getAllByRole("combobox")[0];
    await user.click(fromCurrencyDropdown);

    // Select 'US Dollar'
    const usdOption = screen.getByText(/US Dollar/i);
    await user.click(usdOption);

    // Open the 'To Currency' dropdown
    const toCurrencyDropdown = screen.getAllByRole("combobox")[1];
    await user.click(toCurrencyDropdown);

    // Select 'Euro'
    const euroOption = screen.getByText(/Euro/i);
    await user.click(euroOption);

    const swapButton = screen.getByTestId("currency-swap");
    await user.click(swapButton);
    
    // Assert the from value
    expect(fromCurrencyDropdown).toHaveTextContent(/Euro/i);

    // Assert the to value
    expect(toCurrencyDropdown).toHaveTextContent(/US Dollar/i);


  });

  it("error is displayed if API returns error", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<CurrencyConverter />);

    // Wait for currencies to load
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Open the 'From Currency' dropdown
    const fromCurrencyDropdown = screen.getAllByRole("combobox")[0];
    await user.click(fromCurrencyDropdown);

    // Select option
    const errorOption = screen.getByText(/Afghani/i);
    await user.click(errorOption);

    // Open the 'To Currency' dropdown
    const toCurrencyDropdown = screen.getAllByRole("combobox")[1];
    await user.click(toCurrencyDropdown);

    // Select 'Euro'
    const euroOption = screen.getByText(/Euro/i);
    await user.click(euroOption);

    expect(toCurrencyDropdown).toHaveTextContent(/Euro/i);

    // Enter amount
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    await user.clear(amountInput);
    await user.type(amountInput, "100");

    expect(amountInput).toHaveValue(100);

    // Trigger conversion
    const convertButton = await screen.findByRole('button', { name: /Convert/i });
    await user.click(convertButton);
    
    // Ensure error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Oh dear!/)).toBeInTheDocument();
    });

    // Optional: Debug the DOM if test fails
    screen.debug();
  });
});

