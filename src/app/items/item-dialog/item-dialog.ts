import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule  } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.html',
  styleUrls: ['./item-dialog.scss'],
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
]
})
export class ItemDialog {

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<ItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || '', Validators.required],
      altName: [data?.altName || ''],
      serialNumber: [data?.serialNumber || '', Validators.required],
      price: [data?.price || '', Validators.required],
      weight: [data?.weight || ''],
      supplierId: [data?.supplierId || '', Validators.required]
    });
  }

  save() {
    if (this.itemForm.valid) {
      this.dialog.close(this.itemForm.value);
    }
  }

  close() {
    this.dialog.close(null);
  }
}
