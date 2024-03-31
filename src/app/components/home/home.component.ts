import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap'
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router) { }

  gameSize: String = '4';

  @ViewChild('sun') sun!: ElementRef;
  @ViewChild('clouds') clouds!: ElementRef;
  @ViewChild('trees') trees!: ElementRef;
  @ViewChild('formDiv') formDiv!: ElementRef;

  ngAfterViewInit(): void {
    gsap.to(this.sun.nativeElement, { startAt: {y: 400, opacity: 0}, y: 0, ease: "power2.out", duration: 1.5, opacity: 1, 
      onComplete: () => {
        gsap.to(this.clouds.nativeElement, { duration: 1, opacity: 1, ease: "power3.inOut" });
        gsap.to(this.trees.nativeElement, { duration: 1, opacity: 1 });
      },
    });
      gsap.to(this.formDiv.nativeElement, { duration: 1, opacity: 1, ease: "power3.inOut" }).delay(2.2);
  }

  changeGameSize(size: String) {
    this.gameSize = size;
  }

  startGame(f: NgForm) {
    this.router.navigate(['/game', { gameSize: this.gameSize, excludedNumbers: f.value.exclude }]);
  }

}
