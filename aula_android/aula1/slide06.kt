/**
    Comandos básicos:
    - Concatenando string com o auxiliar +
    - Fazendo operações matematicas

    https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-string/
**/

fun main() {
    val primeiroNome = "Flavio"
    val ultimoNome = "Alvarenga"
    val nomeCompleto = primeiroNome + " " + ultimoNome
    println(nomeCompleto)

    val n1 = 9
    val n2 = 5
    val media = (n1 + n2)/2
    println(media)
}