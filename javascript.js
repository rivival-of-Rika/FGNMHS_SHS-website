function toggleMenu(menuId) {
  const allMenus = document.querySelectorAll('.menu-items');
  allMenus.forEach(menu => {
    if (menu.id !== menuId) menu.classList.remove('show');
  });

  const targetMenu = document.getElementById(menuId);
  targetMenu.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.trigger-img')) {
    const dropdowns = document.getElementsByClassName("menu-items");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show');
    }
  }
}