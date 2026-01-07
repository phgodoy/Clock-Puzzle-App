using ClockPuzzle.Api.Application.Dtos;
using ClockPuzzle.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClockPuzzle.Api.Controllers;

[ApiController]
[Route("api/clock-puzzle")]
public class ClockPuzzleController : ControllerBase
{
    private readonly ClockPuzzleService _service;

    public ClockPuzzleController(ClockPuzzleService service)
    {
        _service = service;
    }

    [HttpPost("solve")]
    public IActionResult Solve([FromBody] ClockPuzzleRequestDto request)
    {
        var response = _service.Solve(request);
        return Ok(response);
    }
}
