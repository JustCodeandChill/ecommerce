import {useEffect, useState} from "react";
import {Product} from "../../models/product.ts";
import ProductList from "./ProductList.tsx";

const Catalog = ()=> {
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
    }, []);

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;