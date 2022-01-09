import { Piece } from "./piece.model";

export class Coordinate {
    public x!: number;
	public y!: number;
	public originalColor!: string;
	public updatedColor!: string;
	public isOccupied!: boolean;
	public piece: Piece = {
		x: 0,
		y: 0,
		id: "",
		name: "",
		color: "",
		possibleMoves: [],
		history: []
	}
}
