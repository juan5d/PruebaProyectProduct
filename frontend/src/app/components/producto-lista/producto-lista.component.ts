import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto, ProductoService } from '../../services/producto.service';
import { ProductoFormularioComponent } from '../producto-formulario/producto-formulario.component';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule, ProductoFormularioComponent],
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

  productoSeleccionado: Producto = { nombre: '', precio: 0, descripcion: '' };

editar(p: Producto) {
  this.productoSeleccionado = { ...p };
}

guardarProducto(p: Producto) {
  if (this.productoSeleccionado.id) {
    this.productoService.updateProducto(this.productoSeleccionado.id, p).subscribe(() => {
      this.cargarProductos();
      this.productoSeleccionado = { nombre: '', precio: 0, descripcion: '' };
    });
  } else {
    this.productoService.crearProducto(p).subscribe(() => {
      this.cargarProductos();
    });
  }
}

eliminar(p: Producto) {
  if (p.id) {
    this.productoService.eliminarProducto(p.id).subscribe(() => {
      this.cargarProductos();
    });
  }
}

cargarProductos() {
  this.productoService.getProductos().subscribe(data => {
    this.productos = data;
  });
}

}
