document.addEventListener("DOMContentLoaded", function() {
  const iframe = document.querySelector('#postco360-iframe');
  let initialHeight;
  let padding = 50
  window.onmessage = (event) => {
      if (event.origin.match(/[http[s]?:\/\/360\.postco\.co\/|ngrok/))
      {	
        // console.log('Parent received---', event.data)
        let { height, resetStyle } = event.data;
        height += padding  
        if(!initialHeight) initialHeight = height
        
        if(resetStyle) {
          height = initialHeight
        } 
        iframe.style.height = height + 'px';
        iframe.scrollIntoView(true)
      }
    }
});