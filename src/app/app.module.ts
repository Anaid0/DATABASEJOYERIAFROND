import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { ClienteInicioComponent } from './cliente-inicio/cliente-inicio.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { MapComponent } from './map/map.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteInicioComponent,
    DetalleProductoComponent,
    ComentariosComponent,
    MapComponent,
    InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

