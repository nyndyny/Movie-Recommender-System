import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Movie } from 'src/schema/movie';
import { UserRecommendationsComponent } from '../user-recommendations/user-recommendations.component';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  weather: string | null = null;
  feelings: string | null = null;
  gender: string | null = null;
  age: string | null = null;
  time: string | null = null;
  when: string | null = null;
  loading: boolean = false;
  constructor(private http: HttpClient, private _modalService: ModalService, private router: Router) {

  }
    
  ngOnInit(): void {
    // Logic to be executed on component initialization
    console.log('QuizComponent ngOnInit called');
  }

  resetForm() {
    this.weather = null;
    this.feelings = null;
    this.gender = null;
    this.age = null;
    this.time = null;
    this.when = null;
  }

  getRecommendation(quizForm: NgForm) {
    this.loading = true;
    // Logic to get recommendation
    // Get form values
    
    const FormValues = {
      UserName: localStorage.getItem('UserName'),
      weather: quizForm.value.weather,
      feelings: quizForm.value.feelings,
      gender: quizForm.value.gender,
      age: quizForm.value.age,
      time: quizForm.value.time,
      when: quizForm.value.when,
    };
    

    // console.log(FormValues)
    this.http.post('http://localhost:8080/movies/byquiz/get', JSON.stringify(FormValues)).subscribe((moviesList: any)=> {
        if (200) {

          this.loading = false;

          if (moviesList.ID === 0) {
            alert("NO RECOMMENDATION available, try filling out more attributes")
            return;
          }
          let movie: Movie = moviesList
          console.log(movie)
          this.openRecommendationModal(movie)
            //parse 'movie' to print on UI
        }
      }, (error) => {
        this.loading = false;
        if (error.status === 404) {
          alert('Resource not found.');
        }
        else if (error.status === 403) {
          alert('Forbidden Access to Resource');
        }
        else if (error.status === 500) {
          alert('Server down.');
        }
        else if (error.status === 502) {
          alert('Bad gateway.');
        }
      }
      
    );

  }

  openRecommendationModal(movie: Movie) {
    
    this._modalService.show<Movie>(UserRecommendationsComponent, {
      title: 'Personalized User Recommendations',
      type: 'default',
      mode: 'default',
      model: movie
    })
  }

  backToMainPage() {
    this.router.navigate(['/']);
  }
}

