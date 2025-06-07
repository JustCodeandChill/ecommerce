import {useEffect, useState} from "react";
import {Product} from "../../models/product.ts";
import ProductList from "./ProductList.tsx";
import agents from "../../api/agents.ts";
import Spinner from "../../layouts/Spinner.tsx";
import {Grid, Paper, TextField} from "@mui/material";

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
    if (loading) return <Spinner message={"Loading list of products"} />
    return (
        <Grid container spacing={4}>
            <Grid size={3}>
                <Paper sx={{mb:2}}>
                    <TextField
                        label="Search products"
                        variant="outlined"
                        fullWidth
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Trigger search action
                                // loadProducts(selectedSort, searchTerm); // Pass the search term to loadProducts
                            }
                        }}
                    />
                </Paper>
            </Grid>
            <Grid size={9}>
                <ProductList products={products} />
            </Grid>

        </Grid>
    )
}

export default Catalog;