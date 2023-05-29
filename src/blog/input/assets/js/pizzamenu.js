window.onload = (event) => {
  console.log("page is fully loaded");
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
};

const myButton = document.querySelector("#btnSubmit");
const pineapple = document.querySelector("input[id=chkPineapple]");
const pineappleNo = document.querySelector("#pineappleNo");
const abalone = document.querySelector("input[id=chkAbalone]");
const abaloneNo = document.querySelector("#abaloneNo");
const weisse = document.querySelector("input[id=chkWeisse]");
const weisseNo = document.querySelector("#weisseNo");
const roman = document.querySelector("input[id=chkRoman]");
const romanNo = document.querySelector("#romanNo");

function onFooClick() {
}
myButton.onclick = onFooClick;

pineapple.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    pineappleNo.classList.remove("invisible")
    setTimeout(uncheckPineapple, 2000);
  }
});

function uncheckPineapple(){
  pineapple.checked = false;
  pineappleNo.classList.add("invisible")
  console.log('Howdy!');
}

abalone.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    abaloneNo.classList.remove("invisible")
    setTimeout(uncheckAbalone, 2000);
  }
});

function uncheckAbalone(){
  abalone.checked = false;
  abaloneNo.classList.add("invisible")
  console.log('Howdy!');
}

weisse.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    weisseNo.classList.remove("invisible")
    setTimeout(uncheckWeisse, 2000);
  }
});

function uncheckWeisse(){
  weisse.checked = false;
  weisseNo.classList.add("invisible")
  console.log('Howdy!');
}

roman.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    romanNo.classList.remove("invisible")
    setTimeout(uncheckRoman, 2000);
  }
});

function uncheckRoman(){
  roman.checked = false;
  romanNo.classList.add("invisible")
  console.log('Howdy!');
}

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = "mark";//button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  myButton.disabled = true
})