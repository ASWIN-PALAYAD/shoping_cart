import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList:any=[]
  public productLlist=new BehaviorSubject<any>([]);

  constructor() { }

  getProduct(){
    return this.productLlist.asObservable();
  }

  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productLlist.next(product);
  }

  addtoCart(product:any){
    this.cartItemList.push(product);
    this.productLlist.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
    
  }
  getTotalPrice() : number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal+=a.total;
    })
    return grandTotal;
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id==a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productLlist.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList=[]
    this.productLlist.next(this.cartItemList);
  }
}
