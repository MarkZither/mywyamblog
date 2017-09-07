Title: Running ASP.NET Core on a RaspberryPi 2 with Nginx
Published: 2017-02-21
Tags: 
  - ASP.NET Core
  - RaspberryPi
  - Nginx
---

# Running ASP.NET Core on a RaspberryPi 2 with Nginx

I followed the instructions from [Get Started](https://blogs.msdn.microsoft.com/david/2017/07/20/setting_up_raspian_and_dotnet_core_2_0_on_a_raspberry_pi/) and [docs.microsoft.com](https://docs.microsoft.com/en-us/aspnet/core/publishing/linuxproduction?tabs=aspnetcore2x), and found that some additional configuration was required.

# prerequisites

the [prerequisites](https://github.com/dotnet/core/blob/master/Documentation/prereqs.md) are required or you will get an error like:

```perl
Failed to load ▒▒▒, error: libunwind.so.8: cannot open shared object file: No such file or directory Failed to bind to CoreCLR at /var/www/PublishOutput/libcoreclr.so'
```

# Permissions
`chmod 744?`

# Tell Kestrel to listen 
If you are running headless you will need Kestrel to be listening for external requests to confirm the app is running, this can be done using the `ASPNETCORE_URLS environment variable`

```perl
 ASPNETCORE_URLS="http://*:5000" dotnet Your.App.dll
``` 

# Create the service file
add a symlink for dotnet to limit the changes to the service file
```perl
sudo ln -s /opt/dotnet/dotnet /usr/bin/dotnet
```

# Configuring SSL
Rather than building nginx from source to get SSL I used nginx-core.