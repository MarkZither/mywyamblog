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

<div class="container-fluid">
<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Bases
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div class="container">
                <div class="row">
                  <div class="col-lg-2">
                    <input type="checkbox" id="chk00">
                  </div>
                  <div class="col-lg-10">
                    <label for="chk00">My Typo 00 Ooni Classic</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="container">
                <div class="row">
                  <div class="col-lg-2">
                    <input type="checkbox" id="chkRoman">
                  </div>
                  <div class="col-lg-10">
                    <label for="chkRoman">Roman</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="container">
                <div class="row">
                  <div class="col-lg-2">
                    <input type="checkbox" id="chkNapoletana">
                  </div>
                  <div class="col-lg-10">
                    <label for="chkNapoletana">Napoletana</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
            <div class="container">
              <div class="row">
                <div class="col-lg-2">
                  <input type="checkbox" id="chkSpecial">
                </div>
                <div class="col-lg-10">
                  <label for="chkSpecial">My Own Dough with extra course Odlums wholemeal</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="container">
                <div class="row">
                  <div class="col-lg-2">
                    <input type="checkbox" id="chkSourdough">
                  </div>
                  <div class="col-lg-10">
                    <label for="chkSourdough">Untested Sourdough</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Toppings
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        <div>
          <label for="chkPineapple">Pineapple</label><input type="checkbox" id="chkPineapple">
          <span id="pineappleNo" class="invisible">NO!</span>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Drinks
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <input type="checkbox" id="chk404"><label for="chk404"><a href="https://untp.beer/zBrr3" target="_blank">Cha Blonde404</a></label>
            </div>
            <div class="col-sm">
              <input type="checkbox" id="chkNegroni"><label for="chkNegroni">Mezcal Negroni</label>
            </div>
            <div class="col-sm">
              <input type="checkbox" id="chkMule"><label for="chkMule">Mule</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Other Stuff
        </button>
      </h5>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <input type="checkbox" id="chkUgly"><label for="chkUgly"><a href="https://untp.beer/zBrr3" target="_blank">Crazy Bastard Carolina Reaper & Blueberry Sauce</a></label>
            </div>
            <div class="col-sm">
              <label for="chkFoccacia">foccacia</label><input type="checkbox" id="chkFoccacia">
            </div>
            <div class="col-sm">
              <label for="chkMule">Mule</label><input type="checkbox" id="chkMule">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<div>
  <button class="my-button">Button</button>
</div>

<script>
const myButton = document.querySelector(".my-button");
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
</script>