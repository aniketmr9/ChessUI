import { Coordinate } from "./coordinate.model";

export class Piece {
	public x!: number;
	public y!: number;
    public id!: string;
	public name!: string;
	public color!: string;
	public possibleMoves: Coordinate[] = [];
	public history: any[][] = [];
}
