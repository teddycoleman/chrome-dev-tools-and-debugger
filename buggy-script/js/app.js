  window.onload = function(){
  var main = document.getElementById('main');
  var roll = document.getElementById('roll');
  var add  = document.getElementById('add');
  var targetNumber = 0;
  localStorage.setItem('score',0);
  add.addEventListener("click", function(){
    addDie();
  });
  roll.addEventListener("click", function(){
    rollDie();
  });

  function addDie(){
    var die  = document.createElement('div');
    die.setAttribute('class', 'die');
    die.innerHTML = random();
    main.appendChild(die)
  };

  //load 10 dice
  for(i=0; i<10; i++){
    addDie();
  }

  function setTargetNumber(){
    var dice = document.getElementsByClassName('die');
    var numMapping = {};
    var greatestFreq = 0;
    var mode;
    for(i = 0; i < dice.length; i++ ){
      if(numMapping[dice[i].textContent]){
        numMapping[dice[i].textContent] += 1;
      }
      else{
        numMapping[dice[i].textContent] = 1;
      }

      if (greatestFreq < numMapping[dice[i].textContent]) {
          greatestFreq = numMapping[dice[i].textContent];
          mode = dice[i].textContent;
      }
    }
    targetNumber = mode;
    console.log("targetNumber = " +   targetNumber);
  }
  setTargetNumber();

  function rollDie() {
    var dice = document.getElementsByClassName('die');
    for (var i = 0; i < dice.length; i++) {
      if(dice[i].textContent != targetNumber){
        dice[i].innerHTML = random();
      }
    };
    checkForWin();
  };

  function random(){
    return Math.ceil(Math.random() * (6));
  }

  function checkForWin(){
    var dice = document.getElementsByClassName('die');
    var areDiceIdentical = true;
    if(dice.length > 1){
      areDiceIdentical = doTheDiceMatch();
    }
    else{
      areDiceIdentical = false;
    }
    if (areDiceIdentical) {
      addScoreToLocalStorage();
    }
    console.log(localStorage.getItem('score'));
    if(parseInt(localStorage.getItem('score'))==1){
      console.log("You win!");
    }
  }

  function doTheDiceMatch(){
    var dice = document.getElementsByClassName('die');
    for(i = 0; i < dice.length-1; i++){
      if(dice[i].textContent != dice[i+1].textContent){
        return false;
      }
    }
    return true;
  }

  function addScoreToLocalStorage(){
    var score = parseInt(localStorage.getItem('score'));
    score += 1;
    localStorage.setItem('score',score);
  }

};
