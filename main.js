score_board=document.querySelector('.score')
screen=document.querySelector('.screen');
screen2=document.querySelector('.screen2');
score=0;
ocupied=[];
let all_shapes=[
   {id: 'line_',
    positions:[16,17,18,19],
    rotate:[]
    },
    {id: 'line_s',
    shape:1,
    positions:[6,18,30,42],
    rotate:[]
    },
    {id: 'el',
    positions:[6,18,30,31],
    rotate:[]
    },
    {id: 'el_s',
    positions:[16,18,17,28],
    rotate:[]
    },
    {id: 'el_op',
    positions:[6,18,30,5],
    rotate:[]
    },
    {id: 'el_up',
    positions:[16,18,30,17],
    rotate:[]
    },
    {id: 'tee_',
    positions:[6,17,4,5],
    rotate:[]
    },
    {id: 'tee_l',
    positions:[29,17,18,5],
    rotate:[]
    },
    {id: 'tee_r',
    positions:[18,6,30,17],
    rotate:[]
    },
    {id: 'tee_u',
    positions:[18,16,5,17],
    rotate:[]
    },
    {id: 'box',
    positions:[18,6,5,17],
    rotate:[]
    },
]
class square{
    constructor(pos){
    let rem=pos % 12;
    let times=Math.floor(pos/12)
    this.x= (20*rem)+(3*(rem+1))
    this.y= (20*times)+(3*(times+1))
    this.pos=pos;
    
    }
    moveleft(leftlock){
       if(!leftlock){
           this.pos--;
           this.x-=23;
          return this.pos%12==0;
       }
       return leftlock;

    }
    moveright(rightlock){
        if(!rightlock){
            this.pos++;
            this.x+=23;
           return (this.pos+1)%12==0;
        }
        return rightlock;
     
    }
    movedown(placable_box){
        this.pos+=12;
        this.y+=23;
      return placable_box[this.pos]==true;
    }
}


function generate_shape(){
    let id=Math.floor(Math.random()*all_shapes.length);
    //  id=2;
    let squares=[];
    let the_shape=all_shapes[id];
    the_shape.positions.forEach(sq=>{
        squares.push(new square(sq))
    })
    squares.push(id)
    squares.push(generate_color())
  
    return squares;

}

 shapes=0;


const colors=[
    '#DA3B01',
    '#5A9A22',
    '#4880D7',
    '#FD2ACF',
    '#FFC107',
    '#F05968',
    '#AF326A'

];
function generate_color(){
    x=Math.floor(Math.random()*6);
    return colors[x];
}


 let next=generate_shape();
 let next_next=generate_shape();

draw_next_next();

 height=3;

 let last_placable_box=[];

 for(i=288;i<299;i++){
     last_placable_box[i]=true;
 }
 stop_movement=false;
 shape=0;
 
 function draw_next_next(){
    for(i=0;i<4;i++){
        prev=document.querySelector('.nxt_box'+i);
        prev!=null?screen2.removeChild(prev):false;
        box2=document.createElement('div');
        box2.classList.add('nxt_box'+i);
        box2.style.cssText='height:20px; width:20px; position:absolute; background:'+next_next[5]+'; left:'+(next_next[i].x-49)+'px; top:'+next_next[i].y+'px;';
        screen2.appendChild(box2) ;

    }

 }



function play(){
   
  if(!stop_movement){
  for(i=0;i<4;i++){
      prev=document.querySelector('.box_'+i+'_'+shape);
      prev!=null?screen.removeChild(prev):false;
      box=document.createElement('div');
      box.classList.add('box_'+i+'_'+shape);
      box.setAttribute('id','position_'+next[i].pos);
      box.style.cssText='height:20px; position:absolute; width:20px; background:'+next[5]+'; left:'+next[i].x+'px; top:'+next[i].y+'px;';
      screen.appendChild(box); 
 
      if(next[i].movedown(last_placable_box)){
          stop_movement=true;
      }
     
    }

  }

  else{
      for(i=0;i<4;i++){
          last_placable_box[next[i].pos-12]=true;
          ocupied[next[i].pos]=true;
      }
     next=next_next;
     next_next=generate_shape();
     draw_next_next();
     stop_movement=false;
    shape++;
    rlock=false;
    llock=false;
    givescore()
 }
}


play();
setInterval(play,250);

width=0;
let llock=false,rlock=false;
document.querySelector('.right').addEventListener('click',e=>{
move_right()
});
function move_right(){
    let lock_change=rlock;
    llock=false;
   for(j=0;j<4;j++){
        if(next[j].moveright(rlock)){
          lock_change=true
        }
     
   }
    rlock=lock_change;
 
 }
document.querySelector('.left').addEventListener('click',e=>{
    move_left()
});
function move_left(){
    let lock_change=llock;
   rlock=false;
  for(j=0;j<4;j++){
      
       if(next[j].moveleft(llock)){
         lock_change=true;
       }
    
  }
   llock=lock_change;
}

function givescore(){
    for(i=299;i>0;i=i-12){

      for(j=i;j>i-12;j--){
         if(ocupied[j]!=true){
             break;
         }else if(j==i-11){
             score+=5;
             score_board.textContent=score;
             clearline(i)
            
         }
      }

    }
}


function clearline(start){
    for(k=start;k>start-12;k--){
        x=document.getElementById('position_'+(k-12))
      x?screen.removeChild(x):true;
       ocupied[k]=false;
    }

    for(i=start;i>0;i--){
        if(ocupied[i]==true){
            ocupied[i+12]=true;
            ocupied[i]=false;
        }
        if(last_placable_box[i]==true)
        last_placable_box[i+12]=true;
        last_placable_box[i]=false;

        y=document.getElementById('position_'+(i-12));
        if(y!=null){
           tops=find_y(i);
           tops+=23;
        //    console.log(tops);
           y.style.top=tops+'px';
           y.setAttribute('id','position_'+(i+12))

          
        }
    }
}
function find_y(pos){
    height=Math.floor(pos/12);
    return (20*(height-1)+3*height);

}

document.querySelector('body').addEventListener('keydown',e=>{
    if(e.key=='ArrowLeft'){
        move_left()
    }else if(e.key=='ArrowRight'){
        move_right()
    }
    console.log(e.key)
})

//wanyeki