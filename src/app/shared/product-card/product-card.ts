import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() product: any;

  buyOnWhatsApp() {
    const phone = '558394218179';
    const message = `Ola! Tenho interesse no produto ${this.product.name}, no valor de R$ ${this.product.price}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
