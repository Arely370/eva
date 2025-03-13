import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  productos: Producto[] = [];
  producto: Producto = { descripcion: '', precio: 0 };

  constructor(private productoService: ProductoService) {
    this.getProductos();
  }

  async getProductos(): Promise<void> {
    this.productos = await firstValueFrom(
      this.productoService.getProductos()
    ) as Producto[];
  }

  async agregarProducto() {
    await this.productoService.agregarProducto(this.producto);
    await this.getProductos();
    this.producto = { descripcion: '', precio: 0 };
  }

  seleccionarProducto(productoSeleccionado: Producto) {
    this.producto = { ...productoSeleccionado };
  }

  async modificarProducto() {
    if (this.producto.id) {
      await this.productoService.modificarProducto(this.producto);
      await this.getProductos();
      this.producto = { descripcion: '', precio: 0 };
    }
  }

  async eliminarProducto(id: string) {
    await this.productoService.eliminarProducto(id);
    await this.getProductos();
  }
}