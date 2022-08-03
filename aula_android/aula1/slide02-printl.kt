/**
    Comandos básicos:
    Uso dos auxiliares \, \n e \t dentro do comando println
    Uso da classe Pair

    https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-pair/
**/
fun main() {
    println("Hello, world!!!")
    println("Este texto \"quebra\" em \nduas linhas")
    println("Nota:\t 10")

    val(endereco, numero) = Pair("Paulista", 1162)
    println(endereco)
    println(numero)
}