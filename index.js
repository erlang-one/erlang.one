function qi(name) { return document.getElementById(name); }
window.setInterval(function() {
    var c = qi('cursor');
    if (c) { c.classList.contains('tick') ? c.classList.remove('tick') : c.classList.add('tick'); }
},500);
var restore = (function(){ qi('radiation').innerText=this; }).bind(qi('radiation').innerText);
x=[['a','p','7','q'],['g','i','d','j'],['s','e','x','o']];
function radiation(num,mode) {
    var r = qi('radiation');
    var y = num % 2 ? x[(num-1)/2] : x[num/2].reverse();
    r.innerText = r.innerText.replace(new RegExp(y[0],mode),y[2]).replace(new RegExp(y[1],mode),y[3]);
};
function light(num,mode) {
    var e = qs(num % 2 ? '.synrc' : '.erlach' );
    if (e) { mode % 2 ? e.classList.add('light') : e.classList.remove('light'); }
};
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function init() {
    var l = localStorage.getItem('lang') || window.navigator.userLanguage || window.navigator.language;
    if(l === 'ru-RU') document.body.classList.add('ru');
    
    qi('landing').style.backgroundImage = "url(/background.jpg)";
    
    window.setTimeout(function rad(m){
        m = m === undefined ? 100 : m;
        var n, d = rand(0,256);
        var t = Math.round(d/(Math.log(m)+1));
        switch(d % 3) {
            case 1: n = (m % 2) + 2; break;
            case 2: n = (m % 2) + 4; break;
            default: n = m % 2;
        }
        radiation(n,d % 2 ? '' : 'g');
        m ? setTimeout(rad, t, --m) : restore();
    },4)
};
