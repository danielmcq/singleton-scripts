(function(doc){
  var prRegex = /\(pull request #[0-9]+\)/;

  Array.from(doc.querySelectorAll('.commit-list tr')).forEach(function(row){
    var messageDiv = row.querySelector('.text .flex-content .flex-content--primary')
    var titleObject = messageDiv && messageDiv.attributes.getNamedItem('title');
    var commitMessage = titleObject && titleObject.value;

    var hasMerge = Array.from(row.classList).find(function(clss){
      return clss==='merge';
    });

    if (!hasMerge || !prRegex.test(commitMessage)) {
      row.style['display'] = 'none';
    }
  });

  var styleEl = doc.createElement('style');
  doc.head.appendChild(styleEl);
  var styleSheet = styleEl.sheet;
  styleSheet.insertRule(".commit-list tr.merge td>* {opacity:1}", 0);
})(document)


// Bookmarkable version
// javascript:!((e,t,r,l,q)=>{t=/\(pull request #[0-9]+\)/;Array.from(e.querySelectorAll(".commit-list tr")).forEach(e=>{r=e.querySelector(".text .flex-content .flex-content--primary"),l=r&&r.attributes.getNamedItem("title"),n=l&&l.value,a=Array.from(e.classList).find(e=>"merge"===e);a&&t.test(n)||(e.style.display="none")});q=e.createElement("style");e.head.appendChild(q);l=q.sheet;l.insertRule(".commit-list tr.merge td>* {opacity:1}",0)})(document);
