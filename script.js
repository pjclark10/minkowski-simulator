const sV=document.getElementById('vS'),sB=document.getElementById('bS'),sA=document.getElementById('aS'),sS=document.getElementById('sS'),rB=document.getElementById('rB'),mW=document.getElementById('mW'),mE=document.getElementById('mE'),cM=document.getElementById('map').getContext('2d'),cG=document.getElementById('gauge').getContext('2d'),W=410,H=410,OX=205,OY=360,targetT=1.5; let modeWest=true;
function bst(t,x,b){let g=1/Math.sqrt(1-b*b);return{tP:g*(t-b*x),xP:g*(x-b*t)};}
function ln(ctx,x1,y1,x2,y2,cl,w){ctx.strokeStyle=cl;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function mapCoord(t,x){
    let cX = modeWest ? OX + x : OX + t;
    let cY = modeWest ? OY - t : (OY - OX/2) - x;
    return {x: cX, y: cY};
}
function arr(ctx,t1,x1,t2,x2,cl,w,lb=""){
    let p1 = mapCoord(t1,x1), p2 = mapCoord(t2,x2);
    ln(ctx,p1.x,p1.y,p2.x,p2.y,cl,w);let an=Math.atan2(p2.y-p1.y,p2.x-p1.x),len=10;ctx.fillStyle=cl;ctx.beginPath();ctx.moveTo(p2.x,p2.y);ctx.lineTo(p2.x-len*Math.cos(an-0.5),p2.y-len*Math.sin(an-0.5));ctx.lineTo(p2.x-len*Math.cos(an+0.5),p2.y-len*Math.sin(an+0.5));ctx.fill();
    if(lb){ctx.font="bold 13px sans-serif";ctx.fillText(lb,p2.x+10*Math.cos(an),p2.y+10*Math.sin(an)+4);}
}
function grid(ctx,S,bf,isMap){
    ctx.clearRect(0,0,W,H);
    for(let i=-12; i<=12; i++){
        let l1=bst(-12,i,bf),l2=bst(12,i,bf),l3=bst(i,-12,bf),l4=bst(i,12,bf);
        let p1=mapCoord(l1.tP*S,l1.xP*S),p2=mapCoord(l2.tP*S,l2.xP*S);
        let p3=mapCoord(l3.tP*S,l3.xP*S),p4=mapCoord(l4.tP*S,l4.xP*S);
        ln(ctx,p1.x,p1.y,p2.x,p2.y,"#444452",1.5);ln(ctx,p3.x,p3.y,p4.x,p4.y,"#444452",1.5);
    }
    let pOrigin=mapCoord(0,0);
    if(modeWest){
        ln(ctx,0,OY,W,OY,"#fff",2);ln(ctx,OX,0,OX,H,"#fff",2);
        ctx.fillStyle="#2a2a35";ctx.fillRect(W-30,OY-22,24,18);ctx.fillRect(OX-25,4,22,18);
        ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.strokeRect(W-30,OY-22,24,18);ctx.strokeRect(OX-25,4,22,18);
        ctx.fillStyle="#fff";ctx.font="bold 12px sans-serif";ctx.fillText("x",W-23,OY-9);ctx.fillText("ct",OX-20,17);
    }else{
        ln(ctx,0,pOrigin.y,W,pOrigin.y,"#fff",2);ln(ctx,OX,0,OX,H,"#fff",2);
        ctx.fillStyle="#2a2a35";ctx.fillRect(W-30,pOrigin.y+4,24,18);ctx.fillRect(OX-25,4,22,18);
        ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.strokeRect(W-30,pOrigin.y+4,24,18);ctx.strokeRect(OX-25,4,22,18);
        ctx.fillStyle="#fff";ctx.font="bold 12px sans-serif";ctx.fillText("ct",W-25,pOrigin.y+17);ctx.fillText("x",OX-18,17);
    }
    let cone1_p1=mapCoord(0,0), cone1_p2=mapCoord(450,450);
    let cone2_p1=mapCoord(0,0), cone2_p2=mapCoord(450,-450);
    ln(ctx,cone1_p1.x,cone1_p1.y,cone1_p2.x,cone1_p2.y,"#fbc02d",1.5);
    ln(ctx,cone2_p1.x,cone2_p1.y,cone2_p2.x,cone2_p2.y,"#fbc02d",1.5);
    if(!isMap){
        let x1=bst(0,-8,bf),x2=bst(0,8,bf),t1=bst(-4,0,bf),t2=bst(8,0,bf);
        let p_x1=mapCoord(x1.tP*S,x1.xP*S), p_x2=mapCoord(x2.tP*S,x2.xP*S);
        let p_t1=mapCoord(t1.tP*S,t1.xP*S), p_t2=mapCoord(t2.tP*S,t2.xP*S);
        p_x1.x=Math.max(10,Math.min(W-10,p_x1.x));p_x1.y=Math.max(10,Math.min(H-10,p_x1.y));
        p_x2.x=Math.max(10,Math.min(W-10,p_x2.x));p_x2.y=Math.max(10,Math.min(H-10,p_x2.y));
        p_t1.x=Math.max(10,Math.min(W-10,p_t1.x));p_t1.y=Math.max(10,Math.min(H-10,p_t1.y));
        p_t2.x=Math.max(10,Math.min(W-10,p_t2.x));p_t2.y=Math.max(10,Math.min(H-10,p_t2.y));
        ln(ctx,p_x1.x,p_x1.y,p_x2.x,p_x2.y,"#9999a8",2.5);ln(ctx,p_t1.x,p_t1.y,p_t2.x,p_t2.y,"#9999a8",2.5);
        ctx.fillStyle="#fbc02d";ctx.font="bold 13px sans-serif";
        ctx.fillText(modeWest?"x'":"ct'",p_x2.x+(modeWest? -20 : 8),p_x2.y+(modeWest? -8 : 15));
        ctx.fillText(modeWest?"ct'":"x'",p_t2.x+(modeWest? 8 : -18),p_t2.y+(modeWest? 0 : -8));
    }
}
function run(){
    const v=parseFloat(sV.value),a=parseFloat(sA.value),S=parseInt(sS.value),bf=parseFloat(sB.value);grid(cM,S,0,true);grid(cG,S,bf,false);
    document.getElementById('vL').innerText=v.toFixed(2);document.getElementById('bL').innerText=bf.toFixed(2);document.getElementById('aL').innerText=a.toFixed(2);document.getElementById('sL').innerText=S;document.getElementById('gfV').innerText=a.toFixed(2)+"g";
    const isZeroA=Math.abs(a)<0.01;document.getElementById('rV').innerText=isZeroA?"Infinity":(1/Math.abs(a)).toFixed(2);
    let u0=1,u1=0,a0=0,a1=0;const g0=1/Math.sqrt(1-v*v);
    if(!isZeroA){let p_t=g0*v+a*targetT;let g_t=Math.sqrt(1+p_t*p_t);u0=g_t;u1=p_t;a0=a*u1;a1=a*u0;}else{u0=g0;u1=g0*v;}
    const bU=bst(u0,u1,bf),bA=bst(a0,a1,bf);document.getElementById('gV').innerText=u0.toFixed(2);
    document.getElementById('uV').innerText="("+bU.tP.toFixed(2)+"c, "+bU.xP.toFixed(2)+"c)";document.getElementById('aV').innerText="("+bA.tP.toFixed(2)+"a, "+bA.xP.toFixed(2)+"a)";
    const dP=bU.tP*bA.tP-bU.xP*bA.xP;document.getElementById('dP').innerText=Math.abs(dP)<1e-10?"0.000":dP.toFixed(3);
    
    let pBaseStart = mapCoord(0,0), pBaseEnd = mapCoord(H,0);
    ln(cM,pBaseStart.x,pBaseStart.y,pBaseEnd.x,pBaseEnd.y,"#03dac6",2.5);arr(cM,0,0,2.0*S,0,"#03dac6",2.5);
    
    let px=0,py=0;
    if(isZeroA){
        cM.strokeStyle="#cf6679";cM.lineWidth=3;cM.beginPath();
        let pathStart=mapCoord(-0.5*S,(-v*0.5)*S), pathEnd=mapCoord(4.5*S,(v*4.5)*S);
        cM.moveTo(pathStart.x,pathStart.y);cM.lineTo(pathEnd.x,pathEnd.y);cM.stroke();
        px=(v*targetT)*S;py=targetT*S;
    }else{
        cM.strokeStyle="#cf6679";cM.lineWidth=3;cM.beginPath();
        for(let tg=-0.5;tg<=4.5;tg+=0.02){
            let dx=(Math.sqrt(1+Math.pow(g0*v+a*tg,2))-g0)/a;
            let pTrace=mapCoord(tg*S,dx*S);
            if(tg===-0.5)cM.moveTo(pTrace.x,pTrace.y);else cM.lineTo(pTrace.x,pTrace.y);
        }
        cM.stroke();
        let tx=(Math.sqrt(1+Math.pow(g0*v+a*targetT,2))-g0)/a;px=tx*S;py=targetT*S;
    }
    let pMarker=mapCoord(py,px);cM.fillStyle="#fff";cM.beginPath();cM.arc(pMarker.x,pMarker.y,5,0,2*Math.PI);cM.fill();
    let normFactor=0.4/Math.sqrt(u0*u0+u1*u1);
    arr(cM,py,px,py+u0*S*normFactor,px+u1*S*normFactor,"#bb86fc",3.5,"U");
    if(!isZeroA){
        let sm=25/Math.sqrt(a0*a0+a1*a1);
        arr(cM,py,px,py+a0*S*sm*0.015,px+a1*S*sm*0.015,"#4caf50",3.5,"A");
    }
    
    cG.strokeStyle="#00f0ff";cG.lineWidth=2.5;cG.beginPath();
    for(let xi=-3.0;xi<=3.0;xi+=0.04){
        let bShell=bst(Math.cosh(xi),Math.sinh(xi),bf);
        let pShell=mapCoord(bShell.tP*S,bShell.xP*S);
        if(xi===-3.0)cG.moveTo(pShell.x,pShell.y);else cG.lineTo(pShell.x,pShell.y);
    }
    cG.stroke();
    let bShellLbl=bst(Math.cosh(0.8),Math.sinh(0.8),bf);let pLbl=mapCoord(bShellLbl.tP*S,bShellLbl.xP*S);
    cG.fillStyle="#00f0ff";cG.font="bold 13px sans-serif";cG.fillText("U²=c²",pLbl.x+8,pLbl.y);
    arr(cG,0,0,bst(1,0,bf).tP*S,bst(1,0,bf).xP*S,"#03dac6",2.5);
    arr(cG,0,0,bU.tP*S,bU.xP*S,"#bb86fc",3.5,"U'");
    if(!isZeroA)arr(cG,0,0,bA.tP*S*0.4,bA.xP*S*0.4,"#4caf50",3.5,"A'");
}
// FIXED: Forcing automated layout re-runs right inside click event bindings to bypass manual reset needs
mW.addEventListener('click',()=>{modeWest=true;mW.classList.add('btn-active');mE.classList.remove('btn-active');run();});
mE.addEventListener('click',()=>{modeWest=false;mE.classList.add('btn-active');mW.classList.remove('btn-active');run();});
rB.addEventListener('click',()=>{sV.value=0.34;sB.value=0.00;sA.value=0.50;sS.value=110;run();});[sV,sB,sA,sS].forEach(s=>s.addEventListener('input',run));run();
