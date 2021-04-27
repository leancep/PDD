class FiguraAbstracta {

    constructor(x,y,arma){
        this.posicion = V(x,y)
        this.velocidad = V(Math.random(),Math.random())
        this.vida = 100
        this.observers = []
       
        this.arma = arma
    }

    attach(observer){
        this.observers.push(observer)
    }
    dameVida(){
        return this.vida
    }

    sacarVida(vida){
        this.vida -= vida
        if(this.vida <= 0){
            for(let i=0;i< this.observers.length; i++){
                this.observers[i].murio(this)
            }
        }
    }

    mover(){
        this.posicion.add(this.velocidad)
        this.arma.disparar(this)
    }
    rebotar(){
        throw new Error("Falta implementar")
    }
    dibujar(){
        throw new Error("Falta implementar")
    }
    tick(){
        this.mover()
        this.rebotar()
        this.dibujar()
    }
}


class CirculoGrande extends FiguraAbstracta{

    
    diametro = 18
    // mover(){
    //     if(Math.random() < 0.01){
    //         this.velocidad.x = -this.velocidad.x
    //     }
    //     super.mover()
    // }
    rebotar(){
        if(this.posicion.x > (400-this.diametro/2)){
            this.posicion.x = (400-this.diametro/2)
            this.velocidad.x = -this.velocidad.x

        }
        if (this.posicion.x < this.diametro/2){
            this.posicion.x = this.diametro/2
            this.velocidad.x = -this.velocidad.x
        }
        if(this.posicion.y > (400-this.diametro/2)){
            this.posicion.y = (400-this.diametro/2)
            this.velocidad.y = -this.velocidad.y

        }
        if (this.posicion.y < this.diametro/2){
            this.posicion.y = this.diametro/2
            this.velocidad.y = -this.velocidad.y
        }
    }
    dibujar(){
        circle(this.posicion.x, this.posicion.y, this.diametro)
    }

    chocarCirculo(otro){

        if(distancia(this.posicion, otro.posicion) < this.diametro/2 + otro.diametro/2){
            this.sacarVida(25)
            otro.sacarVida(100)
        }
    }

    chocarCirculoGrande(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro){
            this.sacarVida(100)
            otro.sacarVida(100)
        }
    }

    chocarNemesis(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro){
            this.sacarVida(100)
            otro.sacarVida(100)
        }
    }
    chocarBala(bala){
        bala.chocarCirculoGrande(this)
    }
    chocar(otro){

        otro.chocarCirculoGrande(this)

    }
   
}

class Circulo extends FiguraAbstracta{
    
    diametro = 10
   
    rebotar(){
        if(this.posicion.x > (400-this.diametro/2)){
            this.posicion.x = (400-this.diametro/2)
            this.velocidad.x = -this.velocidad.x

        }
        if (this.posicion.x < this.diametro/2){
            this.posicion.x = this.diametro/2
            this.velocidad.x = -this.velocidad.x
        }
        if(this.posicion.y > (400-this.diametro/2)){
            this.posicion.y = (400-this.diametro/2)
            this.velocidad.y = -this.velocidad.y

        }
        if (this.posicion.y < this.diametro/2){
            this.posicion.y = this.diametro/2
            this.velocidad.y = -this.velocidad.y
        }
    }
    dibujar(){
        circle(this.posicion.x, this.posicion.y, this.diametro)
    }
    chocarBala(bala){
        bala.chocarCirculo(this)
    }
    chocarCirculo(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro){
            this.sacarVida(100)
            otro.sacarVida(100)
        }
    }

    chocarCirculoGrande(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro/2 + otro.diametro/2){
            this.sacarVida(100)
            otro.sacarVida(25)
        }
    }
    chocarNemesis(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro){
            this.sacarVida(100)
            otro.sacarVida(100)
        }
    }

    chocar(otro){

        otro.chocarCirculo(this)
      
    }
}


class ObserverMuertesCapitan {
    murio(sujeto) {
        Mensajes.agregar("Se murio el capitan y perdio su RPG")
    }
}

class ObserverMuerteNemesis {
    murio(sujeto) {
        Mensajes.agregar("Se murio el NEMESIS")
        Mensajes.agregar("Se ha salvado la Humanidad")
        noLoop();
    }

}


class Equipo extends FiguraAbstracta {
    constructor(color, miembros){
        super(0,0)
        this.miembros = miembros
        this.color = color
    }

