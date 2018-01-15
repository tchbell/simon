//holds the computer logic for simon game
const simonComputer = {
  //contains what round the game is currently on
  round: 0,
  //if strictMode is on then player must restart if they get a match wrong
  strictMode: false,
  //contains which cell was chosen by the computer
  simonMoves: [],
  //randomly selected one of the cells every 750 ms
  gridChoice: function(){
    //if round goes to twenty the player is alerted that they won
    if(this.round >=20){
      alert("winner");
    }else{
    //shows the current round number
      let showRound = (function(){
        let roundView = document.querySelector(".roundNumber");
        roundView.innerHTML = simonComputer.round;
      })();
      //gets called as many times are there are rounds
      for(let i=0; i<this.round; i++){
        //IFFE so that each iteration is called with the delay
        (function(i){
          setTimeout(function(){
            let simonSaid = Math.floor(Math.random() * (5 - 1)) + 1;
            let cell = document.getElementById(simonSaid);
            //adds highlighted class so player can see what cell was selected
            cell.classList.add('highlighted');
            //sounds that correlate to cells
            const soundPath = "https://s3.amazonaws.com/freecodecamp/simonSound"
            const redSoundPath = soundPath+"1.mp3";
            const redSound = new Audio(redSoundPath);
            const blueSoundPath = soundPath+"2.mp3";
            const blueSound = new Audio(blueSoundPath);
            const greenSoundPath = soundPath+"3.mp3";
            const greenSound = new Audio(greenSoundPath);
            const yellowSoundPath = soundPath+"4.mp3";
            const yellowSound = new Audio(yellowSoundPath);

              if(simonSaid === 1 ){
                redSound.play();
              }else if(simonSaid === 2 ){
                blueSound.play();
              }else if(simonSaid ===  3){
                greenSound.play();
              }else if(simonSaid ===4){
               yellowSound.play();
              }

            //removes highlighted class so there is no visual confusion
            setTimeout(function(){
              cell.classList.remove('highlighted');
            }, 720);
            //puts the chosen cell into simonMoves
            simonComputer.simonMoves.push(simonSaid);
          }, 750 * i);
        })(i);
      }
    }
  },
  replayMoves: function(){
    for(let i=0; i<this.simonMoves.slice(-this.round).length; i++){
      //IFFE so that each iteration is called with the delay
      (function(i){
        setTimeout(function(){
          let simonSaid = simonComputer.simonMoves.slice(-simonComputer.round)[i];
          let cell = document.getElementById(simonSaid);
          //adds highlighted class so player can see what cell was selected
          cell.classList.add('highlighted');
          //adding sounds
          const soundPath = "https://s3.amazonaws.com/freecodecamp/simonSound"
          const redSoundPath = soundPath+"1.mp3";
          const redSound = new Audio(redSoundPath);
          const blueSoundPath = soundPath+"2.mp3";
          const blueSound = new Audio(blueSoundPath);
          const greenSoundPath = soundPath+"3.mp3";
          const greenSound = new Audio(greenSoundPath);
          const yellowSoundPath = soundPath+"4.mp3";
          const yellowSound = new Audio(yellowSoundPath);

            if(simonSaid === 1 ){
              redSound.play();
            }else if(simonSaid === 2 ){
              blueSound.play();
            }else if(simonSaid ===  3){
              greenSound.play();
            }else if(simonSaid ===4){
             yellowSound.play();
            }
          //removes highlighted class so there is no visual confusion
          setTimeout(function(){
            cell.classList.remove('highlighted');
          }, 720);
          //puts the chosen cell into simonMoves
        }, 750 * i);
      })(i);
    }
  }

};

//player logic
const player = {
  moves: [],
  moveNumber : 0
}

//holds the button handlers
const handlers ={
  startBtn: function(){
    let startButton =  document.querySelector('.start');
    startButton.addEventListener('click', function(){
      simonComputer.round ++;
      simonComputer.gridChoice();
    });
  },
  playerClick: function(){
    const grid = document.querySelector('.grid');
    grid.addEventListener('click', function(e){
      const redSoundPath = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
      const redSound = new Audio(redSoundPath);
      const blueSoundPath = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
      const blueSound = new Audio(blueSoundPath);
      const greenSoundPath = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
      const greenSound = new Audio(greenSoundPath);
      const yellowSoundPath = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
      const yellowSound = new Audio(yellowSoundPath);


      if(e.target.className.includes("box")){
        if(e.target.className.includes("red")){
          redSound.play();
        }else if(e.target.className.includes("blue")){
          blueSound.play();
        }else if(e.target.className.includes("green")){
          greenSound.play();
        }else if(e.target.className.includes("yellow")){
         yellowSound.play();
        }

        player.moves.push(e.target.id);
        let cell = document.getElementById(e.target.id);
        //adds highlighted class so player can see what cell was selected
        cell.classList.add('highlighted');
        //removes highlighted class so there is no visual confusion
        setTimeout(function(){
          cell.classList.remove('highlighted');
        }, 220);
        //setting up checking click versus computers chosen cells;
        let playerChoice = parseInt(e.target.id);
        let roundMoves = simonComputer.simonMoves.slice(-simonComputer.round);

        //if you click the right cell
        if( playerChoice === roundMoves[player.moveNumber]){
          //increase playermove so that we can keep checking the roundMoves array
          player.moveNumber++;
          //once the players move number is as large as the round move array length the game starts another round
          if(player.moveNumber ===roundMoves.length){
            //wait .5 seconds and start another round;
            setTimeout(function(){
              player.moveNumber = 0;
              simonComputer.round ++;
              simonComputer.gridChoice();
            }, 1000)
          }
          //if player clicks the wrong box the pattern will repeat after a second delay
        }else{
          setTimeout(function(){
            if(simonComputer.strictMode){
              alert('You missed, time to start over!')
              simonComputer.round = 1;
              simonComputer.simonMoves.length = 0;
              player.moveNumber = 0;
              simonComputer.gridChoice();
            }else{
              alert("Try again!")
              simonComputer.replayMoves();
            }

          }, 1000);
          player.moveNumber = 0;
        }
      }
    });
  },//end playerClick
  resetGame: function(){
    let resetBtn = document.querySelector('.reset');
    resetBtn.addEventListener('click', function(){
      simonComputer.round = 1;
      simonComputer.simonMoves.length = 0;
      player.moveNumber = 0;
      simonComputer.gridChoice();
    })
  },
  strictMode: function(){
    let strictBtn = document.querySelector(".strict");
    let strictStatus = document.querySelector('.strictStatus');
    strictBtn.addEventListener('click', function(){
      simonComputer.strictMode = !simonComputer.strictMode;
      if(simonComputer.strictMode){
        strictStatus.innerHTML = "On";
      }else if(!simonComputer.strictMode){
        strictStatus.innerHTML ="Off";
      }
    })
  }// end resetGame


}
handlers.startBtn();
handlers.playerClick();
handlers.resetGame();
handlers.strictMode();
