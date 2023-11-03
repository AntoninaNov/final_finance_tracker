import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import IncomeAndExpense from '../components/IncomeAndExpense';
import { IncomeDataContextProvider } from '../DataContext/Context';

// Mocking local storage for testing purposes
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock context to wrap the component for context-dependent functionalities
const mockContext = {
    expenseEntries: [],
    incomeEntries: [],
    setExpenseEntries: jest.fn(),
    setIncomeEntries: jest.fn(),
};

describe('<IncomeAndExpense />', () => {
    afterEach(cleanup); // Clean-up after each test

    // Test isValidDate function
    it('validates dates correctly', () => {
        const component = render(
            <IncomeData.Provider value={mockContext}>
                <IncomeAndExpense />
            </IncomeData.Provider>
        );
        const { isValidDate } = component.getByTestId('IncomeAndExpense').props;
        expect(isValidDate('2023-01-01')).toBe(true);
        expect(isValidDate('01/01/2023')).toBe(false); // Incorrect format
        expect(isValidDate('')).toBe(false); // Empty string
        expect(isValidDate('2023-13-01')).toBe(false); // Invalid month
        expect(isValidDate('2023-01-32')).toBe(false); // Invalid day
        expect(isValidDate('future-date')).toBe(false); // Future date check
    });

    // Test isValidAmount function
    it('validates amounts correctly', () => {
        const component = render(
            <IncomeData.Provider value={mockContext}>
                <IncomeAndExpense />
            </IncomeData.Provider>
        );
        const { isValidAmount } = component.getByTestId('IncomeAndExpense').props;
        expect(isValidAmount('100')).toBe(true);
        expect(isValidAmount('-100')).toBe(false); // Negative amount
        expect(isValidAmount('abc')).toBe(false); // Non-numeric value
        expect(isValidAmount('')).toBe(false); // Empty string
        expect(isValidAmount('0')).toBe(false); // Zero amount
    });

    // Test adding new category
    it('adds a new category correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <IncomeData.Provider value={mockContext}>
                <IncomeAndExpense />
            </IncomeData.Provider>
        );

        const newCategoryInput = getByPlaceholderText('Add new category');
        const addCategoryButton = getByText('Add Category');

        fireEvent.change(newCategoryInput, { target: { value: 'NewCategory' } });
        fireEvent.click(addCategoryButton);

        expect(mockContext.setExpenseEntries).toHaveBeenCalledWith([...mockContext.expenseEntries, {
            category: 'NewCategory',
            // other default values set by the component
        }]);
    });

    import { render, screen } from '@testing-library/react';
    import IncomeAndExpense from './IncomeAndExpense';
    import { IncomeDataContextProvider } from '../DataContext/Context';

    test('renders IncomeAndExpense component', () => {
        render(
            <IncomeDataContextProvider>
                <IncomeAndExpense />
            </IncomeDataContextProvider>
        );

        const component = screen.getByTestId('IncomeAndExpense');
        expect(component).toBeInTheDocument();
    });

});
