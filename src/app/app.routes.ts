import { Routes } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, 
    {
        path: 'game',
        component: GameBoardComponent
    }
];
