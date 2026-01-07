namespace ClockPuzzle.Api.Domain;

public class ClockPuzzleSolver
{
    public ClockPuzzleResult Solve(int[] numbers)
    {
        // Exemplo simples de regra:
        // Verifica se o relógio pode ser resolvido
        // e retorna a ordem dos passos (mock lógico)

        if (!IsValidClock(numbers))
        {
            return new ClockPuzzleResult
            {
                Solved = false,
                Steps = Array.Empty<int>()
            };
        }

        var steps = CalculateSteps(numbers);

        return new ClockPuzzleResult
        {
            Solved = true,
            Steps = steps
        };
    }

    private bool IsValidClock(int[] numbers)
    {
        return numbers.Length >= 3;
    }

    private int[] CalculateSteps(int[] numbers)
    {
        // Aqui entra o algoritmo REAL do Clock Puzzle
        // Exemplo fictício:
        return numbers
            .Select(n => n % numbers.Length)
            .ToArray();
    }
}