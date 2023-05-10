window.onload = (event) => {
  console.log("page is fully loaded");
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
};

const myButton = document.querySelector("#btnSubmit");
const pineapple = document.querySelector("input[id=chkPineapple]");
const pineappleNo = document.querySelector("#pineappleNo");

function onFooClick() {
  myButton.innerText = "button clicked";
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

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = "mark";//button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})