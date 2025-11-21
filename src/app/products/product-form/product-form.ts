import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-form.html'
})
export class ProductForm {

  productForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      altName: [''],
      serialNumber: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: [0, Validators.required],
    });
  }

  ngOnInit() {
    // read ID from URL
    this.editingId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.editingId) {
      this.loadProduct(this.editingId);
    }
  }

  loadProduct(id: number) {
    this.api.get(`/product/${id}`).subscribe((p: any) => {
      this.productForm.patchValue(p);
    });
  }

  save() {
    const payload = this.productForm.value;

    if (this.editingId) {
      // UPDATE
      this.api.put('/product', payload).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      // CREATE
      this.api.post('/product', payload).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
