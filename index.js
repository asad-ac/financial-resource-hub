// dark mode button
const themeButton = document.getElementById("theme-button")
const toggleDarkMode = () => {

  document.body.classList.toggle("dark-mode");
    
}

themeButton.addEventListener('click',toggleDarkMode);

const mobileBtn = document.getElementById('mobile-button')

mobileBtn.addEventListener('click', toggleDarkMode)

// get header bg

const header = document.getElementById('background-header');

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=work")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        header.style.backgroundImage = `url(${data.urls.full})`;
        header.style.backgroundSize = 'cover';
        header.style.backgroundAttachment = 'fixed';
        header.style.backgroundPosition = 'center';
        header.style.overflowX = 'hidden';
    });

// get user info
const submitBtn = document.getElementById("rsvp-button");

const addParticipant = (person) => {
    // Step 2: Write your code to manipulate the DOM here
    const nameInput = document.getElementById("name-input").value;
    const emailInput = document.getElementById("email-input").value;
    const stateInput = document.getElementById("state-input").value;

    let create = document.createElement("p");

    create.textContent = ` ✉️ ${person.name} from ${person.state} has joined.`

    document.querySelector(".rsvp-participants").appendChild(create);

}

//submitBtn.addEventListener('click', addParticipant);

// adding error if less than 2 characters in input
const validateForm = () => {

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;
  // TODO: Loop through all inputs

  let person = {
    name: rsvpInputs[0].value,
    state: rsvpInputs[1].value,
    email: rsvpInputs[2].value
    } // accesses and saves value of first input
    // add more properties here

  for (let i = 0; i < rsvpInputs.length; i++){

    // TODO: Inside loop, validate the value of each input
    if(rsvpInputs[i].value.length < 2){
      containsErrors = true;
      rsvpInputs[i].classList.add('error');
    }
    else {
      rsvpInputs[i].classList.remove('error');
    }
  }

  // TODO: If no errors, call addParticipant() and clear fields

  if(containsErrors == false) {
    addParticipant(person);
    toggleModal(person);

    for (let i = 0; i < rsvpInputs.length; i++){
      rsvpInputs[i].value = "";
    }
  }
}


submitBtn.addEventListener('click', validateForm)

// modal for 15 seconds displayed with entered name

let modal = document.getElementById('success-modal'); // thanks model replacement?
let modalContent = document.querySelector('.modal-paragraph');

const toggleModal = (person) => {

    modal.style.display = 'flex';

    modalContent.innerHTML = `<p class="modal-message"> Well done <span class="js-name"> ${person.name}, </span> don't forget to look at the 'Links' section for more resources. </p>`
    
  let intervalId = setInterval(animateImage, 500);

    setTimeout(() => {
      modal.style.display = 'none'
      clearInterval(intervalId)
    }, 15000);
}

const closeModal = document.getElementById('close-modal');

closeModal.addEventListener('click', function(){
  modal.style.display = 'none';
})

// animation variables and animateImage() function

let rotateFactor = 0;
let modalImage = document.querySelector(".modal-image");

function animateImage() {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  }
   else if (rotateFactor === -10) {
    rotateFactor = 10;
   }
  else {
    rotateFactor = 0
  }

  modalImage.style.transform = `rotate(${rotateFactor}deg)`
}

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    mobileNav.style.display = 'block';
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close mobile menu
function closeMobileMenu() {
    mobileNav.style.display = 'none';
    hamburger.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

closeBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
        closeMobileMenu();
    }
});
