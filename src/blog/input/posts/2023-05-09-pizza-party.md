---
Title: Pizza Party
Lead: "We are pleased to invite our friends to our first pizza party."
Published: 2023-05-07T15:23:12.976Z
Date: 2023-05-7T15:23:12.976Z
Image: "/assets/Images/milling.jpg"
Tags:
  - beer
  - pizza
---

# Pizza Party!



## The Menu

### Bases

I have a book with a wide range of pizza styles and types of bases, which I have never made.
<div>
  <button class="my-button">Button</button>
  

</div>
<div>
<label for="chkPineapple">Pineapple</label><input type="checkbox" id="chkPineapple">
</div>

<script>
const myButton = document.querySelector(".my-button");
const pineapple = document.querySelector("input[id=chkPineapple]");

function onFooClick() {
  myButton.innerText = "button clicked";
}
myButton.onclick = onFooClick;
alert('add event listeners');
pineapple.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    setTimeout(uncheckPineapple, 2000);
  } 
});

function uncheckPineapple(){
  pineapple.checked = false;
  console.log('Howdy!');
}
</script>