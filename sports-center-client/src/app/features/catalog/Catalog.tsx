import {useEffect, useState} from "react";
import {Product} from "../../models/product.ts";
import ProductList from "./ProductList.tsx";
import agents from "../../api/agents.ts";
import Spinner from "../../layouts/Spinner.tsx";
import {FormControl, FormLabel, Grid, Paper, RadioGroup, TextField} from "@mui/material";
import Brand from "../../models/brand.ts";
import Type from "../../models/type.ts";

const Catalog = ()=> {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [brands, setBrands] = useState<Brand[]>();
    const [types, setTypes] = useState<Type[]>();
    const [selectedSort, setSelectedSort] = useState<string>('asc');
    const [selectedBrand, setSelectedBrand] = useState<string>('All');
    const [selectedType, setSelectedType] = useState<string>("All");
    const [selectedBrandId, setSelectedBrandId] = useState<string | number>(0);
    const [selectedBrandId, setSelectedTypeId] = useState<string | number>(0);

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
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormControl>
                        <FormLabel id="sort-by-name-label">Sort by Name</FormLabel>
                        <RadioGroup
                            aria-label="sort-by-name"
                            name="sort-by-name"
                            //value={selectedSort}
                            // onChange={handleSortChange}
                        >
                            {/*{sortOptions.map(({ value, label }) => (*/}
                            {/*    <FormControlLabel*/}
                            {/*        key={value}*/}
                            {/*        value={value}*/}
                            {/*        control={<Radio />}*/}
                            {/*        label={label}*/}
                            {/*    />*/}
                            {/*))}*/}
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>
            <Grid size={9}>
                <ProductList products={products} />
            </Grid>

        </Grid>
    )
}

export default Catalog;