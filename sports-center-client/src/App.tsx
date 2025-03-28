import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8081/api/products/all");
            if (!response.ok) {
                throw new Error("Fail to fetch data");
            }
            const data = await response.json();
            setProducts(data.content);

          }catch (e) {
              console.log("error fetching data" + e);
          }
      };
      fetchData();
  }, [])

  return (
    <>
        <div>
            <h1>Sport center</h1>
            <ul>
                {
                    products.map(product => {
                        return <li key={product.id}>
                            <p>Name: {product.name}</p>
                            <p>Price {product.price}</p>
                            <p>Description: {product.description}</p>
                            <p>Brand: {product.brandName}</p>
                            <p>Type: {product.typeName}</p>
                        </li>
                    })
                }
            </ul>
        </div>
    </>
  )
}

export default App
