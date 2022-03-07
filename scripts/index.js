"use strict";

/* add/remove show & active classes */
const addRemoveClasses = (value) => {
   if (value.classList.contains("show")) {
      value.classList.remove("active");

      /* time delay for removing show classes */
      setTimeout(() => {
         value.classList.remove("show");
      }, 250);

      /* adding classes */
   } else {
      value.classList.add("show");

      /* time delay for adding active classes */
      setTimeout(() => {
         value.classList.add("active");
      }, 0.1);
   }
};

/* provide switching like bookmark slide */
const toggle = (value) => {
   value.classList.toggle("active");
};

/* provide looping for multiple elements like burger_line, bookmark_slide */
const selectEachELement = (elements) => {
   elements.length > 1
      ? elements.forEach((element) => {
           element.classList.contains("bookmark_slide") ? toggle(element) : addRemoveClasses(element);
        })
      : addRemoveClasses(elements);
};

/* if burger is click run this function */
const clickBurger = (burger, burgerLines, navList) => {
   const overlay = document.querySelector(".overlay");

   burger.addEventListener("click", () => {
      selectEachELement(burgerLines);
      selectEachELement(navList);
      selectEachELement(overlay);
   });
};

/* if bookmark is click run this function */
const clickSlider = (bookmarks) => {
   const bookmarkText = document.querySelector(".bookmark_text");
   const bookmarkEd = document.querySelector(".ed");
   bookmarks.forEach((bookmark) => {
      bookmark.addEventListener("click", () => {
         selectEachELement(bookmarks);
         toggle(bookmarkText);
         toggle(bookmarkEd);
      });
   });
};

/* get burger element & nav list */
const burger = document.querySelector(".burger_menu");
const burgerLines = document.querySelectorAll(".burger_line");
const navList = document.querySelector(".nav_list");

clickBurger(burger, burgerLines, navList);

/* get bookmark to slide */
const bookmarks = document.querySelectorAll(".bookmark_slide");

clickSlider(bookmarks);
