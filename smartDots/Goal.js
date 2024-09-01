class Goal{
  constructor(){
    this.pos = createVector(width/2, 50);
    this.size = 10;
  }
  
  show(){
    fill(0,126,0);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}