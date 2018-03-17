export default class Ship {
  constructor(size, board) {
    this.size = size;
    this.hits = 0;
    this.coordinates = [];
    this.board = board;
    this.flatBoard = board.reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      }, []);
  }

  addCoordinate(coordinate, flatBoard) {
    const cell = flatBoard.find((cell) => {
      return cell.x === coordinate.x &&
            cell.y === coordinate.y;
    });
    if (cell) {
      this.coordinates.push(cell);
    }
  }

  setStartCoordinate(coordinate, isHorizontal) {
    this.startCoordinate = coordinate;
    this.addCoordinate(coordinate, this.flatBoard);
    const totalCoordinates = this.size -1;
    if (isHorizontal) {
      for (let i = 1; i <= totalCoordinates; i++) {
        let x = coordinate.x + i;
        let newCoordinate = { x: x, y: coordinate.y };
        this.addCoordinate(newCoordinate, this.flatBoard);
      }
    } else {
      for (let i = 1; i <= totalCoordinates; i++) {
        let y = coordinate.y + i;
        let newCoordinate = { x: coordinate.x, y: y };
        this.addCoordinate(newCoordinate, this.flatBoard);
      }
    }
  }

  isInCoordinate(coordinate) {
    const exists = this.coordinates.find((shipCoordinate) => {
     return shipCoordinate.x === coordinate.x &&
            shipCoordinate.y === coordinate.y;
    });
    return !!exists;
  }

  hit(coordinate) {
    const target = this.coordinates.find((shipCoordinate) => {
      return  shipCoordinate.x === coordinate.x &&
              shipCoordinate.y === coordinate.y;
    });
    if (!target.hit) {
      target.hit = true;
      this.hits = this.hits + 1;
    }
  }

  isSunk() {
    return this.size <= this.hits;
  }

}
