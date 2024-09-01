class Population{
  constructor(size){
    this.gen = 0;
    this.fitnessSum = 0;
    this.goal = new Goal();
    this.size = size;
    this.bestDot = 0;
    this.dots = new Array(this.size);
    this.minStep = 400;
    for(let i = 0; i < this.size; i++){
      this.dots[i] = new Dot(this.goal);
    }
  }
  
  show(){
    this.goal.show();
    for(let i = 1; i < this.size; i++){
      this.dots[i].show();
    }
    this.dots[0].show();
  }
  
  update(){
    for(let i = 0; i < this.size; i++){
      if(this.dots[i].brain.step > this.minStep){
        this.dots[i].dead = true;
      }else{
        this.dots[i].update();
      }
    }
  }
  
  calculateFitness(){
    for(let i = 0; i < this.size; i++){
      this.dots[i].calculateFitness();
    }
  }
  
  allDotsDead(){
    for(let i = 0; i < this.size; i++){
      if(!this.dots[i].dead && !this.dots[i].reachedGoal){
        return false;
      }
    }
    return true;
  }
  
  naturalSelection(){
    let newDots = new Array(this.size);
    this.setBestDot();
    this.calculateFitnessSum();
    
    newDots[0] = this.dots[this.bestDot].crossOver();
    newDots[0].isBest = true;
    for(let i = 1; i < this.size; i++){
      this.parent = this.selectParent();
      newDots[i] = this.parent.crossOver();
    }
    
    this.dots = [...newDots];
    this.gen++;
  }
  
  calculateFitnessSum(){
    this.fitnessSum = 0;
    for(let i = 0; i < this.size; i++){
      this.fitnessSum += this.dots[i].fitness; 
    }
  }
  
  selectParent(){
    let rand = random(this.fitnessSum);
    let runningSum = 0;
    
    for(let i = 0; i < this.size; i++){
      runningSum += this.dots[i].fitness;
      
      if(runningSum > rand){
        return this.dots[i];
      }
    }
    
    return null;
  }
  
  mutate(){
    for(let i = 1; i < this.size; i++){
      this.dots[i].brain.mutate()
    }
  }
  
  setBestDot(){
    let max = 0;
    let maxIndex = 0;
    for(let i = 0; i < this.size; i++){
      if(this.dots[i].fitness > max){
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }
    this.bestDot = maxIndex;
    
    if(this.dots[this.bestDot].reachedGoal){
      this.minStep = this.dots[this.bestDot].brain.step;
      console.log("steps: ", this.minStep);
    }
  }
}