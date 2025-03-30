import {Product} from "../../models/product.ts";
import {Grid} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

interface Props{
    products: Product[]
}
const ProductList = ({products}: Props) => {
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid size={{ xs: 2, sm: 4, md: 4 }} key={product.id}>
                    <ProductCard product={product} />
                </Grid>))
            }
        </Grid>
    );
}

export default ProductList;