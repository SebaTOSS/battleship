export default class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  setCenter(coordinate) {
    this.startCoordinate = coordinate;
  }

  isInCoordinate(coordinate) {
    return this.startCoordinate.x === coordinate.x && 
      this.startCoordinate.y === coordinate.y;
  }

  hit(coordinate) {
    this.hits = this.hits + 1;
  }

  isSunk() {
    return this.size <= this.hits;
  }

}
