# Dependency Injection

Dependency injection(DI) software design pattern is a technique for acheiving Inversion of control between classes and their dependencies.

A dependency is an object that another object depends on.

```
public class MessageWriter
{
    public void Write(string message)
    {
        Console.WriteLine($"MessageWriter.Write(message: \"{message}\")");
    }
}
```

A class can create an instance of the MessageWriter class to make use of its Write method. In the following example, the MessageWriter class is a dependency of the Worker class:

```
public class Worker : BackgroundService
{
    private readonly MessageWriter _messageWriter = new MessageWriter();

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _messageWriter.Write($"Worker running at: {DateTimeOffset.Now}");
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

The class creates and directly depends on the MessageWriter class. Hard-coded dependencies, such as in the previous example, are problematic and should be avoided for the following reasons:

- To replace MessageWriter with a different implementation, the Worker class must be modified.
- If MessageWriter has dependencies, they must also be configured by the Worker class. In a large project with multiple classes depending on MessageWriter, the configuration code becomes scattered across the app.
- This implementation is difficult to unit test. The app should use a mock or stub MessageWriter class, which isn't possible with this approach.

Dependency injection addresses these problems through:

- The use of an interface or base class to abstract the dependency implementation.
- Registration of the dependency in a service container. .NET provides a built-in service container, [IServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/system.iserviceprovider?view=net-6.0). Services are typically registered at the app's start-up and appended to an [IServiceCollection](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=dotnet-plat-ext-6.0). Once all services are added, you use [BuildServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.servicecollectioncontainerbuilderextensions.buildserviceprovider?view=dotnet-plat-ext-6.0) to create the service container.
- Injection of the service into the constructor of the class where it's used. The framework takes on the responsibility of creating an instance of the dependency and disposing of it when it's no longer needed.

As an example, the IMessageWriter interface defines the Write method:

```
namespace DependencyInjection.Example;

public interface IMessageWriter
{
    void Write(string message);
}
```

This interface is implemented by a concrete type, MessageWriter:

```
namespace DependencyInjection.Example;

public class MessageWriter : IMessageWriter
{
    public void Write(string message)
    {
        Console.WriteLine($"MessageWriter.Write(message: \"{message}\")");
    }
}
```

The sample code registers the IMessageWriter service with the concrete type MessageWriter. The AddScoped method registers the service with a scoped lifetime, the lifetime of a single request

```
using DependencyInjection.Example;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureServices(
    services =>
        services.AddHostedService<Worker>()
            .AddScoped<IMessageWriter, MessageWriter>());

var host = builder.Build();

host.Run();
```

In the preceding code, the sample app:

- Creates a host builder instance.
- Configures the services by registering:

    - The Worker as a hosted service.
    - The IMessageWriter interface as a scoped service with a corresponding implementation of the MessageWriter class.
- Builds the host and runs it.

The host contains the dependency injection service provider. It also contains all the other relevant services required to automatically instantiate the Worker and provide the corresponding IMessageWriter implementation as an argument.

```
namespace DependencyInjection.Example;

public class Worker : BackgroundService
{
    private readonly IMessageWriter _messageWriter;

    public Worker(IMessageWriter messageWriter) =>
        _messageWriter = messageWriter;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _messageWriter.Write($"Worker running at: {DateTimeOffset.Now}");
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

By using the DI pattern, the worker service:

- Doesn't use the concrete type MessageWriter, only the IMessageWriter interface that implements it. That makes it easy to change the implementation that the controller uses without modifying the controller.
- Doesn't create an instance of MessageWriter. The instance is created by the DI container.