import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  products: any[] = [];
  displayedColumns = ['name', 'serialNumber', 'price', 'stockQuantity', 'items'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.get('/product')
      .subscribe((res: any) => {
        this.products = res;
      });
  }
}
