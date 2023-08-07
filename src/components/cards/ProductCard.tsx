import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Product } from "../../models/Product";
type Props = {
    product: Product;
    actionFn: (isDelete: boolean) => void
}
const ProductCard: React.FC<Props> = ({product, actionFn}) => {

  function getData(product: Product){
    return product.data.replaceAll('"', '').replaceAll(',', ',\n').replaceAll('{', '')
      .replace('}', '').replaceAll(':', ': ');
  }
      return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent> 
          <Typography variant="h4" ml={7} mb={3}>
                  Product Info
              </Typography>
          <Typography variant="h5" ml={7} mb={3}>
                   id: {product.id}
              </Typography>
              <Typography variant="h5" ml={7} >
                   name: {product.name}
              </Typography>
              <Typography variant="h5" ml={7} my={3}>
                   category: {product.category}
              </Typography>
              {product.data && <Typography variant="h5" ml={7} >
                   info: {getData(product)}
              </Typography>}

          </CardContent>
         <CardActions>
            <Button size="small"onClick={() =>actionFn(false) }>Update</Button>
            <Button size="small" onClick={() =>actionFn(true)}>Delete</Button>
          </CardActions>
        </Card>
      );
    }
    export default ProductCard;