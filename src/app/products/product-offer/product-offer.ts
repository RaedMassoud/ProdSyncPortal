import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-offer.html'
})
export class ProductOffer {
  
    offers: any[] = [];
    displayedColumns = ['name', 'product', 'quantity', 'sellingPrice', 'targetCAC', 'edit', 'delete'];

    activeTab = 'offers';

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadOffers();
    }

    loadOffers() {
    this.api.get('/offer')
        .subscribe((res: any) => {
        const data = res as any;
        this.offers = Array.isArray(data)
            ? data
            : (data?.data ?? data?.items ?? []);
        });
    }

    goToCreate() {
        this.router.navigate(['/offers/create']);
    }

    goToEdit(offer: any) {
        this.router.navigate(['/offers', offer.id, 'edit']);
    }

    deleteItem(offer: any) {
        if (confirm(`Are you sure you want to delete "${offer.name}"?`)) {
            this.api.delete(`/offer/${offer.id}`).subscribe(() => {
                this.loadOffers();
            });
        }
    }

    goToTab(tab: string) {
    this.activeTab = tab;

    if (tab === 'setup')
      this.router.navigate(['/products']);

    if (tab === 'offers')
      this.router.navigate(['/offers']);
    }

    ngOnDestroy() {
        
    }
}
