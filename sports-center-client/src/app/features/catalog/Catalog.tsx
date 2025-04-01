import {useEffect, useState} from "react";
import {Product} from "../../models/product.ts";
import ProductList from "./ProductList.tsx";
import agents from "../../api/agents.ts";

const Catalog = ()=> {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        agents.Store.list()
            .then((products) => setProducts(products.content))
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if (!products) return <h3>No Product to show</h3>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;