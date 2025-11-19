import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialog } from './item-dialog/item-dialog';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items {

  items: any[] = [];
  displayedColumns = ['name', 'serialNumber', 'price', 'weight', 'supplier', 'actions'];

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.api.get('/item')
      .subscribe((res: any) => {
        this.items = res;
      });
  }

  openCreateDialog() {
    const ref = this.dialog.open(ItemDialog);

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.api.post('/item', result).subscribe(() => {
          this.loadItems();
        });
      }
    });
  }

  openEditDialog(item: any) {
    const ref = this.dialog.open(ItemDialog, { data: item });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.api.put('/item', result).subscribe(() => {
          this.loadItems();
        });
      }
    });
  }
}
