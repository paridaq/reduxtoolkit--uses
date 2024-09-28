import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch, resetProducts } from '../slices/productSlice';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearch(searchInput));
    dispatch(resetProducts()); // Reset products when searching
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
