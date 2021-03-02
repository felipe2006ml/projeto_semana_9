let dados = 0
let sliderPhoto = 0

async function buscaChamp() {
    const selectChamp = document.getElementById('select-champ')

    let url = `https://ddragon.leagueoflegends.com/cdn/11.4.1/data/pt_BR/champion.json`

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
    let detailFight = document.getElementById('detail-fight')
    let skillsChamp = document.getElementById('skills-champ')

    let url = `https://ddragon.leagueoflegends.com/cdn/11.4.1/data/pt_BR/champion/${nome}.json`


    const response = await fetch(url)
    const dadosJSON = await response.json()

    dados = dadosJSON.data[nome]

    console.log(dados.spells)

    contentChamp.innerHTML =
    `<div id="geral-champ">
        <h2>${dados.name}<h2>
        <h5>${dados.title}</h5>
        <p>${dados.lore}</p>
        <div>
            <p>Ataque: ${dados.info["attack"]}</p>
            <p>Defesa: ${dados.info["defense"]}</p>
            <p>Magia: ${dados.info["magic"]}</p>
            <p>Dificuldade: ${dados.info["difficulty"]}</p>
        </div>
    </div>
    <div id="skins">
        
    </div>
    <div id="stats-level">
        <h2>Nivel</h2>
        <input type="number" min="1" max="18" id="input-level" onchange="statsLevel()" value="1">
        <div id="content-stats">
        </div>
    </div>
    `
    detailFight.innerHTML =
    `<div id="jogando-com">
        <h3>Jogando com:</h3>
        <p>${dados.allytips[0]??""}</p>
        <p>${dados.allytips[1]??""}</p>
        <p>${dados.allytips[3]??""}</p>
        <p>${dados.allytips[3]??""}</p>
    </div>
    <div id="jogando-contra">
        <h3>Jogando contra:</h3>
        <p>${dados.enemytips[0]??""}</p>
        <p>${dados.enemytips[1]??""}</p>
        <p>${dados.enemytips[2]??""}</p>
        <p>${dados.enemytips[3]??""}</p>
    </div>
    `
   skillsChamp.innerHTML =
   `<div id="habilidades">
    <img id="passiva" onclick="showHabPass(dados.passive)" class="hab-active" src="https://ddragon.leagueoflegends.com/cdn/11.4.1/img/passive/${dados.passive.image.full}">
    <img id="${dados.spells[0].id}" onclick="showHab(dados.spells[0], dados)" class="hab-no-active" src="https://ddragon.leagueoflegends.com/cdn/11.4.1/img/spell/${dados.spells[0].image.full}">
    <img id="${dados.spells[1].id}" onclick="showHab(dados.spells[1], dados)" class="hab-no-active" src="https://ddragon.leagueoflegends.com/cdn/11.4.1/img/spell/${dados.spells[1].image.full}">
    <img id="${dados.spells[2].id}" onclick="showHab(dados.spells[2], dados)" class="hab-no-active" src="https://ddragon.leagueoflegends.com/cdn/11.4.1/img/spell/${dados.spells[2].image.full}">
    <img id="${dados.spells[3].id}" onclick="showHab(dados.spells[3], dados)" class="hab-no-active" src="https://ddragon.leagueoflegends.com/cdn/11.4.1/img/spell/${dados.spells[3].image.full}">
   </div>

   <div id="habilidades-content">
    <p>${dados.passive.name}</p>
    <p>${dados.passive.description}</p>
   </div>
   `


    clearInterval(sliderPhoto)

    let aux = 0
    sliderPhoto = setInterval(function() {
        let skinsS = document.getElementById('skins')
        
        let dadosSkin = dados.skins.length
        let auxurl = dados.skins[aux].num
        if(aux < (dadosSkin - 1)) {
            skinsS.innerHTML = ""
            skinsS.innerHTML =
            `<img src="${`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nome}_${auxurl}.jpg`}">
            `
            aux = aux + 1
        } else {
            aux = 0
        }
    },2000)

    statsLevel(dados)

}

function statsLevel() {
    let inputLevel = document.getElementById('input-level')
    let contentT = document.getElementById('content-stats')
    
    let sLevel = dados
    let valorInput = inputLevel.value

    let hp = sLevel.stats.hp
    let movespeed = sLevel.stats.movespeed
    let attackrange = sLevel.stats.attackrange
    let attackspeed = sLevel.stats.attackspeed
    let attackdamage = sLevel.stats.attackdamage
    let armor = sLevel.stats.armor
    let spellblock = sLevel.stats.spellblock
    let mp = sLevel.stats.mp

    let hppl = sLevel.stats.hpperlevel
    let attackspeedpl = (attackspeed / 100) * sLevel.stats.attackspeedperlevel
    let attackdamagepl = sLevel.stats.attackdamageperlevel
    let armorpl = sLevel.stats.armorperlevel
    let spellblockpl = sLevel.stats.spellblockperlevel
    let mppl = sLevel.stats.mpperlevel
    
    contentT.innerHTML =
    `<p>Vida base: ${hp+((valorInput * hppl) - hppl)}</p>
    <p>Velocidade de Movimento Base: ${movespeed}</p>
    <p>Distancia de Ataque: ${attackrange}</p>
    <p>Velocidade de Ataque Base: ${((valorInput * attackspeedpl) + attackspeed - attackspeedpl).toFixed(2)}</p>
    <p>Dano de Ataque Base: ${((valorInput * attackdamagepl) + attackdamage - attackdamagepl).toFixed(2)}</p>
    <p>Armadura Base: ${((valorInput * armorpl) + armor - armorpl).toFixed(2)}</p>
    <p>Resistência Mágica: ${((valorInput * spellblockpl) + spellblock - spellblockpl).toFixed(2)}</p>
    <p>Mana Base: ${mp + ((valorInput * mppl) - mppl)}</p>
    <canvas id="myChart" height="100"></canvas>
    `
}

function showHab(hab, dados) {
    let habContent = document.getElementById('habilidades-content')
    let teste = document.getElementById(hab.id)
    let p = document.getElementById('passiva')
    let q = document.getElementById(dados.spells[0].id)
    let w = document.getElementById(dados.spells[1].id)
    let e = document.getElementById(dados.spells[2].id)
    let r = document.getElementById(dados.spells[3].id)

    p.setAttribute('class', 'hab-no-active')
    q.setAttribute('class', 'hab-no-active')
    w.setAttribute('class', 'hab-no-active')
    e.setAttribute('class', 'hab-no-active')
    r.setAttribute('class', 'hab-no-active')

    teste.setAttribute('class', 'hab-active')
    


    habContent.innerHTML = 
    `<p>${hab.name}</p>
    <p>${hab.description}</p>
    `
}

function showHabPass(hab) {
    let habContent = document.getElementById('habilidades-content')
    let teste2 = document.getElementById('passiva')
    
    

    let q = document.getElementById(dados.spells[0].id)
    let w = document.getElementById(dados.spells[1].id)
    let e = document.getElementById(dados.spells[2].id)
    let r = document.getElementById(dados.spells[3].id)
    q.setAttribute('class', 'hab-no-active')
    w.setAttribute('class', 'hab-no-active')
    e.setAttribute('class', 'hab-no-active')
    r.setAttribute('class', 'hab-no-active')
    
    teste2.setAttribute('class', 'hab-active')


    habContent.innerHTML = 
    `<p>${hab.name}</p>
    <p>${hab.description}</p>

    `
}

function grafico() {
    
}