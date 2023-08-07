import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { CommonInfo } from "../../models/CommonInfo"
import categories from "../../config/categories.json"
import { useRef, useState } from "react"
import { Product } from "../../models/Product"
import { isDisabled } from "@testing-library/user-event/dist/utils"
import { CarForm } from "./CarForm"
import { ElectronicsForm } from "./ElectronicsForm"
import { HouseForm } from "./HouseForm"

type Props = {
  submitFn: (commonInfo: CommonInfo, productUpdated?: Product) => Promise<void>
  productUpdated?: Product,
}

export const CommonForm: React.FC<Props> = ({submitFn, productUpdated}) =>{
  const categoriesList = categories.categories;
  const initialCommonInfo: CommonInfo = !productUpdated? {category: '', name: '', price: 0}:
   {category: productUpdated.category,  name: productUpdated.name, price: productUpdated.price} ; 
  const [commonInfo, setInfo] = useState<CommonInfo>(initialCommonInfo);
  const[nameErrorMessage, setNameErrMessage] = useState('');
  const[categoryErrorMessage, setCategoryErrMessage] = useState('');
  const[priceErrorMessage, setPriceErrMessage] = useState('');
  const category = useRef<string>('')
  const[nextOpen, setNext] = useState(false);

  function handlerName(event: any) {
    setNameErrMessage('');
    const name = event.target.value;
    const infoCopy = { ...commonInfo };
    infoCopy.name = name;
    setInfo(infoCopy);
  }

  function handlerPrice(event: any) {
    setPriceErrMessage('');
    const price = event.target.value;
    const infoCopy = { ...commonInfo};
    infoCopy.price = price;
    setInfo(infoCopy);
  }

  function handlerCategory(event: any) {
    setCategoryErrMessage('');
    const categoryInput = event.target.value;
    const infoCopy = { ...commonInfo};
    infoCopy.category = categoryInput;
    category.current = categoryInput;
    setInfo(infoCopy);
  }

  async function onSubmitFn(event: any) {
    event.preventDefault();
    if (!commonInfo.category) {
      setCategoryErrMessage('Please select category')
    } else if(!commonInfo.name){
      setNameErrMessage("Please enter name")
    } else if(!commonInfo.price){
      setPriceErrMessage("Please enter price")
    }
    else {
      setNext(true)
  }
  }

  function onResetFn(event: any) {
    setInfo( initialCommonInfo);
  }

  function close(event: any){
    setNext(false)
    onResetFn(event)
  }

  function getNext() {
    switch(commonInfo.category){
      case 'car': return <CarForm commoInfo={commonInfo} submitFn={submitFn} 
      productUpdated={productUpdated} closeFn = {close} />
      case 'electronics': return <ElectronicsForm commonInfo={commonInfo} 
        submitFn={submitFn} productUpdated={productUpdated} closeFn = {close}></ElectronicsForm>
      case 'house': return <HouseForm commonInfo={commonInfo} submitFn={submitFn} 
      productUpdated={productUpdated} closeFn = {close}></HouseForm>
      
    }
  }
  
  return <Box sx={{ mt:10}}>
  <form onSubmit={onSubmitFn}>
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={8} sm={5} >
        <FormControl fullWidth required>
          <InputLabel id="select-category-id">Category</InputLabel>
          <Select labelId="select-category-id" label="Category"
            disabled = {!!productUpdated}
            value={commonInfo.category} onChange={handlerCategory}
            >
            <MenuItem value=''>None</MenuItem>
            {categoriesList.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8} sm={5} >
        <TextField type="text" required fullWidth label="Product name"
          helperText="enter Product name" onChange={handlerName}
          value={commonInfo.name} />
      </Grid>
      <Grid item xs={8} sm={5} >
        <TextField type="number" required fullWidth label="Price"
          helperText="Enter Price" onChange={handlerPrice}
          value={commonInfo.price} />
      </Grid>
    
      </Grid>
      <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
       {!nextOpen&& <Button type="submit" >Next</Button>}
      </Box>

      </form>
      {nextOpen && getNext()}
      </Box>
}