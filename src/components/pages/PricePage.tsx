import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { restService } from "../../config/serviceConfig";
import ProductTable from "../tables/ProductTable";

const PricePage: React.FC = () => {
  const [products, setProd]  = useState<Product[]>([]);
  const [price, setPrice] = useState<number>(0);


  function handlerPrice(event: any){
    const priceInput = event?.target.value;
    setPrice(priceInput);
  }

  function getByPrice(){
    restService.getByPrice(price).then(productsArr => {
          setProd(productsArr)
    })
  }


  return <Box>
    <Typography variant="h5" align="center" my={5}>Enter price to see products with above price</Typography>
      <Box sx={{
        display: 'flex',
        mb: 10
      }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={8} sm={4} md={5} >
          <TextField type="text" required label="Price"
          helperText="enter price" onChange={handlerPrice}
          value={price | 0} />
          </Grid>
          <Grid item>
          <Button variant="contained" onClick={getByPrice}>GET</Button>
          </Grid>
        </Grid>
      </Box>
      <Container><ProductTable products={products}></ProductTable></Container>
  </Box>
}

export default PricePage;