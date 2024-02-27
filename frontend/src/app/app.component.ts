import * as L from 'leaflet';
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AddDescarteModalComponent } from './components/add/add-descarte-modal-component';
import { ManageModalComponent } from './components/manage/manage-modal-component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ FormsModule,
    MatButtonModule,
    MatIconModule
    ]
})
export class AppComponent implements AfterViewInit {
  private map: any;
  cidade: string = '';
  latitude: number = 0;
  longitude: number = 0;
  cep: string = '';
  rua: any;
  bairro: string = '';
  numero: string = '';
  estado: string = '';
  tipoDescarte: string = '';

  constructor(private http: HttpClient,
    private dialog: MatDialog) {

   }

  ngAfterViewInit(): void {
    this.initMap();
  }

  openAddDescarteModal(): void {
    const dialogRef = this.dialog.open(AddDescarteModalComponent , {
      width: '600px',
      height: '650px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const data = {
          lat: this.latitude.toString(),
          long: this.longitude.toString(),
          cep: this.cep,
          cidade: this.cidade,
          rua: this.rua, 
          bairro: this.bairro,
          numero: this.numero,
          estado: this.estado,
          tipoDescarte: this.tipoDescarte
        };
      
        this.http.post<any>(this.url, result).subscribe(response => {
          console.log('Ponto de descarte criado:', response);
          const marker = L.marker([parseFloat(data.lat), parseFloat(data.long)])
            .bindPopup(`<b>Lat: </b>${data.lat}<br><b>Long:</b>${data.long}<br><b>Cidade:</b> ${data.cidade}<br><b>CEP:</b> ${data.cep}<br><b>Rua:</b> ${data.rua}<br><b>Bairro:</b> ${data.bairro}<br><b>Número:</b> ${data.numero}<br><b>Estado:</b> ${data.estado}<br><b>Tipo de descarte:</b> ${data.tipoDescarte}`);
          marker.addTo(this.map);
          this.pesquisarTodosLocais();
        }, error => {
          console.error('Erro ao criar ponto de descarte:', error);
        });
      }


    });
  }

  openManageModal(): void {
    const dialogRef = this.dialog.open(ManageModalComponent , {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const data = {
          lat: this.latitude.toString(),
          long: this.longitude.toString(),
          cep: this.cep,
          cidade: this.cidade,
          rua: this.rua, 
          bairro: this.bairro,
          numero: this.numero,
          estado: this.estado,
          tipoDescarte: this.tipoDescarte
        };
      
        this.http.post<any>(this.url, result).subscribe(response => {
          console.log('Ponto de descarte criado:', response);
          const marker = L.marker([parseFloat(data.lat), parseFloat(data.long)])
            .bindPopup(`<b>Lat: </b>${data.lat}<br><b>Long:</b>${data.long}<br><b>Cidade:</b> ${data.cidade}<br><b>CEP:</b> ${data.cep}<br><b>Rua:</b> ${data.rua}<br><b>Bairro:</b> ${data.bairro}<br><b>Número:</b> ${data.numero}<br><b>Estado:</b> ${data.estado}<br><b>Tipo de descarte:</b> ${data.tipoDescarte}`);
          marker.addTo(this.map);
        }, error => {
          console.error('Erro ao criar ponto de descarte:', error);
        });
      }
      console.log(result);
      this.pesquisarTodosLocais();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  public url = 'http://localhost:3333/api/v1/descarte';

  pesquisarTodosLocais(): void {
    this.http.get<any[]>(this.url).subscribe(response => {
      console.log('Pontos de descarte encontrados:', response);
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
  
      response.forEach(ponto => {
        const marker = L.marker([parseFloat(ponto.lat), parseFloat(ponto.long)])
          .bindPopup(`<b>Lat: </b>${ponto.lat}<br><b>Long:</b>${ponto.long}<br><b>Cidade:</b> ${ponto.cidade}<br><b>CEP:</b> ${ponto.cep}<br><b>Rua:</b> ${ponto.rua}<br><b>Bairro:</b> ${ponto.bairro}<br><b>Número:</b> ${ponto.numero}<br><b>Estado:</b> ${ponto.estado}<br><b>Tipo de descarte:</b> ${ponto.tipoDescarte}`);
        marker.addTo(this.map);
      });
    }, error => {
      console.error('Erro ao pesquisar pontos de descarte:', error);
    });
  }
  
  pesquisarCidade(): void {
    this.clearMapMarkers();
    this.http.get<any[]>(`${this.url}/cidade/${this.cidade}`).subscribe(response => {
      console.log('Pontos de descarte encontrados na cidade:', response);
      this.addMarkersToMap(response);
      console.log(response)
      if(response.length == 0) {
        window.alert("Nenhum ponto encontrado")
      }
    }, error => {
      console.error('Erro ao pesquisar pontos de descarte por cidade:', error);
    });
  }

  atualizar(id: string, data: any): void {
    this.http.put<any>(`${this.url}/${id}`, data).subscribe(response => {
      console.log('Ponto de descarte atualizado:', response);
    }, error => {
      console.error('Erro ao atualizar ponto de descarte:', error);
    });
  }

  excluir(id: string): void {
    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      console.log('Ponto de descarte excluído com sucesso');
    }, error => {
      console.error('Erro ao excluir ponto de descarte:', error);
    });
  }

  public clearMapMarkers(): void {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }

  private addMarkersToMap(data: any[]): void {
    data.forEach(ponto => {
      const marker = L.marker([parseFloat(ponto.lat), parseFloat(ponto.long)])
        .bindPopup(`<b>Lat: </b>${ponto.lat}<br><b>Long:</b>${ponto.long}<br><b>Cidade:</b> ${ponto.cidade}<br><b>CEP:</b> ${ponto.cep}<br><b>Rua:</b> ${ponto.rua}<br><b>Bairro:</b> ${ponto.bairro}<br><b>Número:</b> ${ponto.numero}<br><b>Estado:</b> ${ponto.estado}<br><b>Tipo de descarte:</b> ${ponto.tipoDescarte}`);
      marker.addTo(this.map);
    });
  }
}
