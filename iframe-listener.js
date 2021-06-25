  document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector('#postco360-iframe');
    let initialHeight;
	window.onmessage = (event) => {
      if (event.origin.match(/[http[s]?:\/\/360\.postco\.co\/|ngrok/))
      {	
        console.log(event.data)
        let { height, resetStyle } = event.data;
        
        if(!initialHeight) initialHeight = height
        
        if(resetStyle) {
          height = initialHeight
        }
        
        iframe.style.height = height + 'px';
        iframe.scrollIntoView()
      }
    }
  });
