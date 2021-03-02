const allItens = document.getElementById('all-itens')
const contentItens = document.getElementById('content-itens')
let dados = 0

async function buscaItens() {
    let url = 'http://ddragon.leagueoflegends.com/cdn/11.4.1/data/pt_BR/item.json'

    const response = await fetch(url)
    const dadosJSON = await response.json()

    dados = Object.values(dadosJSON.data)

    console.log(dados)
    
    for(i=0;i<dados.length;i++) {
        allItens.innerHTML +=
        `<img id="item${i}" onclick="itenDetail(${i}, dados)" src="http://ddragon.leagueoflegends.com/cdn/11.4.1/img/item/${dados[i].image.full}">
        `
    }
    
    
}

buscaItens()

function itenDetail(pos, dados) {
    contentItens.innerHTML =
    `<p>Nome: ${dados[pos].name}</p>
    <p>Descrição: ${dados[pos].description}</p>
    <p>Valor: ${dados[pos].gold.base}</p>
    <div>
    <img id="item${i}" onclick="itenDetail(${i}, dados)" src="http://ddragon.leagueoflegends.com/cdn/11.4.1/img/item/${dados[pos].image.full}">
    </div>
    `
}