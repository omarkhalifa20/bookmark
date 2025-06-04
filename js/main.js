var bookmarkname = document.querySelector ("#BookmarkName");
var WebSiteURL = document.querySelector ("#WebSiteURL");
var addbtn = document.querySelector ("#addbtn"); 
var tablebody = document.querySelector ("#tablebody") ;
var modal = document.querySelector (".modal-style")
var colsebtn = document.querySelector ("#closebtn")
var websitelist;
  

if (localStorage.getItem("websitelist" )) {
    websitelist = JSON.parse(localStorage.getItem("websitelist" ));
    displaywebsite (websitelist)
}else {
    websitelist = [] 
}

addbtn.addEventListener ("click" , function(){
    addwebsite ()
})


function addwebsite () {

    if ( sitenameValidtion() && siteurlValidtion() ) {
        var website = {
            name : bookmarkname.value,
            url : WebSiteURL.value,
        }
        
        websitelist.push(website)
        displaywebsite (websitelist)
        clearinput()
        clearclass()
        savetolocal()

    } else {
      modal.classList.remove ("d-none")
      clearclass()
      
   
    }
    
    
    
    
}

function displaywebsite (wlist) {
    var cartoona = ""
for ( i = 0 ; i < wlist.length ; i++) {
     cartoona += `<tr>
          <th scope="row">${i+1}</th>
          <td class="fw-semibold">${wlist[i].name}</td>
          <td><a target="_blank" class="btn btn-vist  fw-semibold" href="${wlist[i].url}"><i class="fa-solid fa-eye  me-1"></i> Visit</a></td>
        <td><button onclick="deleletr(${i})"  class="btn btn-delele   fw-semibold" ><i class="fa-solid fa-trash-can  me-1"></i> Delete</button></td>
        </tr>`

        
}

tablebody.innerHTML = cartoona

}

function deleletr(index) {
    websitelist.splice (index , 1)
    displaywebsite (websitelist)
    savetolocal()
}

function savetolocal() {
    localStorage.setItem ("websitelist" , JSON.stringify(websitelist))
}

function clearinput() {
    bookmarkname.value = null
    WebSiteURL.value = null
}


bookmarkname.addEventListener("input" , sitenameValidtion )
WebSiteURL.addEventListener("input" , siteurlValidtion )

function sitenameValidtion() {
    var regex = /^([A-Z]|[a-z]){3,}$/;
   
  
    if (regex.test(bookmarkname.value)) {
      bookmarkname.classList.add("is-valid")
      bookmarkname.classList.remove("is-invalid")
      
     
      return true
    } else {
      bookmarkname.classList.add("is-invalid")
      
      return false
    }
  
    
  }

function siteurlValidtion() {
  var regex = /(^www.([A-Z]|[a-z]){2,})|(^https:\/\/www.([A-Z]|[a-z]){2,})|(^http:\/\/www.([A-Z]|[a-z]){2,})|(^https:\/\/([A-Z]|[a-z]){2,})|(^http:\/\/([A-Z]|[a-z]){2,})/;
  

  if (regex.test(WebSiteURL.value)) {
    WebSiteURL.classList.add("is-valid")
    WebSiteURL.classList.remove("is-invalid")
   
    return true
  } else {
    
    WebSiteURL.classList.add("is-invalid")
    return false
  }

 
}

function clearclass() {
  bookmarkname.classList.remove("is-valid")
  WebSiteURL.classList.remove("is-valid")
  bookmarkname.classList.remove("is-invalid")
  WebSiteURL.classList.remove("is-invalid")
  
}

closebtn.addEventListener ("click" , closetab)

function closetab() {
  modal.classList.add ("d-none")
  
}


document.addEventListener ("click", function(e) {
  if (e.target.id === "modal"){
    closetab()
  }
})

document.addEventListener ("keyup", function(e) {
  if (e.key === "Escape"){
    closetab()
  }
})