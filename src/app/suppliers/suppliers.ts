import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.scss',
})
export class Suppliers {

  suppliers: any[] = [];
  displayedColumns = ['name', 'altName', 'shopLink'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.api.get('/supplier')
      .subscribe((res: any) => {
        console.log("SUPPLIER API RESPONSE:", res);
        this.suppliers = res;
      });
  }
}
