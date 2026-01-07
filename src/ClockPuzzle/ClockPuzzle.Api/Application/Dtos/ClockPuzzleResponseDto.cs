namespace ClockPuzzle.Api.Application.Dtos;

public class ClockPuzzleResponseDto
{
    public bool Solved { get; set; }
    public int[] Steps { get; set; }
}