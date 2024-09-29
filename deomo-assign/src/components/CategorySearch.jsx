import React ,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {fetchCategories,setCategory,resetProducts} from '../slices/productSlice'
import { fetchProducts } from '../slices/productSlice';
const CategorySearch = () => {
  
 
  
const {products} = useSelector((state)=>state.products)
  const dispatch = useDispatch();
  const categories = useSelector((state)=>state.products.categories)
  const selectedCategory = useSelector((state)=>state.products.category)

  // Fetch categories from the API
  useEffect(() => {
  dispatch(fetchCategories
  )
  }, [dispatch]); // Runs once when the component mounts
  const categoriesArray = Object.values(categories);

  
  
   
  const handleCategoryClick = (category) => {

  dispatch(setCategory(category))
  dispatch(resetProducts())
  };

  return (
    <div>
      <h2>Categories</h2>
      <div>
        {categoriesArray.map((category) => (
          <button key={category.id} onClick={() => handleCategoryClick(category.name)}>
            {category.name} {/* Adjust this based on the API response */}
          </button>
        ))}
      </div>

      <h3>Selected Category: {selectedCategory}</h3>
      <div>
        <h3>Products</h3>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.title}</li> // Adjust based on your product structure
            ))}
          </ul>
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySearch;
