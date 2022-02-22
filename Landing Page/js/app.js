/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const selSections =document.querySelectorAll('section');
const liNav = document.querySelector('#navbar__list');
let len = selSections.length;
const up = document.querySelector('.top')
const head = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// TODO : creat navbar && add ID anchor
// build the nav && anchor ID using scrollTO event
function creatNavBar(){
    for (section of selSections){
        sectionName = section.getAttribute('data-nav');
        sectionLink = section.getAttribute('id');
    
        //creat element <li>,<a> && anchor ID using scrollTO event
        liNav.innerHTML += ` <li><a class="menu__link" href="#${sectionLink}">${sectionName}</a></li> `
    }    
};

// Add class 'active' to section when near top of viewport
// TODO : section when near top of viewport add class 'your-active-class'
function activeSectClass(){
    // scroll smooth
    document.documentElement.style.scrollBehavior = "smooth";
    for (section of selSections){
        sectionName = section.getAttribute('data-nav');
        sectionLink = section.getAttribute('id');

        // Add class 'active' to section when near top of viewport
        if (section.getBoundingClientRect().top >= -340 && section.getBoundingClientRect().top <= 300) {
            
            //console.log(sectionLink); >> test show id section in viewport
            //add class 'active section'
            section.classList.add("your-active-class");
        }
        else{         //remove class 'active section'
            section.classList.remove("your-active-class");
        }

        //return ((section.getBoundingClientRect().top >= -340 && section.getBoundingClientRect().top <= 300) ? section.classList.add("your-active-class") :  section.classList.remove("your-active-class"));
    }
};

//add class 'active' on navbar of viewport
function activeNavBar(){
    let len = selSections.length;
    let nav = document.querySelectorAll('.menu__link');                     //select (li a) in navbar
    while(--len && window.scrollY < selSections[len].offsetTop - 350){};    //while for check section in viewport 
    nav.forEach((bar) => { bar.classList.remove('active'); });              //loopE > for remove class 'active' from any bar <a>
    nav[len].classList.add('active');                                       //add class 'active' on section viewport
    head.style.display="block";                              //show navbar
    clearTimeout;
    //use setTimeout for hide navbar in 3s
    setTimeout(()=>{
        head.style.display="none";
    }, 4000)

};
  
// TODO : Hide and show the top button
//clean code in 1 line  //Conditional (ternary) operator

window.onscroll = ()=>{ return ((this.scrollY >= 600) ? up.classList.add('show') : up.classList.remove('show')); }

/*      The normal way for the same function (Hide and show)
window.onscroll = function() {
    up.classList.remove('show');                    //To check that the button is removed in start
    if (this.scrollY >= 600){                       //show button after scroll 600px
        //console.log(this.scrollY);                //test
        up.classList.add('show');
    }
    else{  
        up.classList.remove('show')                 // Hide button before 600 px
    }
};*/

// click button to scroll Top
up.addEventListener('click', () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
creatNavBar();

// Scroll to section && active navbar 
document.addEventListener('scroll', activeNavBar);

// Set sections as active
document.addEventListener('scroll', activeSectClass);
