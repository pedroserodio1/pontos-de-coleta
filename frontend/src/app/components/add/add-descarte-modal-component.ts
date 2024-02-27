
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-add-descarte-modal',
  templateUrl: './add-descarte-modal.component.html', 
  styleUrls: ['./add-descarte-modal.component.scss'],
  imports: [ FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class AddDescarteModalComponent {

  lat!:string
  long!:string
  cep!: string 
  cidade!: string
  rua!: string
  bairro!:string
  numero!:string
  estado!: string
  tipoDescarte!: string


  constructor(public dialogRef: MatDialogRef<AddDescarteModalComponent >) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const newData = {
      lat: this.lat,
      long: this.long,
      cep: this.cep,
      cidade: this.cidade,
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      estado: this.estado,
      tipoDescarte: this.tipoDescarte
    };
    if(!this.lat || !this.long || !this.cep || !this.cidade || !this.rua || !this.bairro || !this.numero || !this.estado || !this.tipoDescarte) {
      window.alert("Preencha todos os campo antes de salvar!")
    } else {

      this.dialogRef.close(newData);
    }
  }
}
