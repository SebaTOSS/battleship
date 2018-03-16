export default class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  setStartCoordinate(coordinate, isHorizontal) {
    this.startCoordinate = coordinate;
    this.coordinates = [this.startCoordinate];
    if (isHorizontal) {
      for (let i = 1; i <= this.size; i++) {
        let x = coordinate.x + i;
        let newCoordinate = { x: x, y: coordinate.y };
        this.coordinates.push(newCoordinate);
      }
    } else {
      for (let i = 1; i <= this.size; i++) {
        let y = coordinate.y + i;
        let newCoordinate = { x: coordinate.x, y: y };
        this.coordinates.push(newCoordinate);
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
      return shipCoordinate.x === coordinate.x &&
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
