import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, setCategory, resetProducts } from '../slices/productSlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const selectedCategory = useSelector((state) => state.products.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoriesArray = Object.values(categories);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(resetProducts()); // Reset products on category change
  };

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        <li onClick={() => handleCategoryClick('')}>All</li>
        {categoriesArray.map((category) => (
          <li
            key={category.slug}
            onClick={() => handleCategoryClick(category)}
           // style={{ fontWeight: category === selectedCategory ? 'bold' : 'normal' }}
          >
            <option >{category.slug}</option>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
