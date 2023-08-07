import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { restService } from "../../config/serviceConfig";
import ProductTable from "../tables/ProductTable";
import categories from "../../config/categories.json"

const CategoriesPage: React.FC = () => {
  const [products, setProd]  = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');


  function handlerCategory(event: any){
    const categoryInput = event?.target.value;
    setCategory(categoryInput);
  }

  function getByPrice(){
    restService.getByCategory(category).then(productsArr => {
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
          <FormControl fullWidth required>
          <InputLabel id="select-category-id">Category</InputLabel>
          <Select labelId="select-category-id" label="Category"
            value={category} onChange={handlerCategory}
            >
            <MenuItem value=''>None</MenuItem>
            {categories.categories.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
          </Select>
        </FormControl>
          </Grid>
          <Grid item>
          <Button variant="contained" onClick={getByPrice}>GET</Button>
          </Grid>
        </Grid>
      </Box>
      <Container><ProductTable products={products}></ProductTable></Container>
  </Box>
}

export default CategoriesPage;