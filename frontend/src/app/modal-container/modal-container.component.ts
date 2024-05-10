import { Component, Input } from '@angular/core';
import { Movie } from 'src/schema/movie';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})
export class ModalContainerComponent {

  @Input() allMovies: Movie[] = [];
  @Input() userGenreMovies: Movie[] = [];
  @Input() showPopup: boolean = false;
  constructor() {

  }
}
