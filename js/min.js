document.addEventListener("DOMContentLoaded", function() {
    var isOne = false;
    var allContent = document.querySelectorAll('.entry-content');
    var allTitle = document.querySelectorAll(".entry-title");
   function changeFonts(){
    loopContentArr(allContent);
    loopContentArr(allTitle);
   }
  
   // loop and change all content
   function loopContentArr(content){
      if(!content){return;}
      var currentFont = localStorage.getItem('current-font') || 'unicode';
      for(var x=0;x<content.length;x++){
          let post_txt = content[x].innerText;
          let postHTML = content[x].innerHTML;
          if(post_txt){
              let checkFont = knayi.fontDetect(post_txt.substring(0,80));
              if(checkFont === 'en'){return;}
              if(checkFont !== currentFont){
                  content[x].innerHTML = knayi.fontConvert(postHTML, currentFont);
              }
          }
      }
  }
  
   // Listen user selected font on Change
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