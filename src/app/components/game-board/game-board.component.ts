import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, AfterViewInit {

  constructor(private service: AppService, private activatedRoute: ActivatedRoute ) { 
    let params = this.activatedRoute.snapshot.paramMap;
    this.gameSize = Number(params.get('gameSize')) as 4 | 6;
    let excludedNumbers: any = params.get('excludedNumbers');
    if(excludedNumbers) {
      excludedNumbers = excludedNumbers.split(',');
      this.excludedNumbers = excludedNumbers.map((e: any) => Number(e));
      let acceptedTokens = new Set();
      let tokensList = this.gameSize == 6 ? this.service._6PlayerTokens : this.service._4PlayerTokens;
      for(let val of tokensList) {
        if(!(this.excludedNumbers.includes(val))) {
          acceptedTokens.add(val)
        }
      }
      this.acceptedTokens = Array.from(acceptedTokens) as Number[];
    }
  }

  gameSize!: 4 | 6;
  excludedNumbers: Number[] = [];
  acceptedTokens: Number[] = [];
  tiles: Array<String[]> = [];
  tokens: number[] = [];
  tileHeight!: number;

  @ViewChild('board') board!: ElementRef;

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.calculateBoardDimentions();
  // }

  ngOnInit() {
    this.tiles = this.generateGame(this.gameSize);
   }

  ngAfterViewInit() {
      this.calculateBoardDimentions();
  }

  calculateBoardDimentions() {
    let boardHeight = this.board.nativeElement.offsetHeight;
    let boardWidth = this.board.nativeElement.offsetWidth;
    if(boardWidth < boardHeight) {
      boardHeight = boardWidth * 5.5 / 7;
    }
    this.tileHeight = this.gameSize == 6 ? boardHeight / 5.5 : boardHeight / 4;
    setTimeout(() => {}, 0);
  }

  generateGame(gameSize: number): any {
    let { shuffledTiles, tokens} = this.service.shuffleTilesAndTokens(this.gameSize);
    this.tokens = tokens;
    
    var result: Array<String[]> = []; var row: String[] = [];
    var currRow = 0; var currCardsInRow = 0; var maxCardsInCurrRow = 3;
    var maxRows = gameSize == 6 ? 7 : 5;

    while (currRow < maxRows) {
      row.push(shuffledTiles.pop()!)
      currCardsInRow += 1;
      if (currCardsInRow == maxCardsInCurrRow) {
        result.push(row);
        row = [];
        currCardsInRow = 0;
        if (currRow >= Math.floor(maxRows / 2)) {
          maxCardsInCurrRow -= 1
        } else {
          maxCardsInCurrRow += 1
        }
        currRow += 1
      }
    }
    return result;
  }

  getToken() {
    let token = this.tokens?.pop() as number;
    
    if(this.excludedNumbers.includes(token)) {
      let selected =  this.acceptedTokens[Math.floor(Math.random() * this.acceptedTokens.length)]
      return selected
    }
    return token
  }
}
