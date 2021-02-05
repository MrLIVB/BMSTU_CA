class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    
    output(){
        let msg = "X = " + this.x + "; Y = " + this.y;
        return msg;
    }
}

class Section{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }

    output(){
        let msg1 = "Start: " + this.start.output() + "; end: " + this.end.output();
        console.log(msg1);
    }

    length(){
        let d = Math.sqrt(Math.pow(this.start.x - this.end.x, 2) + Math.pow(this.start.y - this.end.y, 2));
        return d;
    }
}


function main(){
    let sec = new Section(new Point(0, 0), new Point(5, 0));
    sec.output();
    console.log("Length = " + sec.length());
}

main()