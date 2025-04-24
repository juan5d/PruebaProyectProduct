import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-producto-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './producto-formulario.component.html'
})
export class ProductoFormularioComponent {
  @Input() producto: Producto = { nombre: '', precio: 0, descripcion: '' };
  @Output() guardar = new EventEmitter<Producto>();
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: [''],
      precio: [0],
      descripcion: ['']
    });
  }

  ngOnChanges() {
    this.formulario.patchValue(this.producto);
  }

  submit() {
    this.guardar.emit(this.formulario.value);
    this.formulario.reset({ nombre: '', precio: 0, descripcion: '' });
  }
}
