import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Product 1', sales: 100 },
  { id: 2, name: 'Product 2', sales: 200 },
  { id: 3, name: 'Product 3', sales: 150 },
  { id: 4, name: 'Product 4', sales: 120 },
  { id: 5, name: 'Product 5', sales: 180 },
];

function App() {
  const [topN, setTopN] = useState(3);

  const handleTopNChange = (e) => {
    setTopN(parseInt(e.target.value, 10));
  };

  const topProducts = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, topN);

  return (
    <div className="App">
      <h1>Top Products</h1>
      <label htmlFor="topN">Top N:</label>
      <input
        type="number"
        id="topN"
        value={topN}
        onChange={handleTopNChange}
      />
      <ul>
        {topProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.sales} sales
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
