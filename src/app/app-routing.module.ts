import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteInicioComponent } from './cliente-inicio/cliente-inicio.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [

  { path : '', component: ClienteInicioComponent},
  { path : 'principal', component : ClienteInicioComponent},
  { path : 'producto/:id_producto', component : DetalleProductoComponent},
  { path : 'comentarios/:id_producto', component : ComentariosComponent},
  { path : 'buscarSucursales', component : MapComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
