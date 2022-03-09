"use strict";

/* add/remove show & active classes */
const addRemoveClasses = (value) => {
   if (value.classList.contains("show")) {
      value.classList.remove("active");

      /* time delay for removing show classes */
      setTimeout(() => {
         value.classList.remove("show");
      }, 600);

      /* adding classes */
   } else {
      value.classList.add("show");

      /* time delay for adding active classes */
      setTimeout(() => {
         value.classList.add("active");
      }, 0.1);
   }
};

/* provide switching like bookmark slide, overlay */
const toggle = (value) => {
   // value.classList.toggle("show");
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
const clickBurger = (burger, burgerLines, navList, overlay) => {
   burger.addEventListener("click", () => {
      selectEachELement(burgerLines);
      addRemoveClasses(navList);
      toggle(overlay);
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

/* get the overlay */
const overlay = document.querySelector(".overlay");

/* get burger element & nav list */
const burger = document.querySelector(".burger_menu");
const burgerLines = document.querySelectorAll(".burger_line");
const navList = document.querySelector(".nav_list");

clickBurger(burger, burgerLines, navList, overlay);

/* get bookmark to slide */
const bookmarks = document.querySelectorAll(".bookmark_slide");
clickSlider(bookmarks);

/* get all about modal */
const modalMainContainer = document.querySelector(".modal_main_container");

const modalClose = document.querySelector(".modal_close_btn");
modalClose.addEventListener("click", () => {
   /* close modal */
   addRemoveClasses(modalMainContainer);
   /* close overlay */
   toggle(overlay);
});

/* back this project button */
const backBtn = document.querySelector(".back_btn");
backBtn.addEventListener("click", (e) => {
   e.preventDefault();
   /* open modal */
   addRemoveClasses(modalMainContainer);
   /* opem overlay */
   toggle(overlay);
});

/* success modal */
const successModal = document.querySelector(".success_modal_main_container");

/* got it button */
const gotItBtn = document.querySelector(".got_it_btn");
gotItBtn.addEventListener("click", () => {
   /* close success modal */
   addRemoveClasses(successModal);

   /* opem overlay */
   toggle(overlay);
});

/* get modal continue button */
const continueBtns = document.querySelectorAll(".continue_btn");

continueBtns.forEach((continueBtn) => {
   continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      /* close modal */
      addRemoveClasses(modalMainContainer);

      /* open success modal */
      addRemoveClasses(successModal);
   });
});
