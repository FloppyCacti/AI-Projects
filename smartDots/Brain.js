class Brain{
  constructor(size){
    this.size = size;
    this.directions = new Array(this.size);
    this.step = 0;
    for (let i = 0; i < this.size; i++){
      let randomAngle = random(2*PI);
      this.directions[i] = p5.Vector.fromAngle(randomAngle);
    }
  }
  
  clone(){
    let clone = new Brain(this.size);
    for(let i = 0; i < this.size; i++){
      clone.directions[i] = this.directions[i];
    }
    return clone;
  }
  
  mutate(){
    const mutationRate = 0.01;
    for(let i = 0; i < this.size; i++){
      let rand = random(1);
      if(rand < mutationRate){
        let randomAngle = random(2*PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }
}