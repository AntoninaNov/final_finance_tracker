import React, { useState, useEffect, useContext } from 'react';
import { IncomeData } from '../DataContext/Context';

function IncomeAndExpense() {
  const defaultCategories = ['Food', 'Transport', 'Health', 'Salary', 'Investments', 'Salary'];
  const [categories, setCategories] = useState(defaultCategories); // Initialize with default categories
  const { expenseEntries, incomeEntries, setExpenseEntries, setIncomeEntries } =
      useContext(IncomeData);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categoryFeedback, setCategoryFeedback] = useState("");
  const [entryType, setEntryType] = useState("expense");
  const [editIndex, setEditIndex] = useState(-1);
  const [touched, setTouched] = useState(false); // New state for tracking if the form has been touched

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenseEntries');
    const storedIncomes = localStorage.getItem('incomeEntries');

    if (storedExpenses) {
      setExpenseEntries(JSON.parse(storedExpenses));
    }
    if (storedIncomes) {
      setIncomeEntries(JSON.parse(storedIncomes));
    }
  }, []);

  // Save data to localStorage when expenseEntries or incomeEntries change
  useEffect(() => {
    localStorage.setItem('expenseEntries', JSON.stringify(expenseEntries));
  }, [expenseEntries]);

  useEffect(() => {
    localStorage.setItem('incomeEntries', JSON.stringify(incomeEntries));
  }, [incomeEntries]);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);


  const handleDateChange = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    setCategory(event.target.value.trim());
  };

  const handleEntryTypeChange = (event) => {
    event.preventDefault();
    setEntryType(event.target.value);
  };



  const isValidDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(datePattern)) {
      return false;
    }
    const parsedDate = new Date(date);
    return !isNaN(parsedDate) && parsedDate <= new Date();
  };

  const isValidAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
  };

  const isValidCategory = (category) => {
    // Check if the category is not empty
    return category.trim() !== "";
  };


  // Update to handle adding a category and prevent duplicates
  const handleAddCategory = () => {
      const newCategory = document.getElementById('newCategoryInput').value.trim();
      if (!newCategory) {
          setCategoryFeedback("Category cannot be empty.");
          return;
      }
      if (categories.includes(newCategory)) {
          setCategoryFeedback("This category already exists.");
          return;
      }
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setCategoryFeedback("Category added successfully!");
      document.getElementById('newCategoryInput').value = ''; // Clear input after adding
  };

  const handleAddEntry = () => {
    if (
      !isValidDate(date) ||
      !isValidAmount(amount) ||
      !isValidCategory(category)
    ) {
      console.error("Invalid input");
      return;
    }
    const newEntry = { date, amount, category, type: entryType };
    if (editIndex !== -1) {
      const updatedEntries =
        entryType === "expense" ? [...expenseEntries] : [...incomeEntries];
      updatedEntries[editIndex] = newEntry;
      entryType === "expense"
        ? setExpenseEntries(() => updatedEntries)
        : setIncomeEntries(updatedEntries);
      setEditIndex(-1);
    } else {
      entryType === "expense"
        ? setExpenseEntries(() => [...expenseEntries, newEntry])
        : setIncomeEntries([...incomeEntries, newEntry]);
    }

    setDate("");
    setAmount("");
    setCategory("");
    setEntryType("expense");
  };

  const handleEditEntry = (index, type) => {
    const entryToEdit =
      type === "expense" ? expenseEntries[index] : incomeEntries[index];
    setDate(entryToEdit.date);
    setAmount(entryToEdit.amount);
    setCategory(entryToEdit.category);
    setEntryType(entryToEdit.type);
    setEditIndex(index);
  };

  const handleDeleteEntry = (index, type) => {
    const updatedEntries =
      type === "expense"
        ? expenseEntries.filter((item, i) => i !== index)
        : incomeEntries.filter((item, i) => i !== index);
    type === "expense"
      ? setExpenseEntries(updatedEntries)
      : setIncomeEntries(updatedEntries);
  };

  return (
      <div className="container" data-testid="IncomeAndExpense">
        <h2 className="mt-4 mb-4">Expense Tracker</h2>

        <form className="mb-4">
          <div className="form-group">
            <label htmlFor="dateInput">Date:</label>
            <input
                type="date"
                id="dateInput"
                className="form-control"
                value={date}
                onChange={handleDateChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amountInput">Amount:</label>
            <input
                type="text"
                id="amountInput"
                className="form-control"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categorySelect">Category:</label>
            <select
                id="categorySelect"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
            >
              {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
                type="text"
                id="newCategoryInput"
                className="form-control mb-2"
                placeholder="Add new category"
            />
            <button type="button" className="btn btn-secondary" onClick={handleAddCategory}>Add Category</button>
            {categoryFeedback && <div className="feedback">{categoryFeedback}</div>}
          </div>


          <div className="form-group">
            <label htmlFor="entryTypeSelect">Entry Type:</label>
            <select
                id="entryTypeSelect"
                className="form-control"
                value={entryType}
                onChange={handleEntryTypeChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddEntry}
          >
            {editIndex !== -1 ? "Update Entry" : "Add Entry"}
          </button>
        </form>

        {/* Validation error display, only if the form has been touched */}
        {touched && (!isValidDate(date) || !isValidAmount(amount) || !isValidCategory(category)) && (
            <div className="alert alert-danger" role="alert">
              Invalid input. Please check your values.
            </div>
        )}

        <div className="expenseEntries">
          <h3 className="mt-4">Expense Entries:</h3>
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {expenseEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.category}</td>
                    <td>{entry.type}</td>
                    <td>
                      <button className="btn btn-secondary mr-2" onClick={() => handleEditEntry(index, "expense")}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteEntry(index, "expense")}>
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="incomeEntries">
          <h3 className="mt-4">Income Entries:</h3>
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {incomeEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.category}</td>
                    <td>{entry.type}</td>
                    <td>
                      <button className="btn btn-secondary mr-2" onClick={() => handleEditEntry(index, "income")}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteEntry(index, "income")}>
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default IncomeAndExpense;
