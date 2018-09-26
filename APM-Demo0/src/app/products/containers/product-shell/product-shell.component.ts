import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../product';
import { ProductService } from '../../product.service';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../../state';
import * as productActions from '../../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    products$: Observable<Product[]>;
    displayCode$: Observable<boolean>;
    selectedProduct$: Observable<Product>;
    componentActive = true;

    // Used to highlight the selected product in the list

    constructor( private store: Store<fromProduct.State>,
                 private productService: ProductService) { }

    ngOnInit(): void {
    this.store.dispatch( new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    }


    checkChanged(value: boolean): void {
      // this.displayCode = value;
      this.store.dispatch(new productActions.ToggleProductCode(value));

      // this.store.dispatch({
      //   type: 'TOGGLE_PRODUCT_CODE',
      //   payload: value
      // });
    }

    newProduct(): void {
      this.store.dispatch( new productActions.InitializeCurrentProduct());
      // this.productService.changeSelectedProduct(this.productService.newProduct());
    }

    productSelected(product: Product): void {
      this.store.dispatch( new productActions.SetCurrentProduct(product));
      // this.productService.changeSelectedProduct(product);
    }
}
