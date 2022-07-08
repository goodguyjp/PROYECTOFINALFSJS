console.log('Hola esto es frontend');
const jquery = require('jquery');

document.addEventListener('click', e => {
    if (e.target.dataset.short) {
        const url = `http://localhost:5000/${e.target.dataset.short}`

        navigator.clipboard
        .writeText(url)
        .then(() => {
            console.log('Text copied to clipboard...');
        })
        .catch((err) => {
            console.log('Something went wrong', err);
        })
    }
})

$(document).ready(function () {

    $("#facebook").click(function () { 
        openInNewTab("http://www.facebook.com");
     });
     $("#github").click(function () { 
        openInNewTab("http://www.github.com");
     });
     $("#twitter").click(function () { 
         openInNewTab("http://www.twitter.com");
     });
     $("#linkedin").click(function () { 
         openInNewTab("http://www.linkedin.com");
     }); 
    });
    
   
    
    function openInNewTab(href) {
        Object.assign(document.createElement('a'), {
          target: '_blank',
          href: href,
        }).click();
      }
    
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
