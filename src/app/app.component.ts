import { Component, OnInit } from '@angular/core';
import { Board } from './model/board.model';
import { Coordinate } from './model/coordinate.model';
import { Piece } from './model/piece.model';
import { Request } from './model/request.model';
import { ChessServiceService } from './service/chess-service.service';
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
  selectedCoordinate!: Coordinate;
  selectedPiece! : Piece;
  request : Request = new Request();
  isWhitesMove : boolean = true;
  playerColor : string = "White";
  constructor(private httpClient: HttpClientService, private chessService: ChessServiceService){}
  ngOnInit(): void {
    this.chessService.getChessBoard().subscribe(response => {
      console.log(response);     
      this.chessBoard = response;
    });
  }
  getPossibleMoves(coordinate: Coordinate){
    //alert(JSON.stringify(coordinate));
    if(this.playerColor === coordinate.piece.color){
      this.resetColors();
      this.resetPossibleMoves();
      this.selectedCoordinate = coordinate;
      this.selectedPiece = coordinate.piece;
      this.request.board = this.chessBoard;
      this.request.piece = this.selectedPiece
      this.chessService.getPossibleMove(this.request).subscribe(response => {
        console.log(response);
        this.selectedPiece = response;
        this.chessBoard.coordinates[this.selectedPiece.x][this.selectedPiece.y].piece = this.selectedPiece;
        for(let possibleCoordinate of this.selectedPiece.possibleMoves){
          for(let coordinates of this.chessBoard.coordinates){
            for(let coordinate of coordinates){
              if(coordinate.x === possibleCoordinate.x && coordinate.y === possibleCoordinate.y){
                coordinate.updatedColor = possibleCoordinate.updatedColor;
              }
            }
          }
        }        
      });      
    } 
    else{
      for(let possibleCoordinate of this.selectedPiece.possibleMoves){
        if(possibleCoordinate.x === coordinate.x && possibleCoordinate.y === coordinate.y){
          //alert("Kill");
          this.validateMove(coordinate);
        }
      }
    }
  }  

  resetColors() {
    for(let coordinates of this.chessBoard.coordinates){
      for(let coordinate of coordinates){
        coordinate.updatedColor = coordinate.originalColor;
      }
    }
  }

  resetPossibleMoves() {
    for(let coordinates of this.chessBoard.coordinates){
      for(let coordinate of coordinates){
        if(coordinate.isOccupied){
          coordinate.piece.possibleMoves = [];
        }
      }
    }
  }

  validateMove(coordinate: Coordinate){
    for(let possibleCoordinate of this.selectedCoordinate.piece.possibleMoves){
      if(coordinate.x === possibleCoordinate.x && coordinate.y === possibleCoordinate.y){
        //alert("Hi");
        //updated new coordinate
        let history = this.selectedCoordinate;
        this.updateNewCoordinate(coordinate, this.selectedCoordinate.piece);
        //reset odl coordinate
        this.resetOldCoordinate(); 
        this.resetColors();
        /* this.chessService.updateMove(this.chessBoard).subscribe(response => {
          console.log(response);
          this.chessBoard = response;
        }); */        
        this.playerColor = this.isWhitesMove ? 'Black' : 'White';
        this.isWhitesMove = !this.isWhitesMove;
      }
    }
  }

  updateNewCoordinate(coordinate: Coordinate, piece: Piece){        
    piece.x = coordinate.x;
    piece.y = coordinate.y;
    piece.possibleMoves = [];
    piece.history[piece.history.length] = ([this.selectedCoordinate.x, this.selectedCoordinate.y]);
    coordinate.piece = piece;
    coordinate.isOccupied = true;
    this.chessBoard.coordinates[coordinate.x][coordinate.y] = coordinate;
  }

  resetOldCoordinate() {
    let coordinate = new Coordinate();
    coordinate.piece.id = "0";
    coordinate.piece.name = '';
    coordinate.piece.color = '';
    coordinate.piece.x = this.selectedCoordinate.x;
    coordinate.piece.y = this.selectedCoordinate.y;
    coordinate.piece.possibleMoves = [];
    coordinate.originalColor = this.selectedCoordinate.originalColor;
    coordinate.updatedColor = this.selectedCoordinate.updatedColor;
    coordinate.isOccupied = false;
    coordinate.x = this.selectedCoordinate.x;
    coordinate.y = this.selectedCoordinate.y;
    this.chessBoard.coordinates[this.selectedCoordinate.x][this.selectedCoordinate.y]= coordinate;
  }

}
