import {useEffect, useState} from "react";
import {Product} from "../../models/product.ts";
import ProductList from "./ProductList.tsx";
import agents from "../../api/agents.ts";
import Spinner from "../../layouts/Spinner.tsx";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Pagination,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import Brand from "../../models/brand.ts";
import Type from "../../models/type.ts";

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [brands, setBrands] = useState<Brand[]>();
    const [types, setTypes] = useState<Type[]>();
    const [selectedSort, setSelectedSort] = useState<string>('asc');
    const [selectedBrand, setSelectedBrand] = useState<string>('All');
    const [selectedType, setSelectedType] = useState<string>("All");
    const [selectedBrandId, setSelectedBrandId] = useState<string | number>(0);
    const [selectedTypeId, setSelectedTypeId] = useState<string | number>(0);
    const [searchTerm, setSearchTerm] = useState('');
    const sortOptions = [
        {value: 'asc', label: 'Ascending'},
        {value: 'desc', label: 'Descending'}
    ]
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotaItems] = useState(0);

    useEffect(() => {
        Promise.all([
            agents.Store.list(currentPage, pageSize),
            agents.Store.brands(),
            agents.Store.types()
        ]).then(([productsRes, brandsResp, typesResp]) => {
            setProducts(productsRes.content);
            setTotaItems(productsRes.totalElements);
            setBrands(brandsResp);
            setTypes(typesResp);
        })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [currentPage, pageSize]);

    const loadProducts = (selectedSort, searchKeyword = '') => {
        setLoading(true);
        // let page = currentPage -1;
        // let size = pageSize;
        const brandId = selectedBrandId !== 0 ? selectedBrandId : undefined;
        const typeId = selectedTypeId !== 0 ? selectedTypeId : undefined;
        const sort = "name";
        const order = selectedSort === "desc" ? "desc" : "asc";
        //construct the url
        let url = `${agents.Store.apiUrl}?sort=${sort}&order=${order}`;
        if (brandId !== undefined || typeId !== undefined) {
            url += '&';
            if (brandId !== undefined) url += `brandId=${brandId}&`;
            if (typeId !== undefined) url += `typeId=${typeId}&`;
            //Remove trailing &
            url = url.replace(/&$/, "");
        }
        console.log("loading products from url:", url);
        //Make the API request with the url
        if (searchKeyword) {
            console.log(searchKeyword);
            agents.Store.search(searchKeyword)
                .then((productsRes) => {
                    setProducts(productsRes.content);
                    // setTotaItems(productsRes.length);
                })
                .catch((error) => console.error("error loading products", error))
                .finally(() => setLoading(false));
        } else {
            agents.Store.list(currentPage, pageSize, undefined, undefined, url)
                .then((productsRes) => {
                    setProducts(productsRes.content);
                    // setTotaItems(productsRes.totalElements);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }

    useEffect(() => {
        loadProducts(selectedSort);
    }, [selectedBrandId, selectedTypeId, selectedSort]);

    const handleSortChange = (event: any) => {
        const selectedSort = event.target.value;
        setSelectedSort(selectedSort);
    };

    const handleBrandChange = (event: any) => {
        const selectedBrand = event.target.value;
        const brand = brands?.find((b) => b.name === selectedBrand);
        setSelectedBrand(selectedBrand);
        if (brand) {
            setSelectedBrandId(brand.id);
        }
    };

    const handleTypeChange = (event: any) => {
        const selectedType = event.target.value;
        const type = types?.find((t) => t.name === selectedType);
        setSelectedType(selectedType)
        if (type) {
            setSelectedTypeId(type.id);
        }
    };

    function handlePageChange(event: any, page: number) {
        setCurrentPage(page);
    }


    if (!products) return <h3>No Product to show</h3>
    if (loading) return <Spinner message={"Loading list of products"}/>


    return (
        <Grid container spacing={4}>
            <Grid size={{xs: 12}}>
                <Box mb={2} textAlign="center">
                    <Typography variant="subtitle1">
                        Displaying {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
                    </Typography>
                </Box>
                <Box mt={4} display="flex" justifyContent="center">
                    <Pagination count={Math.ceil(totalItems / pageSize)} color="primary" onChange={handlePageChange}
                                page={currentPage}/>
                </Box>
            </Grid>
            <Grid size={{xs: 3}}>
                <Paper sx={{mb: 2}}>
                    <TextField
                        label="Search products"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Trigger search action
                                loadProducts(selectedSort, searchTerm); // Pass the search term to loadProducts
                            }
                        }}
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl>
                        <FormLabel id="sort-by-name-label">Sort by Name</FormLabel>
                        <RadioGroup
                            aria-label="sort-by-name"
                            name="sort-by-name"
                            value={selectedSort}
                            onChange={handleSortChange}
                        >
                            {sortOptions.map(({value, label}) => (
                                <FormControlLabel
                                    key={value}
                                    value={value}
                                    control={<Radio/>}
                                    label={label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl>
                        <FormLabel id="brands-label">Brands</FormLabel>
                        <RadioGroup
                            aria-label="brands"
                            name="brands"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                        >
                            {brands?.map((brand) => (
                                <FormControlLabel
                                    key={brand.id}
                                    value={brand.name}
                                    control={<Radio/>}
                                    label={brand.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl>
                        <FormLabel id="types-label">Types</FormLabel>
                        <RadioGroup
                            aria-label="types"
                            name="types"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            {types?.map((type) => (
                                <FormControlLabel
                                    key={type.id}
                                    value={type.name}
                                    control={<Radio/>}
                                    label={type.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>
            <Grid size={{xs: 9}}>
                <ProductList products={products}/>
            </Grid>
            <Grid size={{xs: 12}}>
                <Box mt={4} display="flex" justifyContent="center">
                    <Pagination count={Math.ceil(totalItems / pageSize)} color="primary" onChange={handlePageChange}
                                page={currentPage}/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Catalog;