    dameVida(){
        for(let i=0; i< this.miembros.length;i++){
            if(this.miembros[i].dameVida() <= 0){
                this.miembros.splice(i,1)
                i--
            }
        }
        return this.miembros.length
    }
    chocar(otro){
        for(let i=0; i< this.miembros.length; i++){
            otro.chocar(this.miembros[i])
        }
    }
    chocarCirculo(chico){
        this.chocar(chico)
    }
    chocarCirculoGrande(grande){
        this.chocar(grande)
    }
    chocarNemesis(nemesis){
        this.chocar(nemesis)
    }

    chocarBala(bala){
        bala.chocarCirculo(this)
    }

    mover(){
        for(let i=0; i< this.miembros.length; i++){
            this.miembros[i].mover()
        }
    }
    rebotar(){
        for(let i=0; i< this.miembros.length; i++){
            this.miembros[i].rebotar()
        }
    }
    dibujar(){
        push()
        fill(this.color)
        for(let i=0; i< this.miembros.length; i++){
            this.miembros[i].dibujar()
        }
        pop()
    }
}

class Bala extends FiguraAbstracta {
    constructor (posicion, direccionOriginal){
        super(posicion.x, posicion.y)
        let direccion = V(direccionOriginal.x, direccionOriginal.y)
        direccion.normalize()
        direccion.mult(4)
        this.velocidad = direccion
    }
    mover(){
        this.posicion.add(this.velocidad)
    }

    rebotar(){
        if(this.posicion.x > 400 || this.posicion.x < 0){
            this.sacarVida(100)
        }
        if(this.posicion.y > 400 || this.posicion.y < 0){
            this.sacarVida(100)
        }
    }

    dibujar(){
        push()
        strokeWeight(0)
        fill(255,0,0)
        circle(this.posicion.x, this.posicion.y, 4)
        pop()
    }
    chocarBala(bala){
        if(distancia(this.posicion, bala.posicion) < 4){
            this.sacarVida(this.dameVida())
            bala.sacarVida(bala.dameVida())
        }
    }
    chocar(otro) {
        otro.chocarBala(this)
    }
    chocarCirculo(chico){
        if(distancia(this.posicion, chico.posicion) < chico.diametro/2+2){
            this.sacarVida(this.dameVida())
            chico.sacarVida(25)
        }
    }
    chocarCirculoGrande(grande){
        if(distancia(this.posicion, grande.posicion) < grande.diametro /2 +2){
            this.sacarVida(this.dameVida())
            grande.sacarVida(10)
        }
    }

    chocarNemesis(nemesis){
        if(distancia(this.posicion, nemesis.posicion) < nemesis.diametro /2 +2){
            this.sacarVida(this.dameVida())
            nemesis.sacarVida(10)
            Mensajes.agregar('SE HA ACERTADO UN DISPARO '+ 'VIDA RESTANTE: '+ nemesis.vida)
        }
    }
}

class Misil extends FiguraAbstracta {
    constructor (posicion, direccionOriginal){
        super(posicion.x, posicion.y)
        let direccion = V(direccionOriginal.x, direccionOriginal.y)
        direccion.normalize()
        direccion.mult(4)
        this.velocidad = direccion
    }
    mover(){
        this.posicion.add(this.velocidad)
    }

    rebotar(){
        if(this.posicion.x > 400 || this.posicion.x < 0){
            this.sacarVida(100)
        }
        if(this.posicion.y > 400 || this.posicion.y < 0){
            this.sacarVida(100)
        }
    }

    dibujar(){
        push()
        strokeWeight(0)
        fill(255,0,0)
        rect(this.posicion.x, this.posicion.y, 4, 8)
        pop()
    }
    chocarBala(bala){
        if(distancia(this.posicion, bala.posicion) < 4){
            this.sacarVida(this.dameVida())
            bala.sacarVida(bala.dameVida())
        }
    }
    chocar(otro) {
        otro.chocarBala(this)
    }
    chocarCirculo(chico){
        if(distancia(this.posicion, chico.posicion) < chico.diametro/2+2){
            this.sacarVida(this.dameVida())
            chico.sacarVida(100)
        }
    }
    chocarCirculoGrande(grande){
        if(distancia(this.posicion, grande.posicion) < grande.diametro /2 +2){
            this.sacarVida(this.dameVida())
            grande.sacarVida(100)
        }
    }

    chocarNemesis(nemesis){
        if(distancia(this.posicion, nemesis.posicion) < nemesis.diametro /2 +2){
            this.sacarVida(this.dameVida())
            nemesis.sacarVida(35)
        }
    }
}

