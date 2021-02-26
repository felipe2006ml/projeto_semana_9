async function buscaChamp() {
    const selectChamp = document.getElementById('select-champ')

    let url = `http://ddragon.leagueoflegends.com/cdn/11.4.1/data/pt_BR/champion.json`

    const response = await fetch(url)
    const dadosJSON = await response.json()

    let qtChamp = Object.keys(dadosJSON.data)

    for(i=0;i<qtChamp.length;i++) {
        selectChamp.innerHTML +=
        `<option value="${qtChamp[i]}">${qtChamp[i]}</option>
        `
    }
}

buscaChamp()

async function showChamp(nome) {
    let contentChamp = document.getElementById('content-champ')

    let url = `http://ddragon.leagueoflegends.com/cdn/11.4.1/data/pt_BR/champion/${nome}.json`


    const response = await fetch(url)
    const dadosJSON = await response.json()

    let dados = dadosJSON.data

    

    contentChamp.innerHTML =
    `<div>
        <h1>${dados[nome].name}<h1>
        <h5>${dados[nome].title}</h5>
        <p>${dados[nome].lore}</p>
        <div>
            <p>Ataque: ${dados[nome].info["attack"]}</p>
            <p>Defesa: ${dados[nome].info["defense"]}</p>
            <p>Magia: ${dados[nome].info["magic"]}</p>
            <p>Dificuldade: ${dados[nome].info["difficulty"]}</p>
        </div>
    </div>
    <div id="skins">
        
    </div>
    <div id="infolevel">
    <input type="number" min="1" max="18" value="1" id="input-level" onchange=${level(this.value)}>
        
    </div>
    `

    let aux = 0
    function rascunho() {
        
        
        let dadosSkin = dados[nome].skins.length
        let auxurl = dados[nome].skins[aux].num
        if(aux < (dadosSkin - 1)) {
            skins.innerHTML =
            `<img src="${`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nome}_${auxurl}.jpg`}">
            `
            aux = aux + 1
        } else {
            aux = 0
        }
    }
    

    setInterval(rascunho, 2000)



}

function level(nivel1) {

    console.log(nivel1)

}
