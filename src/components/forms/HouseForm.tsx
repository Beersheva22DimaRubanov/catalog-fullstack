import React, { useRef, useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert } from '@mui/material';
import { Product } from "../../models/Product";
import { CommonInfo } from "../../models/CommonInfo";
type Props = {
  submitFn: (product: Product) => Promise<void>,
  productUpdated?: Product,
  commonInfo: CommonInfo,
  closeFn: (event: any) => void

}
const initialProduct: Product = {
  id: '0',  category: '', name: '', price: 0, data:{
    type: '',
    deal: '',
    area: ''
  }
};
export const HouseForm: React.FC<Props> = ({ submitFn, productUpdated, commonInfo, closeFn }) => {
  const houseTypes = ['flat', 'villa', 'townhouse']
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


  function handlerType(event: any) {
    const type = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.type = type;
    productCopy.data = data;
    setProduct(productCopy);
  }
  function handlerDealType(event: any) {
    const dealType = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.deal = dealType;
    productCopy.data = data;
    setProduct(productCopy);
  }
  function handlerArea(event: any) {
    setErrorMessage('');
    const area = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.area = area;
    productCopy.data = data;
    setProduct(productCopy);
  }
  async function onSubmitFn(event: any) {
    event.preventDefault();
    product.category = commonInfo.category;
    product.name = commonInfo.name;
    product.price = commonInfo.price;
    await submitFn(product);
    event.target.reset()
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
          <TextField label="area" fullWidth required
             onChange={handlerArea}
            value={product?.data.area? product.data.area : ''}
            helperText={`enter area`}
          />
        </Grid>
        <Grid item xs={8} sm={4} md={5}>
        <FormControl fullWidth required>
          <InputLabel id="select-type-id">Type</InputLabel>
          <Select labelId="select-type-id" label="Type"
            value={product.data.type} onChange={handlerType}>
            <MenuItem value=''>None</MenuItem>
            {houseTypes.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={8} sm={4} md={5} alignContent={"center"}>
          <FormControl required error={!!errorMessage}>
            <FormLabel id="dealType-group-label">Deal Type</FormLabel>
            <RadioGroup
              aria-labelledby="dealType-group-label"
              defaultValue=""
              value={product.data.deal || ''}
              name="radio-buttons-group"
              row onChange={handlerDealType}
            >
              <FormControlLabel value="sale" control={<Radio />} label="Sale" />
              <FormControlLabel value="rent" control={<Radio />} label="Rent" />
              <FormHelperText>{errorMessage}</FormHelperText>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
        <Button type="submit" >Submit</Button>
        <Button type="reset">Reset</Button>
      </Box>
    </form>
  </Box>
}