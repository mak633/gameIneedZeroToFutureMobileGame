if (self.location!=top.location) top.location=''+self.location;

boardSize=15;
maxF=4;
nClicks=0;
Level=5;

if (document.images) {
 Img0=new Image(); Img0.src='s0.gif';
 Img1=new Image(); Img1.src='s1.gif';
 Img2=new Image(); Img2.src='s2.gif';
 Img3=new Image(); Img3.src='s3.gif';
 Img4=new Image(); Img4.src='s4.gif';
}

f=new Array();

for (i=0;i<20;i++) {
 f[i]=new Array();
 for (j=0;j<20;j++) {
  f[i][j]=0;
 }
}

function decrement(i,j) {
 f[i][j]--; if (f[i][j]<0) f[i][j]=maxF;
}

function increment(i,j) {
 f[i][j]++; if (f[i][j]>maxF) f[i][j]=0;
}

function decrementGroup(i,j) {
 decrement(i,j);
 if (i>0) decrement(i-1,j);
 if (j>0) decrement(i,j-1);
 if (i+1<boardSize) decrement(i+1,j);
 if (j+1<boardSize) decrement(i,j+1);
}

function incrementGroup(i,j) {
 increment(i,j);
 if (i>0) increment(i-1,j);
 if (j>0) increment(i,j-1);
 if (i+1<boardSize) increment(i+1,j);
 if (j+1<boardSize) increment(i,j+1);
}

function clk(iMove,jMove) {
 if (gameOver) return;
 decrementGroup(iMove,jMove);
 drawSquare(iMove,jMove);
 nClicks++;
 self.fb.document.form1.clickCount.value=''+nClicks;
 gameOver=testResult();
 if (gameOver) {
  playAgain=confirm('Congratulations! You did it in '+nClicks+' clicks. \n\nPlay again?')
  if (playAgain) init();
  else {
   if (self.sayGoodBye) sayGoodBye(); 
   else self.close();
  }
 }
}

function testResult() {
 for (var i=0;i<boardSize;i++) {
  for (var j=0;j<boardSize;j++) {
   if (f[i][j]!=0) return 0; 
  }
 }
 return 1;
}


function drawSquare(i,j) {
 if (document.images) {
  eval('self.f1.document.s'+i+'_'+j+'.src="s'+f[i][j]+'.gif"');
  if (i>0) eval('self.f1.document.s'+(i-1)+'_'+j+'.src="s'+f[i-1][j]+'.gif"');
  if (j>0) eval('self.f1.document.s'+i+'_'+(j-1)+'.src="s'+f[i][j-1]+'.gif"');
  if (i+1<boardSize) eval('self.f1.document.s'+(i+1)+'_'+j+'.src="s'+f[i+1][j]+'.gif"');
  if (j+1<boardSize) eval('self.f1.document.s'+i+'_'+(j+1)+'.src="s'+f[i][j+1]+'.gif"');
 }
}


buf='';

function writeBoard () {
 if (parseInt(navigator.appVersion)>3) docID=top.f1.document.open("text/html","replace");
 buf+='<html><head><title>Board</title>';
 if (navigator.appName=="Netscape") buf+='<base href="'+top.document.location+'">';
 buf+='<scr'+'ipt> function silentHandler()  {return true;} window.onerror=silentHandler;'
 buf+='</scr'+'ipt>'

 buf+='</head><body bgcolor="#FFFFFF"><a name="s"></a><center><pre';
 for (i=0;i<boardSize;i++) {
  for (j=0;j<boardSize;j++) {
   buf+='\n><a href="#s" onClick="top.clk('+i+','+j+');" ><img name="s'+i+'_'+j+'" src="s'+f[i][j]+'.gif" width=16 height=16 border=0></a'; 
  }
  buf+='\n><img src="g.gif" width=1 height=16><br';
  if (buf.length>20000) {top.f1.document.writeln(buf); buf='';}
 }
 buf+='\n><img src="g.gif" width='+(boardSize*16+1)+' height=1></pre></center></body></html>';
 top.f1.document.writeln(buf);
 top.f1.document.close();
 buf='';
}

function resetGame() {
 gameOver=0;
 nClicks=0;
 for (var i=0;i<20;i++) {
  for (var j=0;j<20;j++) {
   f[i][j]=0;
  }
 }

 nGroups=boardSize*boardSize*Level/20;
 for (var k=0;k<nGroups;k++) {
  m=Math.floor(boardSize*Math.random());
  n=Math.floor(boardSize*Math.random());
  incrementGroup(m,n);
 }
}

function init() {
 resetGame();
 writeBoard();
 setTimeout("top.fb.document.form1.clickCount.value=0",500);
}
