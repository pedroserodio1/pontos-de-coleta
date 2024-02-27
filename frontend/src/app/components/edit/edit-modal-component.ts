
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html', 
  styleUrls: ['./edit-modal.component.scss'], 
  imports: [ FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class EditModalComponent {
  id!: string;
  lat!:string
  long!:string
  cep!: string 
  cidade!: string
  rua!: string
  bairro!:string
  numero!:string
  estado!: string
  tipoDescarte!: string


  constructor(public dialogRef: MatDialogRef<EditModalComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.id = this.data.ponto.id;
    this.lat = this.data.ponto.lat;
    this.long = this.data.ponto.long;
    this.cep = this.data.ponto.cep;
    this.cidade = this.data.ponto.cidade;
    this.rua = this.data.ponto.rua;
    this.bairro = this.data.ponto.bairro;
    this.numero = this.data.ponto.numero;
    this.estado = this.data.ponto.estado;
    this.tipoDescarte = this.data.ponto.tipoDescarte;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const newData = {
      id: this.id,
      lat: this.lat.toString(),
      long: this.long.toString(),
      cep: this.cep,
      cidade: this.cidade,
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      estado: this.estado,
      tipoDescarte: this.tipoDescarte
    };
  
    if(!this.lat || !this.long || !this.cep || !this.cidade || !this.rua || !this.bairro || !this.numero || !this.estado || !this.tipoDescarte) {
      window.alert("Preencha todos os campos antes de salvar!");
      console.log(this.id);
    } else {
      this.dialogRef.close({ id: this.id, data: newData });
    }
  }
  
}
