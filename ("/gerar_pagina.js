document.getElementById("linkForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var linkInput = document.getElementById("link");
  var link = linkInput.value;

  if (link) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/gerar_pagina", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          var generatedLinkElement = document.getElementById("generatedLink");
          var generatedPageLinkElement = document.getElementById("generatedPageLink");
          generatedPageLinkElement.href = response.pageLink;
          generatedPageLinkElement.innerHTML = response.pageLink;
          generatedLinkElement.style.display = "block";
        } else {
          alert("Erro ao gerar página. Tente novamente.");
        }
      }
    };

    var data = JSON.stringify({ link: link });
    xhr.send(data);
  }
});
