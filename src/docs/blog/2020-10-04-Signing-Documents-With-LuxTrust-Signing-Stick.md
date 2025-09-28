---
title: "Signing Documents With a LuxTrust Signing Stick"
authors: ["mark-burton"]
tags: ["LuxTrust Signing Stick", "Gemalto", "eIDAS", "Electronic Signature", "PAdES", "CAdES", "XAdES"]
description: "It is not as easy as it should be to sign documents with a LuxTrust Signing Stick, after much trial and error this is what worked for me."
date: "2020-10-04"
---

## Installation
Installation is easy enough, download the correct installer from the [LuxTrust Middleware Download] page and install.  You will see the LuxTrust Middleware running in your system tray.
![System Tray After LuxTrust Middleware Install](/img/LuxTrust_Middleware_Post_Install.png) You will notice 2 icons have been added to the systray. The LuxTrust Middleware has the distinctive logo ![LuxTrust Middleware System Tray Icon](/img/LuxTrust_Systray_Icon.png) there are not many options when you click on the Middleware icon, configure allows you to change the log level and `About` has a `Support` tab which provides easy access to the log file (can be found at `%UserProfile%\.luxtrust\logs`), which does become useful quite soon.  But what is this ![LuxTrust Middleware System Tray Icon](/img/Gemalto_Systray_Icon.png) second icon?  Right click on the icon and choose `about`, you are greeted with this `Gemalto Classic Client` about box.
![Gemalto Classic Client About Box](/img/Gemalto_About.png) But who are Gemalto and why is their toolbox installed on my system?
It is not mentioned anywhere in the [LuxTrust Middleware Installation Guide] (warning links to a pdf), but if you had been watching the installer closely you will see it installed `Classic Client Toolbox`,  ## Activation  ## Signing PDF  ## Signing XML
Finding the right software to sign an XML file is not easy, the following is a list of software I tried with mixed results;  * [Szafir] - Doesn't seem to recognise the LuxTrust Signing Stick or certificates. Does have a very nice validator.
* [XML Signer] - Doesn't support [XAdES] only [XMLDSig]. Hangs if you have not logged in to the Gemalto Classic Client Toolbox to unlock the private keys.
* [XML validator Buddy] - Doesn't support [XAdES] only [XMLDSig]
* [DSS Demonstration WebApp Sign a Document] - Requires [NexU]  [LuxTrust Middleware Download]: https:/www.luxtrust.lusimple189
[LuxTrust Middleware Installation Guide]: https:/www.luxtrust.luuploaddataguidesUG-0247-P-E-Install%20LuxTrust%20Middleware%20Windows_0.3.pdf
[LuxTrust Pin Management Guide]: https:/www.luxtrust.ludownloadsguidesUG-0234-P-E-Gestion%20Pin%20Windows.pdf
[Guichet.lu Technical Help]: https:/guichet.public.luensupportaideaides-techniques.html
[LuxTrust Javaless]: https:/www.luxtrust.comthe-new-luxtrust-middleware-100-javaless/
[Szafir]: https:/www.elektronicznypodpis.plenoffersoftware-for-the-e-signature/
[XML Signer]: https:/www.signfiles.comxml-signer/
[XML validator Buddy]: https:/www.xml-buddy.comValidatorBuddy.htm
[DSS Demonstration WebApp Sign a Document]: https:/ec.europa.eucefdigitalDSSwebapp-demosign-a-document
[XAdES]: https:/en.wikipedia.orgwikiXAdES
[XMLDSig]: https:/en.wikipedia.orgwikiXML_Signature
[NexU]: https:/nowina.lusolutionsjava-less-browser-signing-nexu/
[Nexu Open Source on GitHub]: https:/github.comnowina-solutionsnexu
[Counter sign a signature with Nowina]: https:/dss.nowina.lucounter-sign
[XML signing in Java]: https:/ec.europa.eucefdigitalDSSwebapp-demodocdss-documentation.html#xmlSecurities