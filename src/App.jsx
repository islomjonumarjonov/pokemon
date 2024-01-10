import React, { useEffect, useState } from "react";

async function getData(num = Math.ceil(Math.random() * 800)) {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`);
  const data = await req.json();

  return data;
}

function App() {
  const [img, useImg] = useState(null);
  const [attack, useAttack] = useState(null);
  const [defense, useDefense] = useState(null);
  const [speed, useSpeed] = useState(null);
  const [hp, useHp] = useState(null);
  const [type, useType] = useState("normal");
  const [name, useName] = useState(null);
  const [style, useStyle] = useState(null);

  //

  const colorRandom = Math.ceil(Math.random() * 3);
  function getClass(numb) {
    return numb == 1 ? "s1" : numb == 2 ? "s2" : "s3";
  }
  function getPokemon() {
    getData().then((data) => {
      useImg(data.sprites.other.dream_world.front_default);
      useHp(data.stats[0].base_stat);
      useAttack(data.stats[1].base_stat);
      useDefense(data.stats[2].base_stat);
      useSpeed(data.stats[5].base_stat);
      useType(data.types[0].type.name);
      useName(data.name);

      // console.log(data);

      const st = getClass(colorRandom);
      useStyle(st);
    });
  }

  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className={`image ${style}`}>
          <img src={img} height={300} width={300} />
        </div>
        <p className="hp">Hp: {hp}</p>
        <h2>{name}</h2>
        <p className="type">{type}</p>
        <div className="info">
          <p className="info_p">
            <span>{attack}</span>
            Attack
          </p>
          <p className="info_p">
            <span>{defense}</span>
            Defense
          </p>
          <p className="info_p">
            <span>{speed}</span>
            Speed
          </p>
        </div>
      </div>
      <button onClick={getPokemon}>Generate</button>
    </div>
  );
}

export default App;

//////////
