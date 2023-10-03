const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const clickPokemon = document.getElementById('pokemon-content');
const modal = document.getElementById("myModal");
var id = 0;
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number" id="poke">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     
            </div>
            <div class="local-button">
                <button class= "button" onclick="pokeDetailClick(${pokemon.number})">Info</button>
            </div>
        </li>
    `
}


function convertPokemonDetail(pokemon) {
    return `

        
        <li class="pokemonModal">
            <div class="capa ${pokemon.type}">
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
                <ol class="types">
                    <span class="name">${pokemon.name}</span>
                     ${`<li class="type ${pokemon.type}"> ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}</li>`}
                </ol>
            </div>

            <div class="detailModal">
                <ol class="abilities">
                    <span class="name">Habilidades</span>
                    ${`<li class="ability "> ${pokemon.abilities.map((ability) => `<li class="type ${pokemon.ability}">${ability}</li>`).join('')}</li>`}
                </ol>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function pokeDetailClick(id){
    const detail =  pokeApi.getPokemon(id).then(function (response){
        newHtml = convertPokemonDetail(response)
         modal.innerHTML = newHtml
         modal.style.display = "block";
    })
}



