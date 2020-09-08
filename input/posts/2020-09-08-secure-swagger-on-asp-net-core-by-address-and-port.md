---
Title: Secure Swagger on ASP.NET Core by address and port
Published: 2020-09-08T14:46:15.750Z
Tags:
  - ASP.NET Core
  - Swagger
  - Swashbuckle
---

Healthy

``` json
{
    "status": "Healthy",
    "totalDuration": "00:00:00.6304391",
    "entries": {
        "LoginDB-check": {
            "data": {},
            "duration": "00:00:00.6070053",
            "status": "Healthy"
        },
        "OtherServer-check": {
            "data": {},
            "duration": "00:00:00.6069850",
            "status": "Healthy"
        }
    }
}
```

Unhealthy

``` json
{
    "status": "Unhealthy",
    "totalDuration": "00:00:15.6160238",
    "entries": {
        "LoginDB-check": {
            "data": {},
            "description": "A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: SQL Network Interfaces, error: 26 - Error Locating Server/Instance Specified)",
            "duration": "00:00:15.3302265",
            "exception": "A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: SQL Network Interfaces, error: 26 - Error Locating Server/Instance Specified)",
            "status": "Unhealthy"
        },
        "OtherServer-check": {
            "data": {},
            "duration": "00:00:00.6069850",
            "status": "Healthy"
        }
    }
}
```
