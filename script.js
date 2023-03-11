

const time=document.querySelector('.time');
const icon__left=document.querySelector('.icon__left');
const name__left=document.querySelector('.name__left');
const icon__right=document.querySelector('.icon__right');
const name__right=document.querySelector('.name__right');
const allLoop=document.querySelector('.loop')
const circle=document.querySelector('.two')




let idInterval;
let fullTime=[0,0,0]
let loopTime=[0,0,0]

const filterTime=(t)=>{
    return t<10?`0${t}`:t
}

const startTimer=(isStart)=>{
    
   if(isStart){
    idInterval=setInterval(()=>{
        //основное время
        time.innerHTML=`${filterTime(fullTime[0])}:${filterTime(fullTime[1])},${filterTime(fullTime[2])}`
        fullTime[2]=fullTime[2]+1;
        if(fullTime[2]==100){
            fullTime[1]++;
            fullTime[2]=0;
        }
        if (fullTime[1]==60) {
            fullTime[0]++
            fullTime[1]=0;
        }
        //время круга
        loopTime[2]=loopTime[2]+1;
        if(loopTime[2]==100){
            loopTime[1]++;
            loopTime[2]=0;
        }
        if (loopTime[1]==60) {
            loopTime[0]++
            loopTime[1]=0;

        }

    },10)
   }else{
    clearInterval(idInterval)
   }


}

const clearTimer=()=>{
    fullTime=[0,0,0]
    loopTime=[0,0,0]
    time.innerHTML=`${filterTime(fullTime[0])}:${filterTime(fullTime[1])},${filterTime(fullTime[2])}`
}




//Левая кнопка
icon__left.addEventListener('click',()=>{

    
    if(name__left.innerHTML=="Start"){
        circle.classList.add('anim')
        circle.style.animationPlayState="running"
        startTimer(true)
        name__left.innerHTML="Stop"
        icon__left.style.setProperty('--icon_left',`url('./img/pause.svg')`)
        name__right.innerHTML="Loop"
        icon__right.style.setProperty('--icon_right',`url('./img/icons8-replace-24.png')`)
    }else{
        circle.style.animationPlayState="paused"
        startTimer(false)
        name__left.innerHTML="Start"
        icon__left.style.setProperty('--icon_left',`url('./img/play-24.png')`)
        name__right.innerHTML="Reset"
        icon__right.style.setProperty('--icon_right',`url('./img/square.svg')`)
    }
})

//Правая кнопка
icon__right.addEventListener('click',()=>{

    
    if(name__right.innerHTML==="Reset"){
        circle.classList.remove('anim')
        clearTimer()
        removeLoop()
        name__right.innerHTML="Loop"
        icon__right.style.setProperty('--icon_right',`url('./img/icons8-replace-24.png')`)
    }else{
        if(name__left.innerHTML!="Start"){
            createLoop(loopTime)
            if (count>=5) {
                allLoop.firstChild.remove()
            }
        }
        
    }
})

//Создание круга

let count=0;

const createLoop=(time)=>{
    const main_div=document.createElement('div')
    main_div.classList.add('loop__item')
    
    const looping_count=document.createElement('div')
    looping_count.classList.add('looping')
    looping_count.innerHTML=count;
    count++;
    
    const time_loop=document.createElement('div')
    time_loop.classList.add('timer')
    time_loop.innerHTML=`${filterTime(time[0])}:${filterTime(time[1])},${filterTime(time[2])}`;

    main_div.appendChild(looping_count)
    main_div.appendChild(time_loop)
    allLoop.appendChild(main_div)
    loopTime=[0,0,0]
}

const removeLoop=()=>{
   allLoop.innerHTML=""
   count=0;
}


