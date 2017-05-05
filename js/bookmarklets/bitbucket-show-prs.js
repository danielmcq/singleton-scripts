(function(doc){
  var prRegex = /\(pull request #[0-9]{1,6}\)/;
  var commitRows = Array.from(document.querySelectorAll('.commit-list tr'));

  commitRows.forEach(function(row){
    var messageDiv = row.querySelector('.text .flex-content .flex-content--primary')
    var titleObject = messageDiv && messageDiv.attributes.getNamedItem('title');
    var commitMessage = titleObject && titleObject.value;

    var classList = Array.from(row.classList);
    var hasMerge = classList.find(function(clss){
      return clss==='merge';
    });

    if (!hasMerge) {
      row.style['display'] = 'none';
    } else if (!prRegex.test(commitMessage)) {
      row.style['display'] = 'none';
    }/* else {
      // Find a way to remove the faded look on the merge rows
    }*/
  });
})(window.document)

// Bookmarkable version
// javascript:!function(t){var e=/\(pull request #[0-9]{1,6}\)/,r=Array.from(document.querySelectorAll(".commit-list tr"));r.forEach(function(t){var r=t.querySelector(".text .flex-content .flex-content--primary"),n=r&&r.attributes.getNamedItem("title"),l=n&&n.value,o=Array.from(t.classList),i=o.find(function(t){return"merge"===t});i?e.test(l)||(t.style.display="none"):t.style.display="none"})}(window.document);
