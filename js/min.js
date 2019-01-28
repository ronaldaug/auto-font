document.addEventListener("DOMContentLoaded", function() {
  var isOne = false;
  var detectFont = document.querySelectorAll('.entry-content p');
 function changeFonts(){
  var currentFont = localStorage.getItem('current-font') || 'unicode';
  if(!detectFont){return;}
  for(var x=0;x<detectFont.length;x++){
      let post_txt = detectFont[x].innerText;
      let postHTML = detectFont[x].innerHTML;
      if(post_txt){
          let checkFont = knayi.fontDetect(post_txt.substring(0,30));
          if(checkFont !== currentFont){
              detectFont[x].innerHTML = knayi.fontConvert(postHTML, currentFont);
          }
      }
  }
 }
 // on Change Value
 var selectBox = document.querySelector("#auto-font");
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
 var currentFont = localStorage.getItem('current-font') || 'unicode';
 if(currentFont !== 'unicode'){
     selectBox.value = 'zaw';
 }else{
     selectBox.value = 'uni';
 }

});