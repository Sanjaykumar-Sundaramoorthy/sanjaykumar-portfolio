
// Go to top links 

$(document).ready(function(){
    $('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);
});


// navlinks scroll triggers

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.onscroll = window.onfocus = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(navLink => {
                if (navLink.classList.contains('active')) {
                    navLink.classList.remove('active');
                }
                activeNavLink = document.querySelector(`nav a[href*=${id}]`);
                if (!activeNavLink.classList.contains('active')) {
                    activeNavLink.classList.add('active');
                }
                if (window.location.hash !== `#${id}`) {
                    window.history.replaceState(null, null, `#${id}`);
                }
            });
        };
    });

}

// animation triggers on viewports

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) =>{
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('in-view');
                return;
            }
            entry.target.classList.remove('in-view');
        });
    });
    const allAnimatedElements = document.querySelectorAll('.entryShow');

    allAnimatedElements.forEach((element) => observer.observe(element));
});



//  theming (light and dark modes)
const themeToggle1 = document.querySelector('.toggle-icon')
const themeSection1 = document.querySelector('body')
const nameAnimate = document.querySelector('.home-name')
themeToggle1.onclick = () => {
    themeSection1.classList.toggle('dark')
    themeSection1.classList.toggle('light')
    nameAnimate.classList.toggle('name-night')
    nameAnimate.classList.toggle('home-name entryShow slideleft')
}

// form validation

document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const errorElement = document.getElementById('error');
    let messages = [];
    // Simple validation
    if (!name || !email || !subject || !message) {
        messages.push('Please fill in all fields');
        errorElement.innerText = messages;
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messages.push('Please enter a valid email address');
        errorElement.innerText = messages;
        return;
    }


    let parms = {
        name: name,
        email: email,
        subject: subject,
        message: message
    }

    emailjs.send("service_ek781an","template_qhie2sm",parms);
    messages.push('Message sent successfully');
    errorElement.innerText = messages;
    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
});