function requireHeaderId(header, i) {
  var value = header.id || `header_${i}`;

  header.id = value;
  return value;
}

function makeHeaderLi(header, i) {
 var headerId = requireHeaderId(header, i);
 var li = document.createElement("li");
 var link = document.createElement("a");

 link.href = `#${headerId}`;
 link.innerText = header.innerText;
 li.appendChild(link);
 return li;
}

function generateGuideIndex() {
  var headers = document.querySelectorAll("h2,h3");
  var menuEl = document.createElement("ul");
  var i = 0;

  while (i < headers.length) {
    var li = makeHeaderLi(headers[i], i);
    var submenu = document.createElement("ul");

    i++;
    while (i < headers.length && headers[i].tagName == 'H3')
    {
      var subLi = makeHeaderLi(headers[i], i);
      submenu.appendChild(subLi);
      i++;
    }
    if (submenu.children.length > 0)
      li.appendChild(submenu);
    menuEl.appendChild(li);
  }
  return menuEl;
}

function createSidebar() {
  var sidebar = document.createElement("div");
  var sidebarTitle = document.createElement("h3");
  sidebarTitle.innerText = "Chapters";
  sidebar.id = "sidebar";
  sidebar.appendChild(sidebarTitle);
  sidebar.appendChild(generateGuideIndex());
  document.querySelector("#main").insertAdjacentElement('afterend', sidebar);
}

document.onreadystatechange = function() {
  if (document.querySelector("#with-index") !== null &&
      document.querySelector("#sidebar") === null)
    createSidebar();

};
