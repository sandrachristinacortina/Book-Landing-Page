//making changes
//morechanges
//making changes
//making changes
//morechanges
//more changes
//more and more changes
//changes 1
//firstchanges
//secondchanges 
//first changes
//second changes
//third changes
// Close the "Buy in Print" menu on outside click or Escape
document.addEventListener("click", (event) => {
  document.querySelectorAll(".buy-menu[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute("open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".buy-menu[open]").forEach((menu) => {
    menu.removeAttribute("open");
    menu.querySelector("summary").focus();
  });
});
