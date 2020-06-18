//Parent class: set the 2 arguments for its children to be 2D, single click shows the dimentions of the shape, dbl click removes shape from canvas
class Shape {
    constructor(_height, _width) {
        this.height = _height;
        this.width = _width;
        this.div = $('<div></div>');
        this.div.click(() => this.describe());
        this.div.dblclick(() => this.destroy());
        this.render();
    }
    //keeps all shapes appearing randomly inside the canvas
    generatePoint(offset) {
        return Math.floor(Math.random() * (600 - offset));
    }
    //executes dimentions of each click on single click to appear in side panel 
    describe() {
        $('#shape-name').val(this.div.attr('id'))
        $('#shape-height').val(this.height)
        $('#shape-width').val(this.width)
        $('#shape-radius').val('na')
        $('#shape-perimeter').val(this.perim)
        $('#shape-area').val(this.area)
    }
    //removes shape on double click
    destroy() {
        this.div.remove();
        $('.form-control').val('');
    }
    render() {
        this.div.css({
            height: this.height + 'px',
            width: this.width + 'px',
            top: `${this.generatePoint(this.height)}px`,
            left: `${this.generatePoint(this.width)}px`,
        });
        $('#myCanvas').append(this.div);

    };
}

class Circle extends Shape {
    constructor(radius) {
        super(2 * radius, 2 * radius);
        this.div.attr('id', 'Circle')
        this.perim = this.width * this.height;
        this.area = (2 * this.height) + (2 * this.width);
    }

    resize(radius) {
        super.resize(2 * radius, 2 * radius);
    }

    calculateArea() {
        const radius = this.width / 2;

        return Math.PI * radius * radius;
    }
    describe() {
        super.describe();
        $('#shape-radius').val(this.height / 2);
    }

}

class Triangle extends Shape {
    constructor(height) {
        super(height, height);
        this.div.attr('id', 'Triangle')
        this.div.css({
            height: 0,
            width: 0,
            borderLeft: `${this.height}px solid transparent`,
            borderTop: `${this.height}px solid yellow`,
        })
        this.area = 0.5 * this.height * this.height;
        let hypotenuse = Math.sqrt((this.height * this.height) + (this.height * this.height));
        this.perim = this.height + this.height + hypotenuse;
    }
}

class Rectangle extends Shape {
    constructor(height, width) {
        super(height, width);
        this.width = width;
        this.div.attr('id', 'Rectangle')
        this.area = this.width * this.height;
        this.perim = (2 * this.height) + (2 * this.width)
    }
}

class Square extends Shape {
    constructor(side) {
        super(side, side);
        this.div.attr('id', 'Square')
        this.area = this.width * this.height;
        this.perim = (2 * this.height) + (2 * this.width)
    }
}

// Form code section: values for all shapes to appear after single click event on shape in the canvas
$('#circle-btn').click(() => {
    let cirradius = $('#radiuslength').val()
    new Circle(cirradius);
})
$('#triangle-btn').click(() => {
    let triheight = $('#sideheight').val()
    new Triangle(triheight);
})
$('#rectangle-btn').click(() => {
    let recheight = $('#rectangleheight').val()
    let recwidth = $('#sidewidth').val()
    new Rectangle(recheight, recwidth);
})
$('#square-btn').click(() => {
    let sqlength = $('#sidelength').val()
    new Square(sqlength);
})

