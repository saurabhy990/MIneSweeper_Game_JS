 document.addEventListener('DOMContentLoaded',()=>{
   const grid =  document.querySelector('.grid')//store all the divs(square)
   const flagsLeft =document.querySelector('#flags-left') 
   const bombsLeft =document.querySelector('#bombs-left')
  // const gameLevels= document.querySelectorAll('#levels').value
   const result  = document.querySelector('#result')
   const width = 10
   let bombAmount = 20//add dropdown  
   let squares =[] //store all cliked divs using : squares.push(square) 
   let isGameOver = false
   let flags = 0
  // console.log(grid);


   //Create Board
function createBoard(){
    
    flagsLeft.innerHTML =  bombAmount
    bombsLeft.innerHTML =  bombAmount
    //gameLevels.innerHTML = levels
    //get shuffled game array with random bombs
 
    const bombArray = Array(bombAmount).fill('bomb') //assign  bombs in array
    const emptyArray = Array(width*width- bombAmount).fill('valid')//to fill all valid items except bomb
  
    const gameArray = emptyArray.concat(bombArray)
    const shuffledArray = gameArray.sort(()=>Math.random()-0.5)//sorting array randomly

    console.log(shuffledArray);

    for (let i = 0; i < width*width; i++) {
        //creating divs
        const square =  document.createElement('div')
        square.id = i
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)

       //normal click to add numbers(valid) and bombs
        square.addEventListener('click',function()
        {
            click(square)
        })

        // leftclick to add flags
        square.addEventListener('contextmenu',function()
        {
            addFlag(square)
        })
       
    }


    //add numbers

    for (let i = 0; i < squares.length; i++) {
         let total = 0
         const isLeftEdge = (i % width === 0)
         const isRigthtEdge = (i % width === width - 1)
         //console.log(squares)
        if(squares[i].classList.contains('valid')){
            if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb'))  total++
            if(i>9 && !isRigthtEdge && squares[i+1-width].classList.contains('bomb'))  total++
            if(i>10  && squares[i-width].classList.contains('bomb'))  total++
            if(i>11 && !isLeftEdge  && squares[i-width -1].classList.contains('bomb'))  total++
            //squares missing
            if(i<99 && !isRigthtEdge && squares[i+1].classList.contains('bomb'))  total++
            if(i<90 && !isLeftEdge && squares[i-1+ width].classList.contains('bomb'))  total++
            if(i<88 && !isRigthtEdge && squares[i+1+width].classList.contains('bomb'))  total++
            if(i<89  && squares[i+width].classList.contains('bomb'))  total++
            squares[i].setAttribute('data', total)
          

        }
    }

 }
 createBoard()

//add flag o rightclick
function addFlag(square){
    if(isGameOver) return
    if(!square.classList.contains('checked')&&(flags<bombAmount)){
        if(!square.classList.contains('flag')){
            flags++
            square.innerHTML ='🚩'
            flagsLeft.innerHTML = bombAmount - flags
            checkForWin()
        } else {
            square.classList.remove('flag')
            flags--
            square.innerHTML = ''
            flagsLeft.innerHTML =  bombAmount - flags
        }
    }
}


//checking clicked numbers (valid/bombs)
 function click(square){
    console.log(square);
    if(isGameOver || square.classList.contains('checked')|| square.classList.contains('flag'))  return

    if(square.classList.contains('bomb')){
        gameOver()
    } else {
       let  total =  square.getAttribute('data')
       if(total != 0){
       
        if(total ==1) square.classList.add('one')
        if(total ==2) square.classList.add('two')
        if(total ==3) square.classList.add('three')
        if(total ==4) square.classList.add('four')
        square.innerHTML =  total
        return
        
       }
       checkSquare(square)
    }
    square.classList.add('checked')
 }

// check neighbour square once square is clicked
   function checkSquare(square){
     const currentId  = square.id
     const isLeftEdge =(currentId % width === 0)
     const isRigthtEdge = (currentId % width === width  -1 )

     setTimeout(function(){

        if(currentId > 0 && !isLeftEdge){
            const newId  =  parseInt(currentId) - 1 
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 9 && !isRigthtEdge){
            const newId  =  parseInt(currentId) + 1 - width 
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 10){
            const newId  = parseInt(currentId) - width
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 11 && !isLeftEdge){
            const newId  = parseInt(currentId) - 1 -width
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 98 && ! isRigthtEdge){
            const newId  = parseInt(currentId) + 1
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 90 && !isLeftEdge){
            const newId  =  parseInt(currentId) - 1 + width 
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 88 && !isRigthtEdge){
            const newId  =  parseInt(currentId) + 1 + width 
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 89 ){
            const newId  =  parseInt(currentId) + width 
            const newSquare  = document.getElementById(newId)
            click(newSquare)
        }

     },10)
   }

//check winner
  function checkForWin(){
    let matches  =0
    for (let i = 0; i < squares.length; i++) {
         if(squares[i].classList.contains('flag')&& squares[i].classList.contains('bomb')){
            matches++
         }
        if(matches===bombAmount){
            result.innerHTML = 'YOU WIN'
            isGameOver = true
        }
    }
 }


 //game over function
    function gameOver(){
        result.innerHTML = 'BOOM !! Game Over'
        isGameOver = true

        //show all the bombs
        squares.forEach(function(square){
            if(square.classList.contains('bomb')){
                square.innerHTML = '💣'
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
    }

})

 