const dados = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
};

const init = () => {
    preencherSelect()
    preencherTabela(dados.guides)
}

const preencherSelect = () => {
    let variavelSelect = '';

    dados.insurances.forEach(insurance => {
        variavelSelect += `<option> ${insurance.name}</option>`
    });
    document.getElementById('select').innerHTML += variavelSelect;
};

const preencherTabela = (array) => {
    let variavelTabela = '';
    let dataFormatada;
    let precoFormatado;
    const tabela = document.getElementById('tabelaDeInformacoes')

    if (!array.length) {
        tabela.innerHTML = '<tr><td colspan="5" style="font-size: 18px; text-align: center;">nenhuma guia encontrada</td></tr>'
        return
    }

    array.forEach(element => {
        let hoverDeletado = "";
        let foiDeletado = "";

        if (element.health_insurance.is_deleted) {
            hoverDeletado = "Convênio apagado";
            foiDeletado = "deleted"
        }
        dataFormatada = new Date(element.start_date);
        precoFormatado = element.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        variavelTabela += ` 
        <tr>
            <td>${dataFormatada.toLocaleDateString('pt-BR')}</td>
            <td>${element.number}</td>
            <td class = "patient-name"><img src="${element.patient.thumb_url || 'https://via.placeholder.com/150x150.jpg'}" class="profile-pic"/> ${element.patient.name}</td>
            <td title="${hoverDeletado}" class="${foiDeletado}">${element.health_insurance.name}</td>
            <td>${precoFormatado}</td>
        </tr>`
    });
    tabela.innerHTML = variavelTabela;
};

const sanitize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

const buscarNaTabela = () => {
    const input = document.getElementById("input")
    const select = document.getElementById("select")


    if (!input.value && !select.value) {
        preencherTabela(dados.guides)
        return
        // padrão
    }

    const resultadoInput = dados.guides.filter(element => {
        let valid = false

        if (input.value && !select.value && (sanitize(element.patient.name).includes(sanitize(input.value)) || element.number.includes(input.value))) {
            valid = true
            // corresponde só ao input
        }
        if (!input.value && select.value && element.health_insurance.name === select.value) {
            valid = true
            // corresponde só ao select
        }
        if ((input.value && select.value) && (element.health_insurance.name === select.value) && (sanitize(element.patient.name).includes(sanitize(input.value)) || element.number.includes(input.value))) {
            valid = true
            // quando corresponde ao select e ao filter
        }
        return valid
    })
    preencherTabela(resultadoInput)
}

init()