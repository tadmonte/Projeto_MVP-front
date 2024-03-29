/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/lista';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => {

        insertList(item.nome, item.quantidade, item.valor, item.unidade, item.validade, item.id,)

      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputQuantity, inputPrice, inputUnit, inputDate) => {


  const body = { nome: inputProduct, quantidade: inputQuantity, valor: inputPrice, unidade: inputUnit, validade: inputDate }

  let url = 'http://127.0.0.1:5000/item';
  try {
    const result = await fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    console.log(JSON.stringify(result))
    return result.json()
  }

  catch (error) {
    console.error('Error:', error);
  };
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent, id) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  parent.setAttribute("id", id);
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    console.log(close[i])
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      let parent = this.parentElement;
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(parent.id)
        alert("Removido!")
      }

    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/excluir?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = async () => {
  let inputProduct = document.getElementById("newInput").value;
  let inputQuantity = document.getElementById("newQuantity").value;
  let inputPrice = document.getElementById("newPrice").value;
  let inputUnit = document.getElementById("newUnit").value;
  let inputDate = document.getElementById("newDate").value;
  console.log(inputDate)
  if (inputProduct === '') {
    return alert("Escreva o nome do Consumível!");
  }
  if (isNaN(inputQuantity) || isNaN(inputPrice)) {
    return alert("Quantidade e valor precisam ser números!");
  }
  const item = await postItem(inputProduct, inputQuantity, inputPrice, inputUnit, inputDate)
  console.log(item)
  insertList(item.nome, item.quantidade, item.valor, item.unidade, item.validade, item.id)

  alert("Item adicionado!")

}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameProduct, quantity, price, unit, date, id) => {
  const datex = new Date(date)
  const dateFormated = `${datex.getDate()}-${datex.getMonth()}-${datex.getFullYear()}`
  var item = [nameProduct, quantity, price, unit, dateFormated]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1), id)
  document.getElementById("newInput").value = "";
  document.getElementById("newQuantity").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newUnit").value = "";
  document.getElementById("newDate").value = "";

  removeElement()
}




const getclima = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const result = await fetch("http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=b98bb04491563d10dc2bd24d02e3d48c", requestOptions)
  const data = await result.json()

  console.log(data[0].text)
  
  var clima = document.getElementById('clima');
  
    let p = document.createElement("p");
   
    
    p.innerHTML = (data[0].text);
    clima.appendChild(p);
  
}

// Função para deletar a tabela inteira
function deletarTabela() {
  let url = 'http://127.0.0.1:5000/deletartodos'
  var tabela = document.getElementById('myTable');
  fetch(url, {
    method: 'delete'
  })

  .then((response) => {
    if (response.ok) {
      console.log('Dados excluídos com sucesso no servidor.');

      location.reload();
}})



}



getclima()