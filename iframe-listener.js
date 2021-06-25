document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector('#postco360-iframe');
    let initialHeight;
	window.onmessage = (event) => {
      if (event.origin.match(/[http[s]?:\/\/360\.postco\.co\/|ngrok/))
      {	
        let { height, resetStyle } = event.data;
        if(!initialHeight) initialHeight = height
        if(resetStyle) {
          iframe.scrollIntoView()
          height = initialHeight
        }
        
        console.log(`Height: ${height}, InitialHeight: ${initialHeight}`) 
        iframe.style.height = height + 'px';
      }
  }
}); 
