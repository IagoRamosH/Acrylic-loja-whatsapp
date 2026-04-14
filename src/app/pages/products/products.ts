import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'Oculos Elegance',
      price: 199.9,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      description: 'Modelo sofisticado com acabamento moderno.',
      badge: 'Mais procurado'
    },
    {
      id: 2,
      name: 'Oculos Vision',
      price: 249.9,
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
      description: 'Leve, elegante e ideal para o dia a dia.',
      badge: 'Conforto premium'
    },
    {
      id: 3,
      name: 'Oculos Premium',
      price: 289.9,
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      description: 'Design premium com visual refinado.',
      badge: 'Edicao destaque'
    },
    {
      id: 4,
      name: 'Oculos Urban',
      price: 179.9,
      image: 'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=800&q=80',
      description: 'Estilo urbano com toque minimalista.',
      badge: 'Entrada elegante'
    }
  ];
}