class Arma {
    constructor (mundo) {
        this.mundo = mundo
        this.contador = 60
    }
    disparar(sujeto) {
        this.contador -= 1
        if(this.contador <= 0){
            this.contador = 60
            let direccion = sujeto.velocidad.copy()
            let posicionBala = sujeto.posicion.copy()
            direccion.mult(sujeto.diametro / 2 + 2)
            posicionBala.add(direccion)
            let mibala = new Bala(posicionBala,direccion)
            this.mundo.push(mibala)
        }
        
    }
}

class RPG {
    constructor (mundo) {
        this.mundo = mundo
        this.contador = 60
    }
    disparar(sujeto) {
        this.contador -= 1
        if(this.contador <= 0){
            this.contador = 60
            let direccion = sujeto.velocidad.copy()
            let posicionBala = sujeto.posicion.copy()
            direccion.mult(sujeto.diametro / 2 + 2)
            posicionBala.add(direccion)
            let mibala = new Misil(posicionBala,direccion)
            this.mundo.push(mibala)
        }
        
    }
}

class Aura {
    constructor(figura){
        this.figura = figura
       
    }

    attach(observer){
        return this.figura.attach(observer)
    }
    mover(){
        return this.figura.mover()
    }
    rebotar(){
        return this.figura.rebotar()
    }
    chocar(){
        return this.figura.chocar()
    }
    dameVida(vida){
        return this.figura.dameVida(vida)
    }
    sacarVida(vida){
        
        return this.figura.sacarVida(vida)
    }
    chocarBala(bala){
        return this.figura.chocarBala(bala)
    }
    chocarCirculo(chico){
        return this.figura.chocarCirculo(chico)
    }
    chocarCirculoGrande(grande){
        return this.figura.chocarCirculoGrande(grande)
    }
    chocarNemesis(nemesis){
        return this.figura.chocarNemesis(nemesis)
    }
    dibujar(){
        push()
        fill(126,25,17)
        circle(this.figura.posicion.x, this.figura.posicion.y,30)
        pop()
        return this.figura.dibujar()
    }

}

class Nemesis extends FiguraAbstracta{

    vida = 135
    diametro = 18
    velocidad = V(Math.random()*5,Math.random()*5)
     mover(){
        
        this.posicion.add(this.velocidad)
      
    }
    rebotar(){
        if(this.posicion.x > (400-this.diametro/2)){
            this.posicion.x = (400-this.diametro/2)
            this.velocidad.x = -this.velocidad.x

        }
        if (this.posicion.x < this.diametro/2){
            this.posicion.x = this.diametro/2
            this.velocidad.x = -this.velocidad.x
        }
        if(this.posicion.y > (400-this.diametro/2)){
            this.posicion.y = (400-this.diametro/2)
            this.velocidad.y = -this.velocidad.y

        }
        if (this.posicion.y < this.diametro/2){
            this.posicion.y = this.diametro/2
            this.velocidad.y = -this.velocidad.y
        }
    }
    dibujar(){
        push()
        fill(255,17,0)
        circle(this.posicion.x, this.posicion.y, this.diametro)
        pop()
    }

    chocarCirculo(otro){

        if(distancia(this.posicion, otro.posicion) < this.diametro/2 + otro.diametro/2){
            this.sacarVida(15)
            otro.sacarVida(100)
            Mensajes.agregar('VIDA RESTANTE: '+this.vida)
        }
    }

    chocarCirculoGrande(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro){
            this.sacarVida(15)
            otro.sacarVida(100)
        }
    }

    chocarNemesis(otro){
        if(distancia(this.posicion, otro.posicion) < this.diametro){
            this.sacarVida(100)
            otro.sacarVida(100)
        }
    }
    chocarBala(bala){
        bala.chocarNemesis(this)
    }
    chocar(otro){

        otro.chocarNemesis(this)

    }
   
}

class ObserverEquipo1CantidadRestante {
   constructor (nombre, miembros){
       this.nombre = nombre
       this.miembros = miembros
   } 
   murio(sujeto){
        this.miembros--
        Mensajes.agregar("Equipo "+
        this.nombre +" todavia tiene "+
        this.miembros +" miembros")
        if(this.miembros==0){
            Mensajes.agregar("GAME OVER, EL NEMESIS ACABO CON TODOS")
            noLoop()
        }
   }
}


/*
class Cuadrado extends FiguraAbstracta{
 
        width = 30
        height = 30
    
    rebotar(){
        if(this.posicion.x > 370 || this.posicion.x < 0){
            this.velocidad.x = -this.velocidad.x
        }
        if(this.posicion.y > 370 || this.posicion.y < 0){
            this.velocidad.y = -this.velocidad.y
        }
    }
    
    dibujar(){
        //circle(this.posicion.x, this.posicion.y, this.diametro)
        rect(this.posicion.x, this.posicion.y, this.width, this.height)
    }


}*/