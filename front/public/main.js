const navBar = document.querySelector("head");
function navBarScrolled() {
  const scrollValue = window.scrollY;
  if (scrollValue > 0) {
    console.log(navBar);
  } else {
    console.log("nope");
  }
}
window.addEventListener("scroll", navBarScrolled);
