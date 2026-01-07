namespace ClockPuzzle.Api.Domain;

public class ClockPuzzleResult
{
    public bool Solved { get; set; }
    public int[] Steps { get; set; } = Array.Empty<int>();
}