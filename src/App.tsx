import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch } from './Types/company';
import { searchCompanies } from './FMAPI/api';
import PortfolioList from './Components/Portfolio/ListPortfolio/PortfolioList';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]); // array state
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]); // never leave state empty
  const [serverError, setServerError] = useState<string | null>(null); // never leave state empty
  const [search, setSearch] = useState<string>(""); // starting value = ""

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
  }; // gets the value from the input

  const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await searchCompanies(search);
      
      // handle type narrowing allows to handle array from search result or an error string from the api
      if(typeof result === "string") {
        setServerError(result);
      } else if(Array.isArray(result.data)) {
        setSearchResult(result.data)
      }
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    //  determine if portfolio already exists
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if(exists) return;

    const updatedPortfolio = [
      ...portfolioValues, e.target[0].value
    ]; // uses the spread operator to create new array in memory with the added portfolio
    setPortfolioValues(updatedPortfolio);
  }

  // filte() creates a brand new array in memory and removes the filtered object
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });

    setPortfolioValues(removed);
  }

  return (
    <div className="App">
      <Navbar />
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
      {serverError && <h1>{serverError}</h1>}
      <PortfolioList portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
    </div>
  );
}

export default App;