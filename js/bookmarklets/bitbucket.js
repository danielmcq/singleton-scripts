var regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = window.location.href,
    params = {},
    match;
while(match = regex.exec(url)) {
    params[match[1]] = decodeURIComponent(match[2]);
}
params["w"]=1;
params["ts"]=4;
window.location.search = Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&');

var a = /[?&]([^=#]+)=([^&#]*)/g,
    b = window.location.href,
    c = {},
    d;
while(d = a.exec(b)) {
    c[d[1]] = decodeURIComponent(d[2]);
}
c.w=1;
c.ts=4;
window.location.search = Object.keys(c).reduce(function(a,k){a.push(k+'='+encodeURIComponent(c[k]));return a},[]).join('&');

javascript:for(var a=/[?&]([^=#]+)=([^&#]*)/g,b=window.location.href,c={},d;d=a.exec(b);)c[d[1]]=decodeURIComponent(d[2]);c.w=1,c.ts=4,window.location.search=Object.keys(c).reduce(function(e,o){return e.push(o+"="+encodeURIComponent(c[o])),e},[]).join("&");