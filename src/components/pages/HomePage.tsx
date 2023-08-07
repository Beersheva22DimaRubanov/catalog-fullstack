import { Container, Typography } from "@mui/material"
import ProductTable from "../tables/ProductTable"
import { Product } from "../../models/Product"
import { restService } from "../../config/serviceConfig"
import { useEffect, useState } from "react"
import { Subscription } from "rxjs"

const HomePage: React.FC = ()=> {
  const [announcements, setAnnouncements] = useState<Product[]>([]);
  useEffect(() => {
      const subscription: Subscription = restService.getAllAnnouncement()
          .subscribe({
              next(products: Product[] | string) {
                  let errorMessage: string = '';
                  if (typeof products === 'string') {
                      errorMessage = products;
                  } else {
                      setAnnouncements(products);
                  }
                  // dispatch(errorMessage, '');

              }
          });
      return () => subscription.unsubscribe();
  }, []);
  

  return <Container>
  <Typography variant="h2" align="center">All Announcements</Typography>
  <ProductTable products={announcements}></ProductTable>
  </Container>
}

export default HomePage;