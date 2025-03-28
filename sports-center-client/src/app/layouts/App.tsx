import {useEffect, useState} from 'react'
import '../styles/App.css'
import {Product} from "../models/product.ts";
// import {Product} from "./app/models/product.ts";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
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
            <ul style={{textAlign: "left"}}>
                {
                    products.map(product => {
                        return <li key={product.id}>
                            <p>Name: {product.name}</p>
                            <p>Price {product.price}</p>
                            <p>Description: {product.description}</p>
                            <p>Brand: {product.brandName}</p>
                            <p>Type: {product.typeName}</p>
                            <p>Image: {product.imageUrl}</p>
                        </li>
                    })
                }
            </ul>
        </div>
    </>
  )
}

export default App
