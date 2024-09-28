import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, loadMore } from '../slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, category, limit, skip, search, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ category, limit, skip, search }));
  }, [dispatch, category, skip, search,]);

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load products</p>;

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default ProductList;
