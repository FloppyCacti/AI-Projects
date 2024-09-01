class Dot{
  constructor(goal){
    this.goal = goal;
    this.brain = new Brain(400);
    this.pos = createVector(width/2, height-(height*0.10));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.size = 4;
    this.dead = false;
    this.reachedGoal = false;
    this.fitness = 0;
    this.isBest = false;
    this.obOne = new Obstacle(200, height/2, 500, 50);
  }
  
  show(self){
    this.obOne.show();
    if(this.isBest){
      fill(0,255,0);
      ellipse(this.pos.x, this.pos.y, 8,8);
    }
    
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.size);
  } 
  
  move(self){
    if(this.brain.directions.length > this.brain.step){
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    }else{
      this.dead = true;
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  update(self){
    if(!this.dead && !this.reachedGoal){
      this.move();
      if(this.pos.x < this.size/2 || this.pos.y < this.size/2 || this.pos.x > width - this.size/2 || this.pos.y > height - this.size/2){
        this.dead = true;
      }else if(dist(this.pos.x, this.pos.y, this.goal.pos.x, this.goal.pos.y) < (this.size/2 + this.goal.size/2)){
        this.reachedGoal = true;
        this.dead = true;
      }else if(this.pos.x > this.obOne.pos.x && this.pos.y > this.obOne.pos.y && this.pos.x < this.obOne.pos.x + this.obOne.w && this.pos.y < this.obOne.pos.y + this.obOne.h){
        this.dead = true;
      }
    }
  }
  
  calculateFitness(self){
    if(this.reachedGoal){
     this.fitness = 1/16 + 10000/(this.brain.step * this.brain.step); 
    }else{
      let distanceToGoal = dist(this.pos.x, this.pos.y, this.goal.pos.x, this.goal.pos.y);
      this.fitness = 1/(distanceToGoal * distanceToGoal);
    }
  }
  
  crossOver(){
    this.baby = new Dot(this.goal);
    this.baby.brain = this.brain.clone();
    return this.baby;
  }
}