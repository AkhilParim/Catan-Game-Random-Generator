import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  gameSize: String = '4';

  changeGameSize(size: String) {
    this.gameSize = size;
  }

  startGame(f: NgForm) {
    this.router.navigate(['/game', { gameSize: this.gameSize, excludedNumbers: f.value.exclude }]);
  }

}
