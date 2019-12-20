---
Title: Migrate From Unobtrusive Validation To HTML5 Validation
Published: 2019-02-05
Tags: 
  - jQuery Validation
  - Unobtrusive Validation
  - Modernizr
  - HTML5 Form validation
---

# Migrate From Unobtrusive Validation To HTML5 Validation

## Enable HTML5 form validation with fallback to Unobtrusive Validation

Form validation is now supported on all major browsers as shown on the [Can I Use website](https://caniuse.com/#feat=form-validation), but visitor logs still show enough users on IE9 to need to support it. This could be done with a polyfill but with Unobtrusive Validation already in place lets keep using that as a first step. 

## Disable unobtrusive validation if form validation is supported
Jquery Validate adds the ```novalidate``` attribute to the forms on the page, in order for the HTML5 validation to fire that either needs to be removed ```$("#myForm").removeAttr("novalidate");``` but at this point the forms will have been parsed and validation logic added, or it can be disabled across the whole site
``` xml
    <add key="ClientValidationEnabled" value="true" />
    <add key="UnobtrusiveJavaScriptEnabled" value="true" />
```
and enabled if required 
``` javascript
        if (!Modernizr.formvalidation) {
            $.validator.unobtrusive.parse('form');
        }
```

validate the form manually
```
var largeForm = document.getElementById('largeForm');
largeForm.reportValidity();
```

add html5 validation options to existing form

add datatypes to viewmodel to generate the html5 attributes
limitations?

bootstrap multiselect html5 validation issues
