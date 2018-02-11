---
Title: NUnit 3 Tests Are Not Showing In Visual Studio Test Explorer
Published: 2017-02-21
Tags: NUnit
---

# NUnit 3 Tests Are Not Showing In Visual Studio Test Explorer

Regularly when opening a solution containing a project with NUnit 3 tests Visual Studio Community 2015 the Test Explorer window does not show any tests.
<div class="row">
<div class="col-xs-12 col-md-4">

![](../assets/Images/Empty%20Test%20Explorer.png) 

</div>
<div class="col-xs-12 col-md-8">
The message suggests that simply building the solution will fix this and the tests will appear in Test Explorer.

Regularly that has not been the outcome for me, the Test Explorer window remaining resolutely empty.
</div>
</div>


<div class="row">
<div class="col-xs-12 col-md-8">
To fix this it is necessary to open Tools -> Extensions and Updates...
</div>
<div class="col-xs-12 col-md-4">

![](../assets/Images/Tools%20Extensions%20and%20Updates%20Menu.png)

</div>
</div>

Search for NUnit to find the NUnit 3 Test Adapter
![](../assets/Images/Tools%20Extensions%20and%20Updates.png) 

Click enable and restart Visual Studio, the tests now show correctly.