var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 10; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 300;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('imcrzy');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".imcrzy > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    fetch('https://api.grdkv.com/lastfm/user/minakonyaa/now').then((a) => {
            return a.json()    
        }).then((track) => {
            document.getElementById('lnapishitt').innerHTML = `<a href="${track.Link}">${track.TrackName}</a>`
    });

    setInterval(function() {
        var date = new Date();
        document.getElementsByClassName('timebitch')[0].innerHTML = `${('0'+date.getHours()).substr(-2)}:${('0'+date.getMinutes()).substr(-2)}:${('0'+date.getSeconds()).substr(-2)}`
    }, 500);

    setInterval(function() {
        fetch('https://api.grdkv.com/lastfm/user/minakonyaa/now').then((a) => {
            return a.json()    
        }).then((track) => {
            document.getElementById('lnapishitt').innerHTML = `<a href="${track.Link}">${track.TrackName}</a>`
        })
    }, 30000);
};
