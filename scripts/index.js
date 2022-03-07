"use strict";

const addClasses = (value) => {
   value.classList.add("show");

   /* time delay for adding active classes */
   setTimeout(() => {
      value.classList.add("active");
   }, 0.1);
};

const removeClasses = (value) => {
   value.classList.remove("active");

   /* time delay for removing show classes */
   setTimeout(() => {
      value.classList.remove("show");
   }, 250);
};

/* provide switching like bookmark slide */
const toggle = (value) => {
   value.classList.toggle("active");
};

const slide = (elements) => {
   elements.forEach((element) => {
      toggle(element);
   });
};

/* provide looping for multiple elements */
const selectEachELement = (elements) => {
   elements.length > 1
      ? elements.forEach((element) => {
           element.classList.contains("show") ? removeClasses(element) : addClasses(element);
        })
      : elements.classList.contains("show")
      ? removeClasses(elements)
      : addClasses(elements);
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
         slide(bookmarks);
         toggle(bookmarkText);
         toggle(bookmarkEd);
         console.log("this is bookmark", bookmark);
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
