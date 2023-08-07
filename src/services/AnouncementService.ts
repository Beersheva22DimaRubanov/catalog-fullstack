import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { error } from "console";

const POLLER_INTERVAL = 3000;
class Cache {
  cacheString: string = '';
  set(products: Product[]): void {
    this.cacheString = JSON.stringify(products);
  }
  reset() {
    this.cacheString = ''
  }
  isEqual(products: Product[]): boolean {
    return this.cacheString === JSON.stringify(products)
  }
  getCache(): Product[] {
    return !this.isEmpty() ? JSON.parse(this.cacheString) : []
  }
  isEmpty(): boolean {
    return this.cacheString.length === 0;
  }
}

export default class AnouncementService {
  private observable: Observable<Product[] | string> | null = null;
  private cache: Cache = new Cache();
  constructor(private url: string) { };

  private async fetchFunction(url: string, options: RequestInit, product?: Product) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw response.statusText
    }
    return response.json();
  }

  getAllAnnouncement(): Observable<Product[] | string> {
    let intervalId: any;
    if (!this.observable) {
      this.observable = new Observable<Product[] | string>(subscriber => {
        this.cache.reset();
        const sibscriberNext = () => {
          this.fetchFunction(this.url, { method: 'GET' }).then(products => {
            if (this.cache.isEmpty() || !this.cache.isEqual(products as Product[])) {
              this.cache.set(products as Product[]);
              subscriber.next(products);
            }

          })
            .catch(error => subscriber.next(error));
        };
        intervalId = setInterval(() => sibscriberNext(), POLLER_INTERVAL);
        return () => clearInterval(intervalId)
      })
    }
    return this.observable;
  }

  async add(product: Product): Promise<Product> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, data: JSON.stringify(product.data) })
    })
    return await response.json();
  }

  async getByCategory(category: string){
    const url = this.url + '/category/' + category;
    const data: Product[] =  await this.fetchFunction(url, {method: 'GET'})
    console.log('GET: ' + data[0].data?.brand)
    return data;
  }

  async getByPrice(price: number){
    const url = this.url + '/price/' + price;
    return await this.fetchFunction(url, {method: 'GET'});
  }
  
  async getById(id: any){
    const url = this.url + '/id/' + id;
    return await this.fetchFunction(url, {method: 'GET'});
  }
  
  async updateById(id: any, product: Product){
    const url = this.url + '/id/' + id;
    const response = await fetch(url, {
      method: 'PUT',
      headers:  { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, data: JSON.stringify(product.data) })
    })
    return await response.json();

  }

  async deleteById(id: any){
    const url = this.url + '/id/' + id;
    try{
      const res = await this.fetchFunction(url, {method: 'GET'})
      await this.fetchFunction(url, {method: 'DELETE'})
    } catch( error: any){
      throw error;
    }
  }
}