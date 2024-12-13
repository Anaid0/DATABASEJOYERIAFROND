import { Component } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  commentData = {
    name:'',
    email:'',
    comment:'',

  };
  submitComment(){
    if (this.commentData.name && this.commentData.email && this.commentData.comment) {
      console.log('Comentario enviado:', this.commentData);
      alert('¡Gracias por tu comentario!');
      this.commentData = { name: '', email: '', comment: '' }; // Limpiar formulario
    }
  }
}
