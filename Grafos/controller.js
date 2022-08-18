class graph{
    constructor(){
        this.grafo = {}
    }

    addNodo(nome){
        if(!this.grafo[nome] && (Object.keys(this.grafo).length) < 20){
            this.grafo[nome] = {}
        }
        else{
            console.log("Foi ultrapassado o Limite de Nodos")
        }
    }

    addConexao(nome1, nome2, valor){
        this.grafo[nome1][nome2] = valor
        this.grafo[nome2][nome1] = valor
    }

    mostrarPeso(){
        
            Object.keys(this.grafo).forEach(key => {
            console.log(key, this.grafo[key]);
          });
        }
    }

const Brasil = new graph()


Brasil.addNodo("Rio Grande do Sul")
Brasil.addNodo("Paraná")
Brasil.addNodo("Sertão do Cariri")

Brasil.addConexao("Rio Grande do Sul", "Sertão do Cariri", 10)
Brasil.addConexao("Paraná", "Sertão do Cariri", 20)
Brasil.addConexao("Rio Grande do Sul", "Paraná", 54)

Brasil.mostrarPeso()