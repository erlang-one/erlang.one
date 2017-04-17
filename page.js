window.onscroll = function() {
    
    var sticky = document.getElementsByClassName('sticky')[0];
    if(sticky) {
        if (window.pageYOffset > sticky.offsetTop) { sticky.classList.add("sticky-enabled"); }
        else { sticky.classList.remove("sticky-enabled"); }
    };
    
    var se = document.querySelectorAll('#markdown h3'),
        activeClass = 'active',
        hh = 64;

    for(var i = 0; i < se.length; i++) {
        var sh = document.querySelector('#auto-contents a') === se[i] ? se[i].offsetTop : hh;        
        var eBounds = se[i].getBoundingClientRect();
        if (eBounds.top <= sh && eBounds.bottom > sh) {
            if(se[i].id) {
                var s = document.querySelector('#auto-contents a[href="#' + se[i].id + '"]');
                if(s) {
                    if(!s.classList.contains(activeClass)) {
                        var sbe = s.parentNode.childNodes;
                        for(var j = 0; j < sbe.length; j++) {
                            sbe[j].classList.remove(activeClass);
                        }
                        s.classList.add(activeClass);
                    }
                }
            }
            break;
        }
    };
};

window.addEventListener('hashchange',function() { window.onscroll(); });

var pathImages = function(doc) {
    var list = doc.querySelectorAll('img');
    for(var i = 0; i < list.length; i++) {
        list[i].src = window.location.pathname +'-data/' + list[i].src.split( '/' ).splice(-1)[0];
    }
};
var autoContents = function(target,doc) {
    var list = doc.querySelectorAll('h3');
    for(var i = 0; i < list.length; i++) {
        var l = document.createElement('a');
        l.href = '#' + list[i].id;
        if(i === 0) l.className = 'active';
        var t = list[i].childNodes[0].textContent;
        l.innerText = t.length > 32 ? t.substr(0, 32) + '…' : t;
        target.insertAdjacentElement('beforeEnd',l);
    }
};
var getSpecialText = function(field, doc) {
    var t = doc.querySelector('[id="special' + field + '"] + p');
    if(t) {
        var text = t.innerText;
        t.previousElementSibling.remove();
        t.remove();
        return text;
    }
}
var getSpecialLink = function(field, doc) {
    var l = doc.querySelector('[id="special' + field + '"] + p > a');
    if(l) {
        var link = document.createElement('a');
        link.href = l.href;
        link.innerText = l.innerText;
        l.parentNode.previousElementSibling.remove();
        l.parentNode.remove();
        return link;
    }
}
var wideImages = function(doc) {
    var list = doc.querySelectorAll('img');
    for(var i = 0; i < list.length; i++) {
        list[i].parentNode.replaceWith(list[i]);
    }
};
var pinSubtitles = function(doc) {
    var list = doc.querySelectorAll('h3');
    for(var i = 0; i < list.length; i++) {
        list[i].innerHTML = (list[i].innerHTML + '<a class="pin" href="#'+ list[i].id +'">📌</a>');
    }
};
function loadDocument(){
    var url = window.location.pathname +'-data/content.md';
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'text';
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status != 200) { console.error('Embed status: ' + this.status); }
            else {
                var c = new showdown.Converter();
                c.setOption('headerLevelStart', '2');
                var doc = document.createElement('div');
                doc.innerHTML = c.makeHtml(req.responseText);
                wideImages(doc);
                pathImages(doc);
                pinSubtitles(doc);
                autoContents(document.getElementById('auto-contents'),doc);
                
                var title = getSpecialText('title',doc);
                title = title ? title : doc.querySelector('h2').innerText;
                document.title = title + ' – Erlang 1';
                document.querySelector('#localnav h1').innerText = title;
                
                var author = getSpecialText('author',doc);
                author && (document.getElementById('info-author').innerText = author);
                var addition = getSpecialText('addition',doc);
                var date = getSpecialText('date',doc);
                addition && (document.getElementById('info-addition').innerText = addition + ', ' + date);
                var site = getSpecialLink('site',doc);
                site && document.getElementById('info-site').insertAdjacentElement('afterbegin',site);
                document.getElementById('markdown').innerHTML = doc.innerHTML;
            }
        }
    }
    req.send();
};

function addCSS(path) {
    (function(){
        var styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.type = 'text/css';
        styles.media = 'screen';
        styles.href = path;
        document.getElementsByTagName('head')[0].appendChild(styles);
    })();
}

function addMeta() {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1';
    document.getElementsByTagName('head')[0].appendChild(meta);
}

function addJS(path) {
    var js = document.createElement("script");
    js.type = "application/javascript";
    js.src = path;
    document.getElementsByTagName('head')[0].appendChild(js);
}

function loadHtml(){
    var url = '/page.html';
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'text';
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status != 200) { console.error('Embed status: ' + this.status); }
            else { document.body.innerHTML = req.responseText; }
        }
    }
    req.send();
};

window.onload = function() { loadDocument(); };

addJS('/deps/showdown.min.js');
addCSS('/page.css');
loadHtml();
