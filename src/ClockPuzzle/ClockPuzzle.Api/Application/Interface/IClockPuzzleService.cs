using ClockPuzzle.Api.Application.Dtos;

namespace ClockPuzzle.Api.Application.Interface;

public interface IClockPuzzleService
{
    ClockPuzzleResponseDto Solve(ClockPuzzleRequestDto request);
}