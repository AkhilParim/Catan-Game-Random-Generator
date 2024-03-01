import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor() { }

  _4PlayerTiles = {
    desert: 1,
    field: 4,
    hill: 3,
    mountain: 3,
    forest: 4,
    pasture: 4
  }

  _4PlayerTokens = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

  _6PlayerTiles = {
    desert: 2,
    field: 6,
    hill: 5,
    mountain: 5,
    forest: 6,
    pasture: 6
  }

  _6PlayerTokens = [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12];


  shuffleTilesAndTokens(size: number) {
    // Tiles
    let shuffledTiles: String[] = []
    let obj = size == 6 ? this._6PlayerTiles : this._4PlayerTiles;
    for(const [key, value] of Object.entries(obj)) {
      for(let i = 0; i < value; i++) {
        shuffledTiles.push(key)
      }
    }
    for(let i = shuffledTiles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp: String = shuffledTiles[i];
      shuffledTiles[i] = shuffledTiles[j];
      shuffledTiles[j] = temp;
    }
    // tokens
    let tokens = size == 6 ? this._6PlayerTokens : this._4PlayerTokens;
    for(let i = tokens.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp: number = tokens[i];
      tokens[i] = tokens[j];
      tokens[j] = temp;
    }

    return { shuffledTiles, tokens };
  }

}


