import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/api';
import { SharedModule } from '../../../shared/shared.module';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-offer-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-offer-form.html'
})
export class ProductOfferForm {

  productOfferForm!: FormGroup;
  title = 'Add Offer';
  editingId: number | null = null;
  products: any[] = [];
  selectedProduct: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {

    // Build form
    this.productOfferForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      sellingPrice: [null, Validators.required],
      targetCAC: [null],
      quantity: [null, Validators.required],
      productId: [null, Validators.required],
    });

    // read ID from URL
    this.editingId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.editingId) {
      forkJoin({
        products: this.api.get('/product'),
        offer: this.api.get(`/offer/${this.editingId}`)
      }).subscribe(({ products, offer }: any) => {

        this.products = Array.isArray(products)
          ? products
          : (products.data ?? products.content ?? products.items ?? []);

        this.productOfferForm.patchValue(offer);

        this.selectedProduct = this.products.filter(
          s => s.id === offer.product.id);
        
        this.title = `Edit ${offer.name}`;
      });
    } else {
      this.title = 'Add Offer';
      this.api.get('/product').subscribe((prod: any) => {
        this.products = Array.isArray(prod)
          ? prod
          : (prod.data ?? prod.content ?? prod.items ?? []);
      });
    }
  }

  save() {
    const payload = this.productOfferForm.value;

    if (this.editingId) {
      this.api.put('/offer', payload).subscribe(() => {
        // this.router.navigate(['/items']); NOT WORKING
      });
    } else {
      this.api.post('/offer', payload).subscribe(() => {
        // this.router.navigate(['/items']); NOT WORKING
      });
    }
    this.router.navigate(['/offers']);
  }

  onProductSelect(event: any) {
    const item = Array.isArray(event) ? event[0] : event;
    if (item && item.id != null) {
      this.productOfferForm.patchValue({ productId: item.id });
    }
  }

  onProductClear() {
    this.productOfferForm.patchValue({ productId: null });
    this.selectedProduct = [];
  }

  ngOnDestroy() {
  }
}
