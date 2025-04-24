import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
})
export class ProductoListaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
