var progression = 0;

var fallingImgs = [];

var images = [];

var maxImageWidth = 18;

var minimumAngularVelocity = 0.1;

function setup() {
    createCanvas(1920, 1080);
    background('rgba(0,0,0,0.0)');
    angleMode(DEGREES);
    imageMode(CENTER);

    images = [
        loadImage('imgs/paopu.png'),
        loadImage('imgs/iceCreamBar.png')
    ];

    for (var x = 0; x < width; x += maxImageWidth) {
        const imgIndex = Math.floor(Math.random() * images.length);
        fallingImgs.push(new FallingImage(x, 0, Math.random() * 2, images[imgIndex]));
    }
}

function draw() {
    clear();
    background('rgba(0,0,0,0.0)');
    fallingImgs.forEach((img) => {
        if (!img.active && Math.random() > 0.8) {
            img.active = true;
            img.speed = Math.random() + 1;
            img.angularVelocity = Math.random() + minimumAngularVelocity;
        }
        img.render();
    })
}

class FallingImage {
    initialX = 0;
    x = 0;
    y = 0;
    speed = 0;
    diameter = maxImageWidth;
    active = false;
    amplitude = 10;
    frequency = 0.001;
    image = null;
    rotation = 0;
    angularVelocity = Math.random() + minimumAngularVelocity;

    constructor(x, y, speed, image) {
        this.initialX = x;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = image;
    }

    render() {
        if (this.active) {
            this.y += this.speed;
            this.x = this.initialX + this.amplitude / this.speed * Math.cos(Math.PI * 2 * this.frequency * this.speed * this.y);
            this.rotation += this.angularVelocity;

            push();
            translate(this.x, this.y);
            rotate(this.rotation);
            image(this.image, 0, 0, this.diameter * this.speed, this.diameter * this.speed);
            pop();

            if (this.y >= height) {
                this.y = 0 - this.diameter;
                this.active = false;
            }
        }
    }
}
