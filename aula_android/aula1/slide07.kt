/**
    Comandos básicos:
    Ao utilizar o Char, precisamos definir
    explicitamente
    
    var genero: Char = 'M‘
    É possível utilizar o tipo Char quando for
    necessário ocupar o espaço de apenas um único
    caractere, porém vale ressaltar que, para atribuir
    um Char a uma variável, é necessário definir de
    forma explícita o tipo Char na variável, pois, do
    contrário, será String, mesmo que o texto
    contenha apenas um caractere. Outro detalhe
    que é importante lembrar é que o tipo Char
    necessita que o carácter esteja entre aspas
    simples.

    https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-string/

**/

fun main() {
    val minhaString = "KOTLIN"
    println(minhaString[0])
    println(minhaString[5])
    println(minhaString.isEmpty())
    println(minhaString.length)
    println(minhaString.substring(2, 4))
    println("minha string é: $minhaString")
}

// Resultado dos prints
/*
K
N
false
6
TL
minha string é: KOTLIN
*/