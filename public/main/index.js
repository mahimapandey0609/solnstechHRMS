function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


  shownotes();
let addbtn = document.getElementById('addbtn');

addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let txt = document.getElementById('username');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
  let myobj = {
       fetchtitle : txt.value,
       fetchtxt : addtxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addtxt.value = "";
    txt.value="";
    //console.log(notesobj);
    shownotes();
});

//function to show notes from the local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    
    
    notesobj.forEach(function (element, index) {
        html += "<div class='notecard my-2 mx-2 card' style='width: 18rem;'>" +
            "<div class='card-body '>" +
            "<h5 class='card-title d-flex text-end'>" + (element.fetchtitle) +"✨"+ "</h5>" +
            "<p class='card-text d-flex text-end'>" + (element.fetchtxt) + "</p>" +
            "<button id =" + index + " onclick = deletenote(this.id) href='#' class='btn btn-dark'>Delete Note</button>" +
            "</div>" +
            "</div>"

    });
    let notesElem = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = 'Nothing  to show! Use above Add a Note section to add notes👆';
    }
}

//function to delete note
function deletenote(index) {
    //console.log('i`m deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    shownotes();


}

let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    //console.log('input event fired',inputval);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardtxt);
    })
});



// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://news.ycombinator.com/", {
//     waitUntil: "networkidle2"
//   });
//   await page.setViewport({ width: 1680, height: 1050 });
//   await page.pdf({
//     path: "",
//     format: "A4",
//     printBackground: true,
//     displayHeaderFooter: true,
//     margin: {
//       top: '38px',
//       right: '38px',
//       bottom: '38px',
//       left: '38px'
//     }
//   });

//   await browser.close();
// })();
