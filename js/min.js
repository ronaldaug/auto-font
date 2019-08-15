document.addEventListener("DOMContentLoaded", function() {
    let isOne = false;
    const allA = document.querySelectorAll('a');
    const allP = document.querySelectorAll('p');
    const allH = document.querySelectorAll('h1,h2,h3,h4,h5');
    const allG = document.querySelectorAll('span,li,td');
   function changeFonts(){
        loopContentArr(allA);
        loopContentArr(allP);
        loopContentArr(allH);
        loopContentArr(allG);
    }
  
   // loop and change all content
   function loopContentArr(content){
      if(!content){return;}
      const currentFont = localStorage.getItem('current-font') || 'unicode';
      content.forEach(e=>{
        const post_txt = e.innerText;
        console.log(post_txt);
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
  
   // Listen user selected font on Change
   const selectBox = document.querySelector("#auto-font");
   if(!selectBox){return}
   selectBox.addEventListener('change',function(e){
       if(e.target.value !== 'uni'){
            localStorage.setItem('current-font','zawgyi');
            changeFonts();
       }else{
            localStorage.setItem('current-font','unicode');
            changeFonts();
       }
       isOne = true;
   });
   if(!isOne){
     changeFonts();
   }
   const currentFont = localStorage.getItem('current-font') || 'unicode';
        if(currentFont !== 'unicode'){
            selectBox.value = 'zaw';
        }else{
            selectBox.value = 'uni';
        }
  });