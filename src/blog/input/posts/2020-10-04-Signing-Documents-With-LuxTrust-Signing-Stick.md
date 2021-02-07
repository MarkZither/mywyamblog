---
Title: Signing Documents With a LuxTrust Signing Stick
Lead: It is not as easy as it should be to sign documents with a LuxTrust Signing Stick, after much trial and error this is what worked for me.
Published: 2020-12-23T10:24:26.968Z
Image: 
Tags:
  - LuxTrust Signing Stick
  - Gemalto
  - eIDAS
  - Electronic Signature
  - PAdES, CAdES, XAdES
---

## Installation
Installation is easy enough, download the correct installer from the [LuxTrust Middleware Download] page and install.

You will see the LuxTrust Middleware running in your system tray.
![System Tray After LuxTrust Middleware Install](../assets/images/LuxTrust_Middleware_Post_Install.png){.img-fluid .img-responsive}

You will notice 2 icons have been added to the systray. The LuxTrust Middleware has the distinctive logo ![LuxTrust Middleware System Tray Icon](../assets/images/LuxTrust_Systray_Icon.png){.img-fluid .img-responsive} there are not many options when you click on the Middleware icon, configure allows you to change the log level and `About` has a `Support` tab which provides easy access to the log file (can be found at `%UserProfile%\.luxtrust\logs`), which does become useful quite soon. 
But what is this ![LuxTrust Middleware System Tray Icon](../assets/images/Gemalto_Systray_Icon.png){.img-fluid .img-responsive} second icon? 
Right click on the icon and choose `about`, you are greeted with this `Gemalto Classic Client` about box.
![Gemalto Classic Client About Box](../assets/images/Gemalto_About.png){.img-fluid .img-responsive} 

But who are Gemalto and why is their toolbox installed on my system?
It is not mentioned anywhere in the [LuxTrust Middleware Installation Guide] (warning links to a pdf), but if you had been watching the installer closely you will see it installed `Classic Client Toolbox`, 

## Activation


## Signing PDF


## Signing XML
Finding the right software to sign an XML file is not easy, the following is a list of software I tried with mixed results;

* [Szafir] - Doesn't seem to recognise the LuxTrust Signing Stick or certificates. Does have a very nice validator.
* [XML Signer] - Doesn't support [XAdES] only [XMLDSig]. Hangs if you have not logged in to the Gemalto Classic Client Toolbox to unlock the private keys.
* [XML validator Buddy] - Doesn't support [XAdES] only [XMLDSig]
* [DSS Demonstration WebApp Sign a Document] - Requires [NexU]

[LuxTrust Middleware Download]: https://www.luxtrust.lu/simple/189
[LuxTrust Middleware Installation Guide]: https://www.luxtrust.lu/upload/data/guides/UG-0247-P-E-Install%20LuxTrust%20Middleware%20Windows_0.3.pdf
[LuxTrust Pin Management Guide]: https://www.luxtrust.lu/downloads/guides/UG-0234-P-E-Gestion%20Pin%20Windows.pdf
[Guichet.lu Technical Help]: https://guichet.public.lu/en/support/aide/aides-techniques.html
[LuxTrust Javaless]: https://www.luxtrust.com/the-new-luxtrust-middleware-100-javaless/
[Szafir]: https://www.elektronicznypodpis.pl/en/offer/software-for-the-e-signature/
[XML Signer]: https://www.signfiles.com/xml-signer/
[XML validator Buddy]: https://www.xml-buddy.com/ValidatorBuddy.htm
[DSS Demonstration WebApp Sign a Document]: https://ec.europa.eu/cefdigital/DSS/webapp-demo/sign-a-document
[XAdES]: https://en.wikipedia.org/wiki/XAdES
[XMLDSig]: https://en.wikipedia.org/wiki/XML_Signature
[NexU]: https://nowina.lu/solutions/java-less-browser-signing-nexu/
[Nexu Open Source on GitHub]: https://github.com/nowina-solutions/nexu
[Counter sign a signature with Nowina]: https://dss.nowina.lu/counter-sign
[XML signing in Java]: https://ec.europa.eu/cefdigital/DSS/webapp-demo/doc/dss-documentation.html#xmlSecurities