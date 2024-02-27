
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { EditModalComponent } from '../edit/edit-modal-component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'manage-modal',
  templateUrl: './manage-modal.component.html', 
  styleUrls: ['./manage-modal.component.scss'], 
  imports: [ FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ]
})

export class ManageModalComponent {
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
  dataSource: any[] = []; 
  displayedColumns: string[] = ['latitude', 'longitude', 'cep', 'cidade', 'actions'];

  public url = 'http://localhost:3333/api/v1/descarte';


  constructor(public dialogRef: MatDialogRef<ManageModalComponent >,
    private http: HttpClient,
    private dialog: MatDialog) {}

    ngOnInit(): void {
      this.carregarPontosDescarte();
    }
  
    carregarPontosDescarte(): void {
      this.http.get<any[]>(this.url).subscribe(data => {
        this.dataSource = data;
      });
    }

    editarPonto(ponto: any): void {
      this.openEditModal(ponto.id);
    }
  
    excluirPonto(id: string): void {
      this.http.delete(this.url+`/${id}`).subscribe(() => {
        this.dataSource = this.dataSource.filter(ponto => ponto.id !== id);
      }, error => {
        console.error('Erro ao excluir ponto de descarte:', error);
      });
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  openEditModal(ponto: any): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '500px',
      data: { ponto: ponto } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizar(result.id, result.data); 
      }
    });
  }
    
  atualizar(id: string, data: any): void {
    this.http.put<any>(`${this.url}/${id}`, data).subscribe(response => {
      console.log('Ponto de descarte atualizado:', response);
      this.carregarPontosDescarte();
    }, error => {
      console.error('Erro ao atualizar ponto de descarte:', error);
    });
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
