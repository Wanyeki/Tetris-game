score_board=document.querySelector('.score')
screen=document.querySelector('.screen');
screen2=document.querySelector('.screen2');
score=0;
ocupied=[];
class square{
    constructor(pos){
    this.x=pos<12 ? (20*pos)+(3*(pos+1)):(20*(pos-12))+(3*(pos-11));
    this.y=pos<12 ? 3 : 26;
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
    let id=Math.floor(Math.random()*4);
    // let id=0;
    let squares=[];
    switch (id){
        case 0:
            squares[0]=new square(16);
            squares[1]=new square(17);
            squares[2]=new square(18);
            squares[3]=new square(19);
            squares[4]=0;
            squares[5]=generate_color();
         break
        case 1:
                squares[0]=new square(4);
                squares[1]=new square(5);
                squares[2]=new square(6);
                squares[3]=new square(17);
                squares[4]=1;
                squares[5]=generate_color();
        break
        case 2:
                squares[0]=new square(18);
                squares[1]=new square(5);
                squares[2]=new square(6);
                squares[3]=new square(17);
                squares[4]=2;
                squares[5]=generate_color();
        break
        case 3:
                squares[0]=new square(4);
                squares[1]=new square(5);
                squares[2]=new square(6);
                squares[3]=new square(18);
                squares[4]=4;
                squares[5]=generate_color();
                
        break
        
    }
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
        prev!=null?screen2.removeChild(prev):console.log('');
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
      prev!=null?screen.removeChild(prev):console.log('');
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
document.querySelector('.right').addEventListener('click', function(){
   let lock_change=rlock;
   llock=false;
  for(j=0;j<4;j++){
       if(next[j].moveright(rlock)){
         lock_change=true
       }
    
  }
   rlock=lock_change;

});
document.querySelector('.left').addEventListener('click', function(){
    let lock_change=llock;
   rlock=false;
  for(j=0;j<4;j++){
      
       if(next[j].moveleft(llock)){
         lock_change=true;
       }
    
  }
   llock=lock_change;
});

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
           console.log(tops);
           y.style.top=tops+'px';
           y.setAttribute('id','position_'+(i+12))

          
        }
    }
}
function find_y(pos){
    height=Math.floor(pos/12);
    return (20*(height-1)+3*height);

}

//wanyeki