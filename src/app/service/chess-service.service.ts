import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../model/board.model';
import { Piece } from '../model/piece.model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ChessServiceService {

  constructor(private httpService: HttpClientService) { }

  getChessBoard() : Observable<Board>{
    return this.httpService.getData("http://localhost:8080/chess/board/populate");
  }

  getPossibleMove(request: any) : Observable<any>{
    return this.httpService.postData("http://localhost:8080/chess/board/getPossibleMove", request)
  }

  updateMove(board: any) : Observable<any>{
    return this.httpService.postData("http://localhost:8080/chess/board/updateBoard", board)
  }
}
