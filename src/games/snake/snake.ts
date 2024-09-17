import type { Position } from "src/types";

export default class Snake {
  private snake: Position[];
  public readonly gridSize: number;
  private apple: Position = { x: 0, y: 0 };

  public constructor(gridSize: number) {
    const x = Math.floor(gridSize / 2);
    const y = Math.floor(gridSize / 2);
    this.snake = [{ x, y }];
    this.gridSize = gridSize;
    this.randomizeApple();
  }

  /**
   * Randomize the apple's position
   */
  private randomizeApple(): void {
    this.apple = {
      x: Math.floor(Math.random() * this.gridSize),
      y: Math.floor(Math.random() * this.gridSize),
    };
    const { x, y } = this.head;
    while (this.apple.x === x && this.apple.y === y) {
      this.apple = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize),
      };
    }
  }

  /**
   * Get the snake's head
   * @returns the head of the snake
   */
  private get head(): Position {
    return this.snake[0];
  }

  /**
   * Push a new element onto the snake
   */
  private push(): void {
    const { x, y } = this.snake[this.snake.length - 1];
    this.snake.push({ x, y });
  }

  /**
   * Eat an apple if overlapping with the head of the snake
   *
   * @returns true iff the apple was eaten
   */
  private eatApple(): void {
    for (const { x, y } of this.snake) {
      if (x === this.apple.x && y === this.apple.y) {
        this.push();
        return this.randomizeApple();
      }
    }
  }

  /**
   * Move the snake one time step
   *
   * @param delta the direction of movement
   * @param checkWalls check if there is a collision
   * @returns true iff there is a collision with one of the walls or itself
   */
  public move(delta: Position, checkWalls: boolean): boolean {
    let newHead = {
      x: this.head.x + delta.x,
      y: this.head.y + delta.y,
    };
    if (checkWalls) {
      const { x, y } = newHead;
      if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize)
        return true;
    } else {
      newHead = this.clampHead(newHead);
    }
    this.snake = [newHead].concat(this.snake.slice(0, -1));
    const hasCollision = this.hasCollision();
    if (!hasCollision) this.eatApple();
    return hasCollision;
  }

  /**
   * Clamp the new head within the grid
   *
   * @param head of the snake
   * @returns the new head position for the snake
   */
  private clampHead(head: Position): Position {
    const { x, y } = head;
    if (x < 0) return { x: this.gridSize - 1, y };
    if (x >= this.gridSize) return { x: 0, y };
    if (y < 0) return { x, y: this.gridSize - 1 };
    if (y >= this.gridSize) return { x, y: 0 };
    return head;
  }

  /**
   * Check for collisions
   *
   * @returns true if a collision is detected else false
   */
  private hasCollision(): boolean {
    const snakeLength = this.snake.length;
    for (let i = 0; i < snakeLength; ++i) {
      const block1 = this.snake[i];
      for (let j = 0; j < i; ++j) {
        const block2 = this.snake[j];
        if (block1.x === block2.x && block1.y === block2.y) return true;
      }
    }
    return false;
  }

  /**
   * Get the snake as an array of positions
   * @returns the snake as an array of positions
   */
  public toArray(): Position[] {
    return this.snake;
  }

  /**
   * Get the score of the snake
   * @returns the score of the snake
   */
  public get score(): number {
    return this.snake.length - 1;
  }

  /**
   * Get apple's position
   * @returns the apple's position
   */
  public getApple(): Position {
    return this.apple;
  }

  /**
   * Prints a snake!
   *
   * @returns {string} the toString for this Snake Object
   */
  public toString(): string {
    const arr = [];
    for (let y = 0; y < this.gridSize; ++y) {
      const cur = [];
      for (let x = 0; x < this.gridSize; ++x) {
        cur.push("+");
      }
      arr.push(cur);
    }
    for (const { x, y } of this.snake) {
      arr[y][x] = "o";
    }
    arr[this.head.y][this.head.x] = "O";
    return arr.reduce((prev, current) => prev + current.join(" ") + "\n", "");
  }
}
