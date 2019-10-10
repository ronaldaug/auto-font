document.addEventListener("DOMContentLoaded", function() {
    let isOne = false;
    const allA = document.querySelectorAll('a');
    const allP = document.querySelectorAll('p');
    const allH = document.querySelectorAll('h1,h2,h3,h4,h5');
    const allG = document.querySelectorAll('span,li,td');
    const fontFolder = autoFont.plugin_url + '/auto-font/fonts/';

    // loop and change all content
    function loopContentArr(content){
      if(!content){return;}
      const currentFont = localStorage.getItem('current-font') || 'unicode';
      content.forEach(e=>{
        const post_txt = e.innerText;
          const postHTML = e.innerHTML;
          if(post_txt){
              let checkFont = knayi.fontDetect(post_txt.substring(0,80));
              if(checkFont === 'en'){return;}
              if(checkFont !== currentFont){
                 e.innerHTML = knayi.fontConvert(postHTML, currentFont);
              }
          }
      })
    }

    function changeFonts(){
        loopContentArr(allA);
        loopContentArr(allP);
        loopContentArr(allH);
        loopContentArr(allG);
    }

    function removeEmbedFont(font){
        const Allembed = document.querySelectorAll(`#${font}-embed`);
        if(Allembed){
            Allembed.forEach(embed=>{
                embed.parentNode.removeChild(embed);
            })
        }
    }

    function embedFont(font){
        const ef = document.createElement("style");
        const fontName = font == 'zawgyi'?"Zawgyi-One":"Pyidaungsu";
        const fontFaceFallBack = font == 'zawgyi'?"'Zawgyi-One'":"'Pyidaungsu', 'Myanmar3'";
        ef.id = `${font}-embed`;
        ef.innerHTML = `
            @font-face {
                font-family:'${fontName}';
                src:local('${fontName}'), url('${fontFolder}${font}.woff') format('woff'), url('${fontFolder}${font}.ttf') format('ttf');
            }
            body, p, a, h1, h2, h3, h4, h5, td{
                letter-spacing:normal !important;
                font-family: ${fontFaceFallBack} !important;
            }
        `;
        document.head.append(ef);
    }

    // Listen user selected font on Change
    const selectBox = document.querySelector("#auto-font");
    if(!selectBox){return}
    selectBox.addEventListener('change',function(e){
        if(e.target.value !== 'uni'){
                localStorage.setItem('current-font','zawgyi');
                embedFont('zawgyi');
                removeEmbedFont('pyidaungsu');
                changeFonts();
        }else{
                localStorage.setItem('current-font','unicode');
                embedFont('pyidaungsu');
                removeEmbedFont('zawgyi');
                changeFonts();
        }
        isOne = true;
    });
    if(!isOne){
        changeFonts();
    }
    const currentFont = localStorage.getItem('current-font') || 'unicode';
    if(currentFont !== 'unicode'){
        embedFont('zawgyi');
        selectBox.value = 'zaw';
    }else{
        embedFont('pyidaungsu');
        selectBox.value = 'uni';
    }
  });
