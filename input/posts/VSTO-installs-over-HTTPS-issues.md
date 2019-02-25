---
Title: VSTO installs over HTTPS issues
Published: 2019-02-25
Tags: 
  - VSTO
  - HTTPS
---

# Are Envrionmental?
Test with this [setup.exe](../assets/testvsto/setup.exe).

## The Problem
Setup runs sucessfully over http, but switch to https by publishing again with the https url or by using `setup.exe -url="https://myurl.com/MyAppFolder/setup.exe"`
```
URLDownloadToCacheFile failed with HRESULT '-2146697208'
Error: An error occurred trying to download 'https://myurl.com/MyAppFolder/setup.exe'.
```


## Other Examples
https://stackoverflow.com/questions/20244507/download-clickonce-fails-from-setup-exe
