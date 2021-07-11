let runes = ["ᛅ","ᛒ","ᚴ","ᛏ","ᛅ","ᚠ","ᚴ","ᚼ","ᛁ","ᛁ","ᚴ","ᛚ","ᛘ","ᚾ","ᚬ","ᛒ","ᚱ","ᛋ","ᛏ","ᚢ","ᚢ","ᛋ"];
let uniqueRunes = ["ᛅ","ᛒ","ᚴ","ᛏ","ᚠ","ᚼ","ᛁ","ᛋ","ᛚ","ᛘ","ᚾ","ᚬ","ᚱ","ᚢ"];
let latin = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","z"];
let mode = "runesToLatin";

document.addEventListener('DOMContentLoaded', function() {
  initRuneButtons();
  initLatinButtons();
  initToggleButton();
  initDeleteBtn();
  initSpaceBtn();
});

window.onkeydown = function(e){
  let key = e.keyCode;

  for(let i = 0; i < latin.length; i++){
    if(e.key === latin[i]){
      type([runes[i]]);
    }
  };

  if(e.keyCode === 8){
    deleteLastChar();
  }
  if(e.keyCode === 32){
    addSpace();
  }

};

function initToggleButton(){
  let button = document.querySelector(".toggle-button");
  button.addEventListener("click",function(){
    if(mode == "runesToLatin"){
      mode = "latinToRunes";
      document.querySelector(".rune-buttons").style.display = "none";
      document.querySelector(".latin-buttons").style.display = "flex";
      button.innerHTML = "ABC → ᛅᛒᚴ";

    }else{
      mode = "runesToLatin";
      document.querySelector(".rune-buttons").style.display = "flex";
      document.querySelector(".latin-buttons").style.display = "none";
      button.innerHTML = "ᛅᛒᚴ → ABC";
    }
    document.querySelector(".output").innerHTML = "";
  });
}

function initRuneButtons(){
  let buttons = document.querySelector(".rune-buttons")
  for(let i = 0; i < uniqueRunes.length; i++){
    let currentRune = uniqueRunes[i];
    let button = document.createElement("div");
    button.innerHTML = currentRune;
    button.classList.add("button");
    button.addEventListener("click",function(){
      runesToLatin(currentRune);
    })
    buttons.append(button);
  }
}
function initLatinButtons(){
  let buttons = document.querySelector(".latin-buttons")
  for(let i = 0; i < latin.length; i++){
    let currentChar = latin[i];
    let button = document.createElement("div");
    button.innerHTML = currentChar;
    button.classList.add("button");
    button.addEventListener("click",function(){
      latinToRunes(currentChar);
    })
    buttons.append(button);
  }
}

function initDeleteBtn(){
  let deleteBtn = document.querySelector(".delete");
  deleteBtn.addEventListener("click",function(){
    deleteLastChar();
  });
}

function deleteLastChar(){
  let output = document.querySelector(".output");
  if(output.children.length > 0){
      output.removeChild(output.lastChild);
  }

}

function initSpaceBtn(){
  let spaceBtn = document.querySelector(".space");
  spaceBtn.addEventListener("click",function(){
    addSpace();
  });
}

function addSpace(){
  type(["&nbsp;"]);
}
function latinToRunes(input){
  let matchingRunes = [];
  for(let i = 0; i < latin.length; i++){

    if(input === latin[i]){
      matchingRunes.push(runes[i]);
    }
  }
  return matchingRunes;
}


function latinToRunes(input){
  for(let i = 0; i < latin.length; i++){
    if(input === latin[i]){
      type([runes[i]]);
    }
  }
}

function runesToLatin(input){
  let matchingLetters = [];
  for(let i = 0; i < runes.length; i++){

    if(input === runes[i]){
      matchingLetters.push(latin[i]);
    }
  }
  //console.log(matchingLetters);
  type(matchingLetters);
}


function type(input){
  let output = document.querySelector(".output");
  let character = document.createElement("div");
  character.classList.add("character");
  //let counter = 1;
  if(input.length > 1){
    character.innerHTML = input[0];
    setInterval(function(){
      character.innerHTML = random(input);
      //counter = (counter + 1) % input.length;
    },400);
  }else{
    character.innerHTML = input[0];
  }


  // for(let i = 0; i < input.length; i++){
  //   let letter = document.createElement("div");
  //   letter.classList.add("letter");
  //   letter.innerHTML = input[i];
  //
  //   letterGroup.append(letter);
  //   //let letter = input[i];
  // }
  output.append(character);
}


function random(min, max) {
	var rand = Math.random();

	if (typeof min === 'undefined') {
		return rand;
	} else if (typeof max === 'undefined') {
		if (min instanceof Array) {
			return min[Math.floor(rand * min.length)];
		} else {
			return rand * min;
		}
	} else {
		if (min > max) {
			var tmp = min;
			min = max;
			max = tmp;
		}
		return rand * (max - min) + min;
	}
};
