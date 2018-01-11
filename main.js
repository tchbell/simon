//holds the computer logic for simon game
const simonComputer = {
  //contains what round the game is currently on
  round: 0,
  //contains which cell was chosen by the computer
  simonMoves: [],
  //randomly selected one of the cells every 750 ms
  gridChoice: function(){
    //gets called as many times are there are rounds
    for(let i=0; i<this.round; i++){
      //IFFE so that each iteration is called with the delay
      (function(i){
        setTimeout(function(){
          let simonSaid = Math.floor(Math.random() * (5 - 1)) + 1;
          let cell = document.getElementById(simonSaid);
          //adds highlighted class so player can see what cell was selected
          cell.classList.add('highlighted');
          //removes highlighted class so there is no visual confusion
          setTimeout(function(){
            cell.classList.remove('highlighted');
          }, 720);
          console.log(simonSaid);
          //puts the chosen cell into simonMoves
          simonComputer.simonMoves.push(simonSaid);
        }, 750 * i);
      })(i);
    }
  }
};

//player logic
const player = {
  moves: []
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
    let grid = document.querySelector('.grid');
    grid.addEventListener('click', function(e){
      if(e.target.className.includes("box")){
        player.moves.push(e.target.id);
        let cell = document.getElementById(e.target.id);
        //adds highlighted class so player can see what cell was selected
        cell.classList.add('highlighted');
        //removes highlighted class so there is no visual confusion
        setTimeout(function(){
          cell.classList.remove('highlighted');
        }, 220);
        console.log(player.moves);
      }
    });
  }
}
handlers.startBtn();
handlers.playerClick();
