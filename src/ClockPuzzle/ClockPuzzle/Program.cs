using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Relógio estilo FF XIII-2 ===");

        // Quantidade de números
        Console.Write("Quantos números tem no relógio? ");
        int total = int.Parse(Console.ReadLine()!);

        // Ordem dos números
        Console.WriteLine("Informe os números na ordem do sentido horário (separados por espaço):");
        var input = Console.ReadLine()!;

        var numbers = new List<int>();

        foreach (var value in input.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        {
            numbers.Add(int.Parse(value));
        }

        if (numbers.Count != total)
        {
            Console.WriteLine("Erro: quantidade de números informada não bate com o total.");
            return;
        }

        Console.WriteLine("\n⏱️ Iniciando rotação do relógio...\n");

        int pointer = 0;

        // Simula uma volta completa no relógio
        for (int i = 0; i < numbers.Count; i++)
        {
            Console.WriteLine($"Ponteiro está em: {numbers[pointer]}");

            pointer = (pointer + 1) % numbers.Count;
        }

        Console.WriteLine("\n✅ Fim da simulação");
    }
}