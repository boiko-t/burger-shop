/**
 * Created by tayab on 06.06.2017.
 */
class Figure {
    constructor(){
        if(new.target == Figure)
            throw new TypeError('Cannot create an instance of abstract class Figure');
    }

    getArea(){
        throw 'Can\' count area of Figure';
    }
}

class Point extends Figure {
    constructor(x=10, y=10){
        super();
        this.x = x;
        this.y = y;
    }

    getArea(){
        return 1;
    }
}

class Line extends Point {
    constructor(x=1, y =1, x2=4, y2=5){
        super(x, y);
        this.x2 = x2;
        this.y2 = y2;
    }

    getArea(){
        return Math.sqrt(Math.pow((this.x2 - this.x), 2) +
                Math.pow((this.y2 - this.y), 2));
    }
}

class Square extends Point {
    constructor(x=1, y =1, x2=4, y2=5){
        super(x, y);
        this.x2 = x2;
        this.y2 = y2;
    }

    getArea(){
        let diagonalLength = new Line(this.x, this.y, this.x2, this.y2).getArea();
        return Math.pow(diagonalLength, 2) /2;
    }
}

class Triangle extends Point {
    constructor(x=1, y =1, x1=4, y1=5, x2=4, y2=1){
        super(x, y);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    getArea(){
        let sideA = new Line(this.x, this.y, this.x1, this.y1).getArea(),
            sideB = new Line(this.x1, this.y1, this.x2, this.y2).getArea(),
            sideC = new Line(this.x, this.y, this.x2, this.y2).getArea();
        let p = (sideA + sideB + sideC)/2;

        return Math.sqrt(p*(p-sideA)*(p-sideB)*(sideC));
    }
}

class Circle extends Point {
    constructor(x, y, radius){
        super(x, y);
        this.radius = radius;
    }

    getArea(){
        return Math.PI * Math.sqrt(this.radius, 2);
    }
}