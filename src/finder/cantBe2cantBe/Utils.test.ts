import { getAllPossiblePositions, getYCoordinatesOf, getXCoordinatesOf } from "./Utils";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuBox from "../../sudoku/SudokuBox";

describe("Utils", () => {
  describe("getAllPossiblePositions", () => {
    it("returns positions that are possible in the box", () => {
      const notHeres: SudokuPosition[] = [
        SudokuPosition.of(0, 0),
        SudokuPosition.of(0, 1),
        SudokuPosition.of(0, 2),
        SudokuPosition.of(1, 0),
        SudokuPosition.of(1, 1),
        SudokuPosition.of(1, 2)
      ];
      const box = SudokuBox.createByPosition(SudokuPosition.of(0, 0));
      const possiblePositions = getAllPossiblePositions(notHeres, box);
      expect(possiblePositions).toContain(SudokuPosition.of(2, 0));
      expect(possiblePositions).toContain(SudokuPosition.of(2, 1));
      expect(possiblePositions).toContain(SudokuPosition.of(2, 2));
    });
  });

  describe("getYCoordinatesOf", () => {
    it("returns distinct Y coordinates of given positions", () => {
      const positions: SudokuPosition[] = [
        SudokuPosition.of(0, 0),
        SudokuPosition.of(1, 0),
        SudokuPosition.of(2, 0)
      ];
      const yCoordinates = getYCoordinatesOf(positions);
      expect(yCoordinates).toContain(0);
      expect(yCoordinates.length).toBe(1);
    });

    it("returns distinct Y coordinates even if positions have duplicate Y coordinates", () => {
      const positions: SudokuPosition[] = [
        SudokuPosition.of(0, 0),
        SudokuPosition.of(1, 0),
        SudokuPosition.of(2, 0),
        SudokuPosition.of(3, 1),
        SudokuPosition.of(4, 1),
        SudokuPosition.of(4, 2),
      ];
      const yCoordinates = getYCoordinatesOf(positions);
      expect(yCoordinates).toContain(0);
      expect(yCoordinates).toContain(1);
      expect(yCoordinates).toContain(2);
      expect(yCoordinates.length).toBe(3);
    });

    it("returns an empty array when no positions are given", () => {
      const positions: SudokuPosition[] = [];
      const yCoordinates = getYCoordinatesOf(positions);
      expect(yCoordinates.length).toBe(0);
    });
  });

  describe("getXCoordinatesOf", () => {
    it("returns distinct X coordinates of given positions", () => {
      const positions: SudokuPosition[] = [
        SudokuPosition.of(0, 0),
        SudokuPosition.of(0, 1),
        SudokuPosition.of(0, 2)
      ];
      const xCoordinates = getXCoordinatesOf(positions);
      expect(xCoordinates).toContain(0);
      expect(xCoordinates.length).toBe(1);
    });

    it("returns distinct X coordinates even if positions have duplicate X coordinates", () => {
      const positions: SudokuPosition[] = [
        SudokuPosition.of(0, 0),
        SudokuPosition.of(0, 1),
        SudokuPosition.of(0, 2),
        SudokuPosition.of(1, 3),
        SudokuPosition.of(1, 4),
        SudokuPosition.of(2, 4),
      ];
      const xCoordinates = getXCoordinatesOf(positions);
      expect(xCoordinates).toContain(0);
      expect(xCoordinates).toContain(1);
      expect(xCoordinates).toContain(2);
      expect(xCoordinates.length).toBe(3);
    });

    it("returns an empty array when no positions are given", () => {
      const positions: SudokuPosition[] = [];
      const xCoordinates = getXCoordinatesOf(positions);
      expect(xCoordinates.length).toBe(0);
    });
  });
});
