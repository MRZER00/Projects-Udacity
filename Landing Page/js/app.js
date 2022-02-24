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
const selSections = document.querySelectorAll('section')
const navBarList = document.querySelector('#navbar__list')
const buttonTop = document.querySelector('.top')
const dos = document.querySelectorAll('.landing__container')
// const slideD = document.querySelectorAll('.slideDowen')
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
// build the navbar list && anchor ID using scrollTO section
selSections.forEach((section) => {
  navBarList.innerHTML += `<li><a class="menu__link" href="#${section.getAttribute('id')}">${section.getAttribute('data-nav')}</a></li>`
})

// TODO : section when near top of viewport add class 'your-active-class'
function activeNavBarsections () {
  let len = selSections.length
  const nav = document.querySelectorAll('.menu__link')

  // A loop to find out the partition in the viewport by passing the number of partitions to measure for each partition
  while (--len && window.scrollY < selSections[len].offsetTop - 180) {}

  // remove class 'active' from the navbar list
  nav.forEach((bar) => { bar.classList.remove('active') })
  // Adding an "active" class to an viewport  'section 1/2/3/4/....'
  nav[len].classList.add('active')

  // remove class 'your-active-class' from the navbar list ..
  dos.forEach((rem) => { rem.classList.remove('your-active-class') })
  // then add this class 'your-active-class'
  dos[len].classList.add('your-active-class')

  // Another way to add 'your-active-class'
  //activeClassSection()

  // use setTimeout for hiding navbar in 4s without scroll
  ShowHidewNavbar()
  function ShowHidewNavbar () {
    navBarList.style.display = 'block'
    // clearTimeout;
    setTimeout(() => {
      navBarList.style.display = 'none'
    }, 4000)
  }

  function activeClassSection () {
    const secPosi = selSections[len].getBoundingClientRect().top
    // remove class 'active section'
    selSections.forEach((rem) => { rem.classList.remove('your-active-class') })
    (secPosi >= -340 && secPosi <= 300)
      ? selSections[len].classList.add('your-active-class')
      : selSections[len].classList.remove('your-active-class')
  }
}

// TODO : Hide and show the top button
// clean code in 1 line
window.onscroll = () => { return ((this.scrollY >= 600) ? buttonTop.classList.add('show') : buttonTop.classList.remove('show')) }

// click button to scroll Top
function buTop () {
  window.scroll({
    top: 0, behavior: 'smooth'
  }
  )
}

// sections Collapsible
function sectionsCollapsible() {
  const slideD = document.querySelectorAll('.slideDown')
  for (i = 0; i < slideD.length; i++) {
    slideD[i].addEventListener('click', function () {
      this.classList.toggle('buttonActive')
      const content = this.nextElementSibling
      if (content.style.display === 'block') {
        content.style.display = 'none'
      } else {
        content.style.display = 'block'
      }
    })
  }
}

sectionsCollapsible()
  
/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section && active navbar
document.addEventListener('scroll', activeNavBarsections)

// scroll to top
buttonTop.addEventListener('click', buTop)

