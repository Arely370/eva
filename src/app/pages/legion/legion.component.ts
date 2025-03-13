import { Component } from '@angular/core';
import { Legion } from '../../models/legion.model';
import { LegionService } from '../../services/legion.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-legion',
  imports: [FormsModule],
  templateUrl: './legion.component.html',
  styleUrl: './legion.component.css'
})
export class LegionComponent {
  legiones: any;
  legion = new Legion();

  constructor(private legionService: LegionService) {
    this.getLegiones();
  }

  // Método para obtener todos los registros
  async getLegiones(): Promise<void> {
    this.legiones = await firstValueFrom(this.legionService.getLegiones());
  }

  // Método para agregar una nueva entrada
  async agregarLegion(): Promise<void> {
    await this.legionService.agregarLegion(this.legion);
    this.getLegiones();
    this.legion = new Legion();
  }

  // Método para modificar un registro existente
  async modificarLegion(): Promise<void> {
    await this.legionService.modificarLegion(this.legion);
    this.getLegiones();
    this.legion = new Legion();
  }

  // Método para eliminar un registro
  async eliminarLegion(id: string): Promise<void> {
    await this.legionService.eliminarLegion(id);
    this.getLegiones();
  }

  // Método para seleccionar un registro
  seleccionarLegion(legionSeleccionada: Legion): void {
    this.legion = { ...legionSeleccionada };
  }

  // Método para limpiar los campos
  limpiarCampos(): void {
    this.legion = new Legion();
  }
}
