using ClockPuzzle.Api.Domain;
using ClockPuzzle.Application.Services;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Clock Puzzle API",
        Version = "v1",
        Description = "API for resolution to Clock Puzzle"
    });
});

// Services
builder.Services.AddScoped<ClockPuzzleService>();
builder.Services.AddScoped<ClockPuzzleSolver>();

var app = builder.Build();

// Swagger (recomendado só em desenvolvimento)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Clock Puzzle API v1");
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}