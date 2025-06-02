import {Product} from "../../models/product.ts";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Link} from "react-router-dom";
import {extractImageName, formatPrice} from "../../utilities/productHelper.tsx";
import {useState} from "react";
import {useAppDispatch} from "../../store/configreStore.ts";
import agents from "../../api/agents.ts";
import {setBasket} from "../basket/basketSlice.ts";
interface Props {
    product: Product
}
export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    function addItem(){
        setLoading(true);
        agents.Basket.addItem(product, dispatch)
            .then(response=>{
                console.log('New Basket:', response.basket);
                dispatch(setBasket(response.basket));
            })
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
                        title={product.name}
                        titleTypographyProps={{sx:{fontWeight:'bold', color: 'primary.main' }}}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize:'contain'}}
                image={"/images/products/"+extractImageName(product)}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brandName} / {product.typeName}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={loading}
                    onClick={addItem}
                    size="small"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    Add to cart
                </LoadingButton>
                <Button size="small" component={Link} to={`/store/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}