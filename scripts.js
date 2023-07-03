//Pegando os elementos que iremos manipular
const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('form')
const input = document.querySelector('input')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let pokemonAtual = 4

//Função que irá realizar requisicação na API
async function fetchPokemon(pokemon){
    //Definindo a url
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    //Realizando a requisição com feth
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    //retornar o pokemon
    return data
}

//criar função que irá carregar o pokemon no body
async function renderPokemon(pokemon){
    pokemonName.innerText = 'Carregando'
    pokemonNumber.innerText = ""

    const data = await fetchPokemon(pokemon)
    if (data){
        pokemonName.innerText = data.name
        pokemonNumber.innerText = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ""
        pokemonAtual = data.id
    }
    else{
        pokemonImage.style.display = 'none'
        pokemonName.innerText = 'Não encontrado'
    }
}

//Funcao submit do formulario
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let pokemon = input.value
    renderPokemon(pokemon)
})

//Eventos dos botoes btn next e btnprev
btnPrev.addEventListener('click', () =>{
    if (pokemonAtual > 1){
        pokemonAtual--
        renderPokemon(pokemonAtual)
    }
})
btnNext.addEventListener('click',() =>{
    if (pokemonAtual < 1000){
        pokemonAtual++
        renderPokemon(pokemonAtual)
    }
})
renderPokemon(pokemonAtual)

