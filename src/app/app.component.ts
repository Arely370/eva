import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibroComponent } from './pages/libro/libro.component';
import { MenuComponent } from "./pages/menu/menu.component";
import { ProductoComponent } from './pages/producto/producto.component';
import { LegionComponent } from './pages/legion/legion.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LibroComponent, ProductoComponent, LegionComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ejemplo2';
}
