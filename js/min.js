"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var isOne = false;
  var allA = document.querySelectorAll('a');
  var allP = document.querySelectorAll('p');
  var allH = document.querySelectorAll('h1,h2,h3,h4,h5');
  var allG = document.querySelectorAll('span,li,td');
  var fontFolder = autoFont.plugin_url + '/auto-font/fonts/'; // loop and change all content

  function loopContentArr(content) {
    if (!content) {
      return;
    }

    var currentFont = localStorage.getItem('current-font') || 'unicode';
    content.forEach(function (e) {
      var post_txt = e.innerText;
      var postHTML = e.innerHTML;

      if (post_txt) {
        var checkFont = knayi.fontDetect(post_txt.substring(0, 80));

        if (checkFont === 'en') {
          return;
        }

        if (checkFont !== currentFont) {
          e.innerHTML = knayi.fontConvert(postHTML, currentFont);
        }
      }
    });
  }

  function changeFonts() {
    loopContentArr(allA);
    loopContentArr(allP);
    loopContentArr(allH);
    loopContentArr(allG);
  }

  function removeEmbedFont(font) {
    var Allembed = document.querySelectorAll("#".concat(font, "-embed"));

    if (Allembed) {
      Allembed.forEach(function (embed) {
        embed.parentNode.removeChild(embed);
      });
    }
  }

  function embedFont(font) {
    var ef = document.createElement("style");
    var fontName = font == 'zawgyi' ? "Zawgyi-One" : "Pyidaungsu";
    var fontFaceFallBack = font == 'zawgyi' ? "'Zawgyi-One'" : "'Pyidaungsu', 'Myanmar3'";
    ef.id = "".concat(font, "-embed");
    ef.innerHTML = "\n            @font-face {\n                font-family:'".concat(fontName, "';\n                src:local('").concat(fontName, "'), url('").concat(fontFolder).concat(font, ".woff') format('woff'), url('").concat(fontFolder).concat(font, ".ttf') format('ttf');\n            }\n            body, p, a, h1, h2, h3, h4, h5, td{\n                letter-spacing:normal !important;\n                font-family: ").concat(fontFaceFallBack, " !important;\n            }\n        ");
    document.head.append(ef);
  } // Listen user selected font on Change


  var selectBox = document.querySelector("#auto-font");

  if (!selectBox) {
    return;
  }

  selectBox.addEventListener('change', function (e) {
    if (e.target.value !== 'uni') {
      localStorage.setItem('current-font', 'zawgyi');
      embedFont('zawgyi');
      removeEmbedFont('pyidaungsu');
      changeFonts();
    } else {
      localStorage.setItem('current-font', 'unicode');
      embedFont('pyidaungsu');
      removeEmbedFont('zawgyi');
      changeFonts();
    }

    isOne = true;
  });

  if (!isOne) {
    changeFonts();
  }

  var currentFont = localStorage.getItem('current-font') || 'unicode';

  if (currentFont !== 'unicode') {
    embedFont('zawgyi');
    selectBox.value = 'zaw';
  } else {
    embedFont('pyidaungsu');
    selectBox.value = 'uni';
  }
});