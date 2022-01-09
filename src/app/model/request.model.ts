import { Board } from "./board.model";
import { Piece } from "./piece.model";

export class Request {
    public board!: Board;
    public piece!: Piece;
}
