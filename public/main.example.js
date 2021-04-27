let formas = [];
let entities = [];
function setup() {
    createCanvas(400, 400)
  // EL PRIMER EQUIPO TIENE UN CAPITAN CON UN RPG QUE SACA MAS DAÑO
    let miembros1 = []
    miembros1.push(new Circulo(124,52,new RPG(miembros1)))
    miembros1.push(new Circulo(100,50,new Arma(miembros1)))
    miembros1.push(new Circulo(120,56,new Arma(miembros1)))
    miembros1.push(new Circulo(105,32,new Arma(miembros1)))
    miembros1.push(new Circulo(105,32,new Arma(miembros1)))
        

    let miembros2 = []
// EL SEGUNDO EQUIPO ES UN NEMESIS QUE NO TIENE ARMA, TIENE MAS VIDA Y MAS VELOCIDAD,  SOLO MATA ATRAPANDO A LOS OTROS MIEMBROS
    miembros2.push(new Aura(new Nemesis(300,10,new Arma(miembros2))))
    
     
  // EL JUEGO FINALIZA SI GANA EL NEMESIS O SI MUERE
    
    entities.push(new Equipo(150, miembros1));
    entities.push(new Equipo(10, miembros2))
    
    let capitan = new ObserverMuertesCapitan()
    let nemesis = new ObserverMuerteNemesis()
    miembros1[0].attach(capitan)
    miembros2[0].attach(nemesis)
   

    let observadores = new ObserverEquipo1CantidadRestante('Salvador', miembros1.length)
    for(let i = 0 ; i < miembros1.length; i++){
        miembros1[i].attach(observadores)
    }
   
}



function draw() {

    background(220)

    //BORRAR LOS QUE NO TIENEN VIDA
    for(let i=0; i < entities.length; i++){
        if(entities[i].dameVida() <= 0){
            entities.splice(i,1);
            i--
        }       
    }

    for(let i = 0; i< entities.length; i++){
        for(let j= i+1; j < entities.length; j++){
            entities[i].chocar(entities[j])
        }
    }

    for (let i=0;i<entities.length;i++){
       
            entities[i].tick()


    }

   

     Mensajes.mostrar()
    
}

function mousePressed(){
    let bala = new Bala(V(200,200), p5.Vector.random2D())
    entities.push(bala)
}