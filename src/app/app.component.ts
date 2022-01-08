import { Component, OnInit } from '@angular/core';
import { Board } from './model/board.model';
import { Piece } from './model/piece.model';
import { HttpClientService } from './service/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Chess';
  chessBoard!: Board;
  asset: string = "../assets/images/";
  constructor(private httpClient: HttpClientService){}
  ngOnInit(): void {
    this.httpClient.getData().subscribe(response => {
      console.log(response);
      debugger;
      this.chessBoard = response;
    });
  }
  getPiece(piece: Piece){
    //alert(JSON.stringify(piece));
    this.resetColors();
    for(let possibleCoordinate of piece.possibleMoves){
      for(let coordinates of this.chessBoard.coordinates){
        for(let coordinate of coordinates){
          if(coordinate.x === possibleCoordinate.x && coordinate.y === possibleCoordinate.y){
            coordinate.updatedColor = possibleCoordinate.updatedColor;
          }
        }
      }
    }
    /* piece.possibleMoves.every(possibleCoordinate => {
      this.chessBoard.coordinates.every(coordinates => {
        coordinates.every(coordinate => {
          if(coordinate.x === possibleCoordinate.x && coordinate.y === possibleCoordinate.y){
            coordinate.color = 'Green';
          }
        });
      });
    }) */
    
  }
  resetColors() {
    for(let coordinates of this.chessBoard.coordinates){
      for(let coordinate of coordinates){
        coordinate.updatedColor = coordinate.originalColor;
      }
    }
  }
}
