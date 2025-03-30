import {Product} from "../../models/product.ts";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
interface Props {
    product: Product
}
export default function ProductCard({product}: Props) {
    const extractImageName = (item: Product): string | null => {
        if (item != null && item.imageUrl != null) {
            const part = item.imageUrl.split('/');
            if (part.length > 0) {
                return part[part.length - 1];
            }
        }
        return null;
    }

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'USD'
        }).format(price);
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
                <Button size="small" component={Link} to={`/store/${product.id}`}>Add to cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    )
}