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
  id: '0', category: '', name: '', price: 0 , data: {type: '', condition: ''}
};
export const ElectronicsForm: React.FC<Props> = ({ submitFn, productUpdated, commonInfo, closeFn }) => {
  const types = ['refregirator', 'TV', 'computer', 'phone', 'speaker']
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
  function handlerCondition(event: any) {
    const condition = event.target.value;
    const productCopy = { ...product };
    const data = {...productCopy.data};
    data.condition = condition;
    productCopy.data = data;
    setProduct(productCopy);
  }

  async function onSubmitFn(event: any) {
    event.preventDefault();
    product.category = commonInfo.category;
    product.name = commonInfo.name;
    product.price = commonInfo.price;
    await submitFn(product);
    event.target.reset();
    closeFn(event)
  }
  function onResetFn(event: any) {
    setProduct(productUpdated || initialProduct);
  }

  return <Box sx={{ mt:10 }}>
    <form onSubmit={onSubmitFn} onReset={onResetFn}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={8} sm={4} md={5}>
          <FormControl fullWidth required>
            <InputLabel id="select-type-id">Type</InputLabel>
            <Select labelId="select-type-id" label="Type"
              value={product.data.type} onChange={handlerType}>
              <MenuItem value=''>None</MenuItem>
              {types.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={4} md={5}>
          <FormControl required error={!!errorMessage}>
            <FormLabel id="condition-group-label">Condition</FormLabel>
            <RadioGroup
              aria-labelledby="condition-group-label"
              defaultValue=""
              value={product.data.condition || ''}
              name="radio-buttons-group"
              row onChange={handlerCondition}
            >
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="used" control={<Radio />} label="Used" />
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