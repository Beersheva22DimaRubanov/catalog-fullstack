import React, { useRef, useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert } from '@mui/material';
import { Product } from "../../models/Product";
import { CommonInfo } from "../../models/CommonInfo";
import categories from "../../config/categories.json"

type Props = {
  submitFn: (product: Product) => Promise<void>,
  productUpdated?: Product,
  commoInfo: CommonInfo,
  closeFn: (event: any) => void
}
const initialProduct: Product = {
  id: '0',  category: '', name: '', price: 0 , data: {
    brand: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
  }
};
export const CarForm: React.FC<Props> = ({ submitFn, productUpdated, commoInfo, closeFn}) => {
  const [product, setProduct] = useState<Product>(getProductUpdate());
  const [errorMessage, setErrorMessage] = useState('');


  function getProductUpdate(): Product {
    let res;
    if(productUpdated){
      res = {...productUpdated!, data: JSON.parse(productUpdated?.data)}
    } else{
      res = initialProduct
    }
    return res;
  }


  function handlerBrand(event: any) {
    const brand = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.brand = brand;
    productCopy.data = data;
    setProduct(productCopy);
  }
  function handlerModel(event: any) {
    const model = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.model = model;
    productCopy.data = data;
    setProduct(productCopy);
  }
  function handlerYear(event: any) {
    setErrorMessage('');
    const year = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.year= year;
    productCopy.data = data;
    setProduct(productCopy);
  }

  function handlerColor(event: any) {
    setErrorMessage('');
    const color = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.color = color;
    productCopy.data = data;
    setProduct(productCopy);
  }

  function handlerMileage(event: any) {
    setErrorMessage('');
    const mileage = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.mileage = mileage;
    productCopy.data = data;
    setProduct(productCopy);
  }

  async function onSubmitFn(event: any) {
    event.preventDefault();
    console.log('Car: ' + product.data.brand)
    product.category = commoInfo.category;
    product.name = commoInfo.name;
    product.price = commoInfo.price;
    await submitFn(product);
    event.target.reset();
    closeFn(event)
  }
  function onResetFn(event: any) {
    setProduct(productUpdated || initialProduct);
  }

  return <Box sx={{ mt: 10}}>
    <form onSubmit={onSubmitFn} onReset={onResetFn}>
      <Grid container spacing={4} justifyContent="center">
    
        <Grid item xs={8} sm={4} md={5} >
          <TextField label="brand" fullWidth required
            onChange={handlerBrand}
            value={product.data.brand || ''}
            helperText={`enter brand`}
          />
        </Grid>
        <Grid item xs={8} sm={4} md={5} >
          <TextField label="model" fullWidth required
            onChange={handlerModel}
            value={product.data.model || ''}
            helperText={`enter model`}
          />
        </Grid>
        <Grid item xs={8} sm={4} md={5} >
          <TextField label="Year" fullWidth required
            onChange={handlerYear}
            value={product.data.year || ''}
            helperText={`enter year`}
          />
        </Grid>
        <Grid item xs={8} sm={4} md={5} >
          <TextField label="color" fullWidth required
            onChange={handlerColor}
            value={product.data.color || ''}
            helperText={`enter color`}
          />
        </Grid>
        <Grid item xs={8} sm={4} md={5} >
          <TextField label="mileage" fullWidth required
            onChange={handlerMileage}
            value={product.data.mileage || ''}
            helperText={`enter mileage`}
          />
        </Grid>
        {/* <FormControl fullWidth required>
          <InputLabel id="select-type-id">Type</InputLabel>
          <Select labelId="select-type-id" label="Type"
            value={product.data.get('type')} onChange={handlerType}>
            <MenuItem value=''>None</MenuItem>
            {houseTypes.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
          </Select>
        </FormControl> */}
        {/* <Grid item xs={8} sm={4} md={5}>
          <FormControl required error={!!errorMessage}>
            <FormLabel id="dealType-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="dealType-group-label"
              defaultValue=""
              value={product.data.get('dealType') || ''}
              name="radio-buttons-group"
              row onChange={handlerDealType}
            >
              <FormControlLabel value="sale" control={<Radio />} label="Sale" />
              <FormControlLabel value="rent" control={<Radio />} label="Rent" />
              <FormHelperText>{errorMessage}</FormHelperText>
            </RadioGroup>
          </FormControl>
        </Grid> */}
      </Grid>

      <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
        <Button type="submit" >Submit</Button>
        <Button type="reset">Reset</Button>
      </Box>
    </form>
  </Box>
}