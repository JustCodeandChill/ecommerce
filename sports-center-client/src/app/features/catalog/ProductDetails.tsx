import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product.ts";
import {setupCache} from "axios-cache-interceptor";
import {extractImageName, formatPrice} from "../../utilities/productHelper.tsx";
import agent from "../../api/agents.ts";
import NotFoundError from "../../layouts/NotFoundError.tsx";
import Spinner from "../../layouts/Spinner.tsx";

export default function ProductDetails(){
    const {id} = useParams< {id: string }>();
    console.log("param " + JSON.stringify( useParams()));

    const [product, setProduct] = useState<Product | null>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        id && agent.Store.getProduct(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);
    if (loading) return (<Spinner message={"Loading product"} />)
    if (!product) return (<NotFoundError />)

    return (

        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={"/images/products/"+extractImageName(product)} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography gutterBottom color='secondary' variant="h4">{formatPrice(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.typeName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brandName}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

    )
}