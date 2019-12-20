---
Title: Running Opserver and Bosun on Windows Part 1
Published: 2019-01-19
Tags: 
  - Opserver
  - Bosun
  - HttpUnit
  - InfluxDB
---

# Running Opserver and Bosun on Windows

This is part 1 of 2 or 3 posts series on setting up OpServer and then adding in Bosun with TSDBRelay and InfluxDB, rather than OpenTSDB as i am setting this up on Windows, and possibly some additional data visualization with Grafana.

I followed the instructions from the [OpServer Readme](https://github.com/opserver/Opserver/blob/master/readme.md) which 

graph TD
subgraph 
A[OpServer] 
end
C[CloudFlare]
D[Exceptions]

A --> C
A --> D

subgraph WMI
A -->H[Web Server]
A -->I[Desktop]
A -->J[DB Server]
end

# prerequisites
- Create [StackExchange.Exceptional Database](https://raw.githubusercontent.com/NickCraver/StackExchange.Exceptional/master/DBScripts/SqlServer.sql) - If you are adding this table to an existing database you may experience the error 
``` sql Msg 1935, Level 16, State 1, Line 161
Cannot create index. Object 'Exceptions' was created with the following SET options off: 'ANSI_NULLS'. 
```
Based on the [Microsoft Docs on ANSI_NULL](https://docs.microsoft.com/en-us/sql/t-sql/statements/set-ansi-nulls-transact-sql) it might be time to switch the database to SET ANSI_NULLS on for the database.
- Configure [StackExchange.Exceptional](https://nickcraver.com/StackExchange.Exceptional/)

start influx
CREATE DATABASE opentsdb
Install telegraf for metrics
update scollector to send data to influx or scollector -h server:4242 

update bosun.toml to add influx connection # Configuration to enable the InfluxDB backend [InfluxConf]
	URL = "http://localhost:8086"
	Timeout = "5m"
	UnsafeSSL = true

Run a basic query in bosun expression to see if it is all working influx("opentsdb", '''SELECT mean(value) FROM "os.cpu" GROUP BY host''', "30m", "", "2m") see if httpunit is working for us influx("opentsdb", '''SELECT mean(value) FROM "hu.error" GROUP BY host ''', "30m", "", "2m")

install Grafana
https://grafana.com

the [prerequisites](https://github.com/dotnet/core/blob/master/Documentation/prereqs.md) 

# Permissions
`chmod 744?`


``` mermaid
graph TD;
title[<u>My Title</u>]
title-->iQClient
title-->cp
style title fill:#FFF,stroke:#FFF
linkStyle 0 stroke:#FFF,stroke-width:0;
linkStyle 1 stroke:#FFF,stroke-width:0;
```