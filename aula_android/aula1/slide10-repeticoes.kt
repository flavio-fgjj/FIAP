/**
 * Comandos básicos: Repetições
 * 
 * https://khan.github.io/kotlin-for-python-developers/#loops
 */

 fun main() {
    val nomes = listOf("Flavio", "Estela", "Joao Eugenio")
    for (nome in nomes) {
        println(nome)
    }

    for (i in 1..5) {
        println(i)
    }

    for (i in 1 until 5) {
        print(i)
    }
 }