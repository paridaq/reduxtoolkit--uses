import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';
import SearchBar from './components/SearchBar';
import CategorySearch from './components/CategorySearch';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Product Store</h1>
        <SearchBar />
        
        <CategoryList/>
      
        <ProductList />
        <CategorySearch/>
      </div>
    </Provider>
  );
};

export default App;
