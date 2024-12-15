import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { ComentarioService } from '../service/comentario.service'; // Importar tu servicio si lo necesitas
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  id_producto: number = 0;
  nuevoComentario = {
    id_producto: '',
    autor: '',
    contenido: ''
  };

  constructor(
    private comentariosService: ComentarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id_producto');
      console.log('Ruta completa:', this.route.snapshot.url);
      console.log('ID capturado:', id);
      if (id) {
        this.id_producto = +id;
        this.nuevoComentario.id_producto = this.id_producto.toString();
      } else {
        console.error('No se encontró un ID de producto en la URL.');
      }
    });
  }
  

  publicarComentario(): void {
    const { id_producto, autor, contenido } = this.nuevoComentario;

    // Asegúrate de que id_producto sea un número antes de pasar a la función
    const idProductoNumber = +id_producto;  // Convierte id_producto a number

    if (idProductoNumber && autor && contenido) {
      this.comentariosService.publicarComentario(idProductoNumber, autor, contenido).subscribe(
        (response) => {
          console.log('Comentario publicado:', response);
          // Limpiar formulario
          this.nuevoComentario = { id_producto: '', autor: '', contenido: '' };
        },
        (error) => {
          console.error('Error al publicar el comentario:', error);
        }
      );
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }

  volver(): void{
    this.router.navigate(['/']);
  }
}
