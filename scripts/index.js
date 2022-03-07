"use strict";

const addRemoveClasses = (value) => {
   if (value.classList.contains("active")) {
      value.classList.remove("active");

      /* time delay for removing show classes */
      setTimeout(() => {
         value.classList.remove("show");
      }, 250);

      /* adding show & active classes */
   } else {
      value.classList.add("show");

      /* time delay for adding active classes */
      setTimeout(() => {
         value.classList.add("active");
      }, 0.1);
   }

   value.classList.contains("slide") ? value.classList.remove("slide") : value.classList.add("slide");
};

/* provide looping for multiple elements */
const selectEachELement = (elements) => {
   elements.forEach((element) => {
      addRemoveClasses(element);
   });
};

/* if burger is click run this function */
const clickBurger = (burger, burgerLines, navList) => {
   const overlay = document.querySelector(".overlay");

   burger.addEventListener("click", () => {
      selectEachELement(burgerLines);
      addRemoveClasses(navList);
      addRemoveClasses(overlay);
   });
};

/* get burger element & nav list */
const burger = document.querySelector(".burger_menu");
const burgerLines = document.querySelectorAll(".burger_line");
const navList = document.querySelector(".nav_list");

clickBurger(burger, burgerLines, navList);

/* get bookmark to slid */
const bookmarks = document.querySelectorAll(".bookmark_slide");

const bookmarksSlider = () => {
   bookmarks.forEach((bookmark) => {
      bookmark.addEventListener("click", () => {
         selectEachELement(bookmarks);
      });
   });
};

bookmarksSlider();
