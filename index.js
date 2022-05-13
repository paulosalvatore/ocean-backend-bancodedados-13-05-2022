const express = require("express");
const app = express();

// Indica para o Express que estamos utilizando JSON na requisições
app.use(express.json());

// Criação do endpoint principal
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Heróis e Heroínas

const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
//               0                    1               2

// Read All (Ler todos os itens)
app.get("/herois", function (req, res) {
  res.send(herois.filter(Boolean));
});

// Read by ID (Visualizar um item pelo ID)
app.get("/herois/:id", function (req, res) {
  // Recebemos o ID que iremos buscar
  const id = req.params.id;

  // Buscamos o item dentro da lista, utilizando o ID
  const item = herois[id - 1];

  if (!item) {
    // Envia uma resposta de não encontrado
    res.status(404).send("Item não encontrado.");

    // Encerra a função
    return;
  }

  res.send(item);
});

// Create (Criar um item)
app.post("/herois", function (req, res) {
  // Obtemos o nome que foi enviado no body da requisição
  const item = req.body.nome;

  if (!item) {
    res
      .status(400)
      .send("Você deve informar a propriedade 'nome' no corpo da requisição.");

    // Encerra a função
    return;
  }

  // Adicionamos esse item obtido dentro da lista de heróis
  herois.push(item);

  res.send("Item criado com sucesso!");
});

// Update (Editar um item)
app.put("/herois/:id", function (req, res) {
  // Obtemos o ID do item a ser atualizado
  const id = req.params.id;

  if (!herois[id - 1]) {
    // Envia uma resposta de não encontrado
    res.status(404).send("Item não encontrado.");

    // Encerra a função
    return;
  }

  // Pegamos a nova informação que está sendo enviada
  const item = req.body;

  // Atualizamos a informação na lista
  herois[id - 1] = item;

  res.send("Item editado com sucesso!");
});

// Delete (Remover um item)
app.delete("/herois/:id", function (req, res) {
  // Obtemos o ID do registro que será excluído
  const id = req.params.id;

  if (!herois[id - 1]) {
    // Envia uma resposta de não encontrado
    res.status(404).send("Item não encontrado.");

    // Encerra a função
    return;
  }

  // Removemos o item da lista
  delete herois[id - 1];

  res.send("Item removido com sucesso!");
});

app.listen(3000, () =>
  console.log("Aplicação rodando em http://localhost:3000")
);
