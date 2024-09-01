let population;

function setup() {
  createCanvas(800, 800);
  population = new Population(1000);
}

function draw() {
  background(220);
  
  if(population.allDotsDead()){
    population.calculateFitness();
    population.naturalSelection();
    population.mutate();
  }else{
    population.show();
    population.update();
  }
}