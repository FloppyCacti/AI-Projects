let population;

function setup() {
  createCanvas(800, 800);
  population = new Population(1000);
}

function draw() {
  background(220);
  textSize(32);
  text("Generation: " + population.gen, 10, 30);

  if(population.minStep < 400){
    text("Min Steps: " + population.minStep, 10, 70);
  }else{
    text("Min Steps: Goal not reached", 10, 70)
  }
  
  if(population.allDotsDead()){
    population.calculateFitness();
    population.naturalSelection();
    population.mutate();
  }else{
    population.show();
    population.update();
  }
}