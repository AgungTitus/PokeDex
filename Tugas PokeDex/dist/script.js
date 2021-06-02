let pokemonIndex = 1;
let pokemonData = {};

const pokeball = `<svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M94.8571 70.2578C92.5306 85.1708 79.5918 96.5892 63.9592 96.5892C48.3265 96.5892 35.3878 85.1708 33.0612 70.2578H0C3.14286 102.644 30.6122 128 64 128C97.3878 128 124.816 102.644 128 70.2578H94.8571Z" fill="white" fill-opacity="0.4"/>
        <path d="M64 87.8933C77.2548 87.8933 88 77.1959 88 64C88 50.8041 77.2548 40.1066 64 40.1066C50.7452 40.1066 40 50.8041 40 64C40 77.1959 50.7452 87.8933 64 87.8933Z" fill="white" fill-opacity="0.4"/>
        <path d="M33.6735 57.7422C37.1429 44.2921 49.3878 34.3365 64 34.3365C78.6122 34.3365 90.8571 44.2921 94.2857 57.7422H127.959C124.816 25.3562 97.3469 0 64 0C30.6122 0 3.14286 25.3562 0 57.7422H33.6735Z" fill="white" fill-opacity="0.4"/>
        </svg>`;

function setInitialState() {
  getPokemons(50);
}

const showList = function() {
  document.querySelector("#pokemon-info").style.display = "none";
  document.querySelector("#pokemon-list").style.display = "block";
}

const fetchPokemon = async function(i){
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
    .then(async function(response) {
      let respuesta = await response.json();
      return respuesta;
    });
}

const getPokemons = async function(quantity) {
  for (let i = 0; i < quantity; i++) {
    let pokemon = await fetchPokemon(i);
    setPokemon(pokemon);
  }
}

const setPokemon = async function(pokemon) {
  pokemonData[pokemon.name] = pokemon;
  let markup = `
    <div class="col s12 m6 l4">
      <div class="pokemon-card ${pokemon.types[1] ? pokemon.types[1].type.name : pokemon.types[0].type.name}">
        <div class="row right-align number">
          <span>${pokemon.id}</span>
        </div>
        <div class="row avatar">
          <div class="col s7 left">
            <h5>${pokemon.name}</h5>
            ${pokemon.types.map(function (key) {
              return "<span>" + key.type.name + "</span>"           
            }).join("")}
          </div>
          <div class="col right-align right">
            <img width="80" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" data-id="${pokemon.name}">
            <div class="pokebola-fondo">
              ${pokeball}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  pokemonIndex++;
  document.getElementById("pokemon-list").innerHTML += markup;

  let pokemonCard = document.querySelectorAll(".pokemon-card img");

  pokemonCard.forEach(function(card) {
    card.addEventListener('click', function(e){
      setPokemonDetails(pokemonData[e.target.dataset.id])
    });
  });
}

const setPokemonDetails = function(pokemon) {
  document.querySelector("#pokemon-info").style.display = "block";
  document.querySelector("#pokemon-list").style.display = "none";
  document.querySelector("#pokemon-info").setAttribute("class", `${pokemon.types[1] ? pokemon.types[1].type.name : pokemon.types[0].type.name}`);
  document.querySelector(".info-block-2 img").setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`);
  document.querySelector(".info-block-2 span").innerHTML = pokemon.id;
  document.querySelector(".info-block-1 .pills").innerHTML = pokemon.types.map(function(key){return "<span>"+key.type.name+"</span>"}).join("");
  document.querySelector("#tab-1 .height").innerHTML = pokemon.height;
  document.querySelector("#tab-1 .weight").innerHTML = pokemon.weight;
  document.querySelector("#tab-1 .abilities").innerHTML = pokemon.abilities.map(function(key){return key.ability.name}).join(", ");
  document.querySelector("#tab-2 .hp").innerHTML = pokemon.stats[5].base_stat;
  document.querySelector("#tab-2 .speed").innerHTML = pokemon.stats[0].base_stat;
  document.querySelector("#tab-2 .special-defense").innerHTML = pokemon.stats[1].base_stat;
  document.querySelector("#tab-2 .special-attack").innerHTML = pokemon.stats[2].base_stat;
  document.querySelector("#tab-2 .defense").innerHTML = pokemon.stats[3].base_stat;
  document.querySelector("#tab-2 .attack").innerHTML = pokemon.stats[4].base_stat;
  document.querySelector("#tab-3 table").innerHTML = pokemon.moves.map(function(key){return "<tr><td>"+key.move.name+"</td></tr>"}).join("");

}

setInitialState();

document.getElementById("loadmore").addEventListener('click', function(){getPokemons(50)});
document.querySelector(".back").addEventListener('click', function(){showList()});
document.querySelector(".list").addEventListener('click', function(){showList()});

M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});