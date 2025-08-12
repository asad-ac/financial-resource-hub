/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
const themeButton = document.getElementById("theme-button")
// Step 2: Write the callback function
const toggleDarkMode = () => {

    document.body.classList.toggle("dark-mode");
    // Write your code here
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function

themeButton.addEventListener('click',toggleDarkMode);

const mobileBtn = document.getElementById('mobile-button')

mobileBtn.addEventListener('click', toggleDarkMode)
/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
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

// Step 3: Add a click event listener to the submit RSVP button here

//submitBtn.addEventListener('click', addParticipant);

/*** Form Validation [PLACEHOLDER] [ADDED IN UNIT 7] ***/

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
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

// Step 3: Replace the form button's event listener with a new one that calls validateForm()

submitBtn.addEventListener('click', validateForm)

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

let modal = document.getElementById('success-modal'); // thanks model replacement?
let modalContent = document.querySelector('.modal-paragraph');

const toggleModal = (person) => {

    modal.style.display = 'flex';

    modalContent.innerHTML = `<p class="modal-message"> Well done <span class="js-name"> ${person.name}, </span> don't forget to look at the 'Links' section for more resources. </p>`
    
    // TODO: Update modal display to flex
    

    // TODO: Update modal text to personalized message


    // Set modal timeout to 5 seconds


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

// TODO: animation variables and animateImage() function

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