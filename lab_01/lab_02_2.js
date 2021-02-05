
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    isPossible() {
        if (this.a === this.b && this.b === this.c)
            return true;

        if (this.a < this.b + this.c && this.b < this.a + this.c && this.c < this.b + this.a)
            return true;
        else
            return false;
    }

    perimeter() {
        return this.a + this.b + this.c;
    }

    square() {
        let p = this.perimeter() / 2;

        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }

    isRight() {
        if (this.a * this.a + this.b * this.b == this.c * this.c || this.a * this.a
            + this.c * this.c == this.b * this.b || this.b * this.b + this.c * this.c == this.a * this.a)
            return true;
        else
            return false;
    }
}

function main(){
    let tri = new Triangle(1, 1, 1);
    if (tri.isPossible())
        console.log("Is possible");
    else
        console.log("Is not possible");

    console.log("Perimeter = " + tri.perimeter());

    console.log(tri.square());

    if (tri.isRight())
        console.log("Right");
    else
        console.log("Isn't right");
    
    let tri2 = new Triangle(1, 1, Math.sqrt(2));
    console.log(tri2.square());

    if (tri2.isRight())
        console.log("Right");
    else
        console.log("Isn't right");
}

main()