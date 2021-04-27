Instalar
========

npm install

Renombrar los archivos:

- public/classes.example.js => public/classes.js
- public/main.example.js    => public/main.js

Correr
======

Si tenemos nodejs instalado:

npm run dev

Si no lo tenemos instalado:

Abrímos el archivo public/index.html con un browser.



SE APLICA MODALIDAD DE JUEGO NEMESIS VS HUMANIDAD
EL NEMESIS ES UNA FIGURA CON MAS VIDA, MAS GRANDE Y VELOZ QUE CORRE EN BUSCA DE SUS VICTIMAS. NO TIENE ARMA.
EN EL OTRO EQUIPO ESTAN LOS SOLDADO QUE TIENEN SUS ARMAS, JUNTO CON UN CAPITAN QUE TIENE UN RPG QUE LANZA MISILES CON MAYOR DAÑO
EL JUEGO FINALIZA CUANDO EL NEMESIS ASESINA A LOS SOLDADOS O LOS SOLDADOS ASESINAN AL NEMESIS EN UNA LUCHA CRUCIAL PARA SALVAR LA HUMANIDAD

CADA VEZ QUE EL NEMESIS RECIBE UN IMPACTO DE BALA, APARECEN NOTIFICACIONES DE LO SUCEDIDO JUNTO CON LA VIDA RESTANTE DEL MONSTRUO
A SU VEZ CADA VEZ QUE EL NEMESIS ASESINA A UN SOLDADO, ESTE RECIBE UN MINIMO DAÑO A CAUSA DEL IMPACTO Y APARECE NOTIFICACION DE LA VIDA RESTANTE 
Y DE QUE EL EQUIPO DE SOLDADOS PERDIO A UN MIEMBRO
SI EL CAPITAN MUERE, SURGE LA NOTIFICACION DE SU MUERTE JUNTO CON LA PERDIDA DE SU ARMA RPG
SI EL NEMESIS ASESINA A TODO EL EQUIPO DE SOLDADOS; EL JUEGO SE DETIENE JUNTO CON UNA NOTIFICACION "GAME OVER"
SI LOS SOLDADOS ASESINAN AL NEMESIS; EL JUEGO SE DETIENE JUNTO CON LA LEYENDA " EL NEMESIS HA MUERTO; SE HA SALVADO A LA HUMANIDAD"

Patrones de diseño utilizados: 

Double dispatch, para manejar la simulacion de choques entre distintas figuras. 

Composite, para que todo funcione comportandose de la misma forma, es decir, el juego funciona independientemente de si juegan equipos, figuras individuales o ambas.

Decorator, En el caso del AURA que se le da al Nemesis, es una clase que decora a su figura.

Observers, En el caso del sistema de mensajes o de ver si finaliza el juego, se aplicaron observers que dan mensajes cuando ocurre algo.

