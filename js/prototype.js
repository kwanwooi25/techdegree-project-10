// to capitalize first letter
function capitalize(str) {
  return str.toLowerCase()
            .replace(/^\w|\s\w/g,
                    function (letter) {
                      return letter.toUpperCase();
                    })
}

// to get the index of a node
function getIndex(node) {
  let children = node.parentNode.children;
  let index;
  for (let i = 0; i < children.length; i++) {
    if (node === children[i]) index = i;
  }
  return index;
}
