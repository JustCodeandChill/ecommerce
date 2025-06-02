import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {extractImageNameBasketItem, formatPrice} from "../../utilities/productHelper.tsx";
import {useAppDispatch, useAppSelector} from "../../store/configreStore.ts";
import agents from "../../api/agents.ts";
import {useEffect} from "react";
import {Basket} from "../../models/basket.ts";
import {setBasket} from "./basketSlice.ts";
export default function BasketPage() {
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {Basket : BasketActions} = agents;
    const removeItem = (productId: number) => {
        BasketActions.removeItem(productId, dispatch);
    }
    const decrementItemQuantity = (productId: number, quantity: number = 1) => {
        BasketActions.decrementItemQuantity(productId, quantity, dispatch);
    }

    const incrementItemQuantity = (productId: number, quantity: number = 1) => {
        BasketActions.incrementItemQuantity(productId, quantity, dispatch);
    }

    useEffect(() => {
        function getCurrentBasket() {
            const basket = localStorage.getItem('basket');
            return basket ? JSON.parse(basket) as Basket : null;
        }
        console.log("initial state", basket);
        dispatch(setBasket(getCurrentBasket()));
    }, []);

    if (!basket || basket.items.length === 0)
        return <Typography variant="h1">Your basket is empty" </Typography>
    console.log(basket);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => {
                        return (
                            (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.pictureUrl && (
                                            <img src={"/images/products/"+extractImageNameBasketItem(item)} alt="Product" width="50" height="50" />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{formatPrice(item.price)}</TableCell>
                                    <TableCell>
                                        <IconButton color='error' onClick={() => decrementItemQuantity(item.id)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        {item.quantity}
                                        <IconButton color='error' onClick={() => incrementItemQuantity(item.id)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => removeItem(item.id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}