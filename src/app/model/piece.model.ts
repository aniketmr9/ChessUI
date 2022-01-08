import { Coordinate } from "./coordinate.model";

export class Piece {
    public id!: string;
	public name!: string;
	public color!: string;
	public possibleMoves: Coordinate[] = [];
}
