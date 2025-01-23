import React, { useState, useEffect } from "react"
import cabeza from "./imagene_Ahorcado/ahorcado_cabeza.PNG"
import ambaspiernas from "./imagene_Ahorcado/ahorcado_ambasPiernas.PNG";
import ambosbrazos from "./imagene_Ahorcado/ahorcado_ambosBrazos.PNG";
import cabezacuerpo from "./imagene_Ahorcado/ahorcado_cabeza_cuerpo.PNG";
import cuerpobrazo from "./imagene_Ahorcado/ahorcado_cuerpo_brazo.PNG";
import pierna from "./imagene_Ahorcado/ahorcado_pierna.PNG";
import palo from "./imagene_Ahorcado/ahorcado_palo.PNG"
import "./StyleAhorcado.css"

export default function Ahorcado() {
  const [secreta, setSecreta] = useState("")
  const [estado, setEstado] = useState("")
  const [turno, setTurno] = useState(0)
  const [fallas, setFallas] = useState(0)
  const [mensaje, setMensaje] = useState("")
  const [imagenes, setImagenes]=useState([])
  const [letrasAdivinadas, setLetrasAdivinadas]= useState([])

  const imagen=[palo,cabeza,cabezacuerpo,cuerpobrazo,ambosbrazos,pierna,ambaspiernas]
  const fallasMaximas = 6;
  const palabras = ["perro", "ficcion", "aristoteles", "viagra", "bebesote","marica","enfermo","hermano","mario", "zelda", "metroid", "pokemon", "fortnite", "minecraft", 
  "halo", "dota", "warcraft", "overwatch", "valorant", "cyberpunk", 
  "tetris", "arcade", "fallout", "eldenring", "horizon", "bloodborne"]


  const escondeLetras = (palabra) => {
    return palabra.replace(/./g, "*");
  };


  const cambiaLetra = (palabra, letra, estadoActual) => {
    return palabra.split("").map((char, index) => (char === letra ? letra : estadoActual[index])).join("");
  };

  const reiniciarJuego=()=>{
    const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    setSecreta(palabraAleatoria);
    setEstado(escondeLetras(palabraAleatoria));
    setImagenes([palo])
    setTurno(0)
    setFallas(0)
    setMensaje("")
    setLetrasAdivinadas([])
  }

  useEffect(() => {
    reiniciarJuego()
  }, []);


  const adivinarLetra = (letra) => {
    if(letrasAdivinadas.includes(letra)){
      setMensaje("esa letra ya fue seleccionada")
      return
    }

    setLetrasAdivinadas((prev) => [...prev, letra]);

    if (fallas == fallasMaximas) {
      setMensaje("El juego ha terminado. Gracias por jugar.");
      return;
    }

    if (secreta.includes(letra)) {
      
      const nuevoEstado = cambiaLetra(secreta, letra, estado);
      setEstado(nuevoEstado);

      if (!nuevoEstado.includes("*")) {
        setMensaje(`¡Felicitaciones! Adivinaste la palabra: "${secreta}"`);
        return;
      }
   
      
      if(nuevoEstado.includes(letrasAdivinadas)){
        setMensaje("esa letra ya fue seleccionada")
      }

      setMensaje(`¡Correcto! La letra "${letra}" está en la palabra.`);


    } else {
      setFallas((prevFallas) => prevFallas + 1);
      setImagenes(() => [ imagen[fallas + 1]])
      setMensaje(`La letra "${letra}" no está en la palabra.`);
    }

    setTurno((prevTurno) => prevTurno + 1);

    if (fallas + 1 >= fallasMaximas) {
      setMensaje(`Lo lamento, perdiste. La palabra era: "${secreta}".`);
    }
  };

  return (
    <div className="cuerpo">

      <div className="ahorcado">
        
        
       
    <div className="principals_ahorcado">

      <div className="header_ahorcado">
      <p className="words">Juego de Adivinanza</p>
      <p className="words">Turno: {turno}</p>
      <p className="words">Fallas: {fallas}/ {fallasMaximas}</p>
      <div className="btn_reiniciar_ahorcado" onClick={()=>{
        reiniciarJuego()
      }}>reiniciar juego</div>
      </div>

        <div className="todo">

      <div className="imagenes">      
        {imagenes.map((element,index)=>{
          return(
            <img className= "ahoracado_diseño" key={index} src={element}  />
        )})}
      </div>
    </div>

      <div className="Mensajes_ahor">
        <p className="mensajes_ahorcado">{mensaje}</p>
        <p className="adivina">adivina la palabra: {estado}</p>

      </div>
  
        <div className="word">
      {fallas < fallasMaximas && estado.includes("*") && (
        <input className= "ahorcado_input"type="text" maxLength="1" onKeyDown={(e) => 
          { if (e.key === "Enter" && e.target.value) {
              adivinarLetra(e.target.value.toLowerCase());
              e.target.value = "";
            }
          }}
          placeholder="Adivina una letra"
        />
      )}
      </div>

      </div>
    </div>    
</div>
  );
}
