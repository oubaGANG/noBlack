
$(document).ready(domReady);

function domReady(){

    var iCs=document.getElementById('game');
    ctx=iCs.getContext('2d');
    iCs.height=iCs.width*vieH()/vieW();
    //console.log(iCs.width+'  '+iCs.height);

    $('.mesh').on('tap',function(){
        $('.mesh').hide();
        var img=new Image();
        img.src='img/huaji.jpg';
        img.onload= function () {
            gameStart();
        };

    });


    var figer;
    var b;
    var grade;
    var stop;
    var startTime;
    var curTime;
    var speed;
    var arrBox;
    var w;
    var h;
    function gameStart(){


        function init(){
            figer={x:0,y:0};
            b=iCs.height/vieH();
            grade=0;
            stop=false;
            startTime=new Date().valueOf();
            curTime=null;
            speed=0;
            arrBox=[];
            w=200;
            h=300;

            $('.grade span').html(0);
        }
        init();
        $(iCs).bind('touchstart', tap);

        function tap(event) {
            var _touch = event.touches[0];
            figer.x=_touch.pageX*b;
            figer.y=_touch.pageY*b;

          //  console.log(figer.x+'  '+figer.y);

            for(var i=0;i<arrBox.length;i++){
                if(figer.x>=arrBox[i].x && figer.x<=arrBox[i].x+arrBox[i].width && figer.y>=arrBox[i].y && figer.y<=arrBox[i].y+arrBox[i].height){
                    if(arrBox[i].isTrue && !arrBox[i].isTap){
                        $('.grade span').html(++grade);
                        arrBox[i].isTap=!arrBox[i].isTap;
                    }else{
                        stop=!stop;
                        $(iCs).unbind('touchstart', tap);
                        $('.end').show();
                    }
                }
            }

        }


        function run() {
            ctx.clearRect(0,0,600,iCs.height);
            ctx.beginPath();
            for(var i=0;i<arrBox.length;i++){

                ctx.fillStyle='#fff';
                if(arrBox[i].isTrue){
                    ctx.fillStyle='#000';
                }
                //console.log(arrBox[i].isTrue);
                ctx.fillRect(arrBox[i].x,arrBox[i].y,arrBox[i].width,arrBox[i].height);
                ctx.fill();

                var img=new Image();
                img.src=arrBox[i].src;
                if(!arrBox[i].isTrue)
                ctx.drawImage(img,arrBox[i].x+25,arrBox[i].y+75,150,150);

                if(arrBox[i].isTrue){
                    ctx.strokeStyle='#fff';
                }

                 ctx.moveTo(arrBox[i].x,arrBox[i].y+300.5);
                 ctx.lineTo(arrBox[i].x+arrBox[i].width,arrBox[i].y+300.5);

               /* ctx.moveTo(0,arrBox[i].y+300.5);
                ctx.lineTo(600,arrBox[i].y+300.5);*/
                ctx.stroke();
            }
            ctx.strokeStyle='#000';
            ctx.moveTo(200,0);
            ctx.lineTo(200,iCs.height);
            ctx.stroke();
            ctx.moveTo(400,0);
            ctx.lineTo(400,iCs.height);
            ctx.stroke();
            ctx.closePath();

            curTime=new Date().valueOf();
            speed=1+Math.sqrt(curTime-startTime)/10;
            if(speed>=30){
                speed=15;
            }
            for(var i=0;i<arrBox.length;i++){

                arrBox[i].y+=speed;

                if(arrBox[i].y>-20){
                    arrBox[i].isShow=true;
                }

                if(arrBox[i].y+290 > iCs.height && arrBox[i].isTrue && !arrBox[i].isTap){
                    stop=!stop;
                    $(iCs).unbind('touchstart', tap);
                    $('.end').show();
                }

                if(arrBox[i].y > iCs.height){
                    arrBox.splice(i,1);
                }

            }
            if(arrBox[arrBox.length-1].y>-20 && arrBox[arrBox.length-1].isShow){
                addBox();
            }

            console.log(arrBox[0].y+'  '+iCs.height);
           /* if(arrBox[0].y+300>=iCs.height && ){
                stop=!stop;
                $(iCs).unbind('touchstart', tap);
                $('.end').show();
            }*/

            if(!stop)
            //console.log(arrBox.length);
            requestAnimationFrame(run);
            else
                return false;

        }

        requestAnimationFrame(run);

        addBox();

        function addBox(){
            var isTrue=rnd(0,2);
            for(var i=0;i<3;i++){
                var t=false;
                if(isTrue==i){
                    t=true;
                }
                var box={
                    width:w,
                    height:h,
                    x:w*i,
                    y:-300,
                    isTrue:t,
                    src:'img/huaji.jpg',
                    isTap:false,
                    isShow:false
                };
                arrBox.push(box);
            }
        }
    }

}



//随机数  n<=x<=m
function rnd(n,m){
    return parseInt(Math.random()*(m-n+1)+n);
}

//可视区高
function vieH()
{
    return document.documentElement.clientHeight;
}
//可视区宽
function vieW()
{
    return document.documentElement.clientWidth;
}