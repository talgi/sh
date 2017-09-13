export class OldAnswer {
    token: number;
    chosenAnswer: number;
}

export interface OldQuestion {
    question_type: string;
    header: string;
    choices: Choice[];
    done: string;
}

export interface Choice {
    num: number;
    ans: Picture;
}

export interface Picture {
    pic: string;
}



/**********PickStyle************/
export class DrawingCordinatesRequest {
    token: number;
    coordinates: Point[];
}

export class Point {
    x: number;
    y: number;
}

export class DrawingCoordinatesResponse {
    items: ItemData[];
}

export class ItemData {
    constructor(width, length, position, direction, furniture) {
        this.width = width;
        this.length = length;
        this.position = position;
        this.direction = direction;
        this.furniture = furniture;
    }
    width: string;
    length: string;
    position: Point[];
    direction: number;
    furniture: string;
}
