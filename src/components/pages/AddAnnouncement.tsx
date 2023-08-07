import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { CommonInfo } from "../../models/CommonInfo"
import { CommonForm } from "../forms/CommonForm"
import { Product } from "../../models/Product"
import { generateKeySync } from "crypto"
import { HouseForm } from "../forms/HouseForm"
import { CarForm } from "../forms/CarForm"
import { ElectronicsForm } from "../forms/ElectronicsForm"
import { restService } from "../../config/serviceConfig"

const AddAnnouncement: React.FC = () => {
  async function addProduct(product: Product): Promise<void> {
   const res =  await restService.add(product);
    console.log('Add: product ' + res)
  }

  return <Box>
    <Typography align="center" variant="h2"> Add new Announcement</Typography>
    <CommonForm submitFn={addProduct}></CommonForm> 
  </Box>
}

export default AddAnnouncement;