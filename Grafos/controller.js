class Grafo{
    constructor(){
        this.adjList = {}
    }

    addNodo(name){
        if(!this.adjList[name] && (Object.keys(this.adjList).length) < 20){
            this.adjList[name] = {}
        }
        else{
            console.log("Foi ultrapassado o Limite de Nodos")
        }
    }

    addConexao(src, dest, weight){
        this.adjList[src][dest] = weight
        this.adjList[dest][src] = weight
    }

    showAll(){
        Object.keys(this.adjList).forEach(key => {
            console.log(key, this.adjList[key]);
        });
    }
}

function Dijkstra(Graph, Start, Finish){

    /* AuxMatrix é o objeto que vai possuir 
    todos os dados necessários para o dijkstra 
    rodar. [Anterior/visitado, ShortestPath, Fechado/Aberto, {adjacencia}]
    */

    let AuxMatrix = {}
    let minPath = Infinity
    let currentNode
    let finalpath = []

    // Criação da matriz de legendas [-1, Infinito, Status (fechado, ABERTO)] para cada vértice, feita com objetos

    Object.keys(Graph.adjList).forEach(key => {
        AuxMatrix[key] = [-1, Infinity, true, Graph.adjList[key]]
    })

    AuxMatrix[Start][1] = 0

    // Enquanto houver nodos abertos

    while(Object.keys(AuxMatrix).some(key => {
        return (AuxMatrix[key][2] === true)
    })){

        // Achar o nodo ABERTO com a menor estimativa

        Object.keys(AuxMatrix).forEach(key => {
            if(AuxMatrix[key][1] < minPath && AuxMatrix[key][2] == true){
                minPath = AuxMatrix[key][1]
                currentNode = key
            }
        })

        // Fechar o "U"

        AuxMatrix[currentNode][2] = false

        // Pegar os nodos abertos "V" adjacentes, escolher o com menor peso
        // AuxMatrix[currentNode][3][key] == Peso da adjacente analisado atualmente
        // AuxMatrix[currentNode][1] ==      Distância do Start até o nodo atual (que foi fechado)
        // AuxMatrix[key][1] ==              Distância do Start até o nodo adjacente que está sendo analisado

        Object.keys(AuxMatrix[currentNode][3]).forEach(key => {
            if(AuxMatrix[currentNode][3][key] + AuxMatrix[currentNode][1] < AuxMatrix[key][1]){
                AuxMatrix[key][1] = AuxMatrix[currentNode][3][key] + AuxMatrix[currentNode][1]
                AuxMatrix[key][0] = currentNode
            }
        })
        minPath = Infinity
    }

    currentNode = Finish

    finalpath.push(Finish)

    do{
        finalpath.push(AuxMatrix[currentNode][0])
        currentNode = AuxMatrix[currentNode][0]
    }while(AuxMatrix[currentNode][0] != -1)

    finalpath.reverse();
    
    console.log(AuxMatrix)

    return ("A distância mínima do Nodo " + Start + " até o nodo " + Finish + " é " + AuxMatrix[Finish][1]
    + "\n O caminho percorrido é: " + finalpath)
}

let Grafo1 = new Grafo()

Grafo1.addNodo("T")
Grafo1.addNodo("M")
Grafo1.addNodo("R")
Grafo1.addNodo("X")
Grafo1.addNodo("Y")
Grafo1.addNodo("Z")

Grafo1.addConexao("T", "M", 10)
Grafo1.addConexao("T", "R", 5)
Grafo1.addConexao("R", "M", 3)
Grafo1.addConexao("R", "X", 8)
Grafo1.addConexao("R", "Y", 2)
Grafo1.addConexao("Y", "Z", 6)
Grafo1.addConexao("M", "X", 1)
Grafo1.addConexao("X", "Y", 4)
Grafo1.addConexao("X", "Z", 4)

let result = Dijkstra(Grafo1, "T", "Z")
console.log(Grafo1)
console.log(result)

function dijkstraHandler(){
    if(document.getElementById('srcD').value != "" &&
    document.getElementById('dstD').value != ""){
        let src = document.getElementById('srcD').value
        let dst = document.getElementById('dstD').value
        document.getElementById("field").textContent = Dijkstra(Grafo1, src, dst)
        document.getElementById('srcD').value = ""
        document.getElementById('dstD').value = ""
    }
}

function buttonAdd(){
    if(document.getElementById('inputnode').value != ""){
    let node_name = document.getElementById('inputnode').value
    Grafo1.addNodo(node_name)
    atualizarMatriz();
    document.getElementById('inputnode').value = ""
    }
}

function cleanGrafo(){
    Grafo1 = new Grafo();

    let node_list = document.getElementById("graph");

    while(node_list.firstChild){
        node_list.removeChild(node_list.firstChild);
    }
}

function atualizarMatriz(){

    let node_list = document.getElementById("graph");

    while(node_list.firstChild){
        node_list.removeChild(node_list.firstChild);
    }

    Object.keys(Grafo1.adjList).forEach(key => {
        let node = document.createElement("li");
        node.textContent = key
        node.setAttribute("id", "" + key);
        node_list.appendChild(node)

        if(Object.keys(Grafo1.adjList[key]).length > 0){

            let lista_interna = document.createElement("ul")
            lista_interna.setAttribute("id", "adj" + key)
            node_list.appendChild(lista_interna)

            Object.keys(Grafo1.adjList[key]).forEach(adjacente =>{
                let item_interno = document.createElement("li")
                item_interno.textContent = adjacente + ": " + Grafo1.adjList[key][adjacente]
                lista_interna.appendChild(item_interno)
            })
        }
    })
}

function addConexao(){
    if(document.getElementById('src').value != "" &&
        document.getElementById('dst').value != "" &&
        document.getElementById('weight').value != "" &&
        !isNaN(document.getElementById('weight').value)
    ){
        let src = document.getElementById('src').value
        let dst = document.getElementById('dst').value
        let weight = document.getElementById('weight').value

        Grafo1.addConexao(src, dst, weight)
        atualizarMatriz()
    }
    else{
        console.log("input error")
    }
}

window.onload = function atualizarMatriz() {

    let node_list = document.getElementById("graph");

    Object.keys(Grafo1.adjList).forEach(key => {
        let node = document.createElement("li");
        node.textContent = key
        node.setAttribute("id", "" + key);
        console.log(node)
        node_list.appendChild(node)

        console.log(Object.keys(Grafo1.adjList[key]).length)

        if(Object.keys(Grafo1.adjList[key]).length > 0){

            let lista_interna = document.createElement("ul")
            lista_interna.setAttribute("id", "adj" + key)
            node_list.appendChild(lista_interna)

            Object.keys(Grafo1.adjList[key]).forEach(adjacente =>{
                let item_interno = document.createElement("li")
                item_interno.textContent = adjacente + ": " + Grafo1.adjList[key][adjacente]
                lista_interna.appendChild(item_interno)
            })
        }
    })
}


