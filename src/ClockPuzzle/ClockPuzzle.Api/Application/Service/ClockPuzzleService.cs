using ClockPuzzle.Api.Application.Dtos;
using ClockPuzzle.Api.Application.Interface;
using ClockPuzzle.Api.Domain;

namespace ClockPuzzle.Application.Services
{
    public class ClockPuzzleService : IClockPuzzleService
    {
        private readonly ClockPuzzleSolver _solver;

        public ClockPuzzleService(ClockPuzzleSolver solver)
        {
            _solver = solver;
        }

        public ClockPuzzleResponseDto Solve(ClockPuzzleRequestDto request)
        {
            if (request?.Numbers == null || request.Numbers.Length == 0)
            {
                throw new ArgumentException("Clock numbers cannot be empty.");
            }

            var result = _solver.Solve(request.Numbers);

            return new ClockPuzzleResponseDto
            {
                Solved = result.Solved,
                Steps = result.Steps
            };
        }
    }
}
