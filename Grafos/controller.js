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
        //this.grafo[destino][saida] = peso
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

    // Criação da matriz de legendas [-1, Infinito] para cada vértice, feita com objetos

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

        Object.keys(AuxMatrix[currentNode][3]).forEach(key => {
            if(AuxMatrix[currentNode][3][key] + AuxMatrix[currentNode][1] < AuxMatrix[key][1]){
                AuxMatrix[key][1] = AuxMatrix[currentNode][3][key] + AuxMatrix[currentNode][1]
                AuxMatrix[key][0] = currentNode
            }
        })
        break
    }
    console.log(AuxMatrix)
}



const Grafo1 = new Grafo()

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

Dijkstra(Grafo1, "T", "Z")

console.log(Grafo1)
//Brasil.showAll()











/*
function buttonAdd(){
    let textGetter = document.getElementById("inputtext");
    let word = nome.textGetter
    Brasil.addNodo(word)
    Brasil.showAll()
}

function atualizarMatriz() {
    let ul = document.getElementById("graph1");
    let li = document.createElement("li");
    li.textContent = "Obscuro"
    ul.appendChild(li);
}
*/
