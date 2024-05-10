import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component'; //new
import { QuizComponent } from './quiz/quiz.component'; // Import QuizComponent
import { FrontPageComponent } from './front-page/front-page.component';
import { GenrePageComponent } from './genre-page/genre-page.component'; //Import genrePage component
import { RandomUserMovieComponent } from './random-user-movie/random-user-movie.component'; // 4/2 added
import { UserRecommendationsComponent } from './user-recommendations/user-recommendations.component';

const routes: Routes = [
  
  { path: 'header', component: HeaderComponent },
  { path: '', component: FrontPageComponent},
  { path: 'quiz', component: QuizComponent }, // Define route for QuizComponent
  { path: 'genre-page', component: GenrePageComponent },
  { path: 'random-user-movie', component: RandomUserMovieComponent },
  { path: 'recommendations', component: UserRecommendationsComponent}
  //{ path: '', redirectTo: '/header', pathMatch: 'full' }, // Redirect to /header if no matching route found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
