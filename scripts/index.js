"use strict";

/* provide switching like bookmark slide, overlay etc by add/remove active claass */
const toggle = (value) => {
   value.classList.contains("active") ? value.classList.remove("active") : value.classList.add("active");
};

/* add/remove show  */
const addRemoveClasses = (value) => {
   if (value.classList.contains("show")) {
      /* removing classes */
      toggle(value);

      /* time delay for removing show classes */
      setTimeout(() => {
         value.classList.remove("show");
      }, 300);

      /* adding classes */
   } else {
      value.classList.add("show");

      /* time delay for adding active classes */
      setTimeout(() => {
         toggle(value);
      }, 0.1);
   }
};

/* provide looping to bookmark_slide button */
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

/* provide single element listening  */
const singleClick = (toClick, element, overlay) => {
   toClick.addEventListener("click", (e) => {
      e.preventDefault();
      addRemoveClasses(element);
      toggle(overlay);
   });
};

/* get the overlay */
const overlay = document.querySelector(".overlay");

/* ================= get burger element & nav list ================= */
const burger = document.querySelector(".burger_menu");
const burgerLines = document.querySelectorAll(".burger_line");
const navList = document.querySelector(".nav_list");
clickBurger(burger, burgerLines, navList, overlay);

/* get bookmark to slide */
const bookmarks = document.querySelectorAll(".bookmark_slide");
clickSlider(bookmarks);

/* ================= all about modal ================= */
const modalMainContainer = document.querySelector(".modal_main_container");

/* get back this project button to open modal */
const backBtn = document.querySelector(".back_btn");
singleClick(backBtn, modalMainContainer, overlay);

/* get x button to close modal */
const mainModalClose = document.querySelector(".main_modal_close_btn");
const modalClose = document.querySelector(".modal_close");
singleClick(mainModalClose, modalMainContainer, overlay);
singleClick(modalClose, modalMainContainer, overlay);

/* get modal continue button */
const continueBtns = document.querySelectorAll(".continue_btn_container");
continueBtns.forEach((continueBtn) => {
   continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      /* close modal */
      addRemoveClasses(modalMainContainer);

      /* open success modal */
      addRemoveClasses(successModal);
   });
});

/* ================= all about success modal ================= */
const successModal = document.querySelector(".success_modal_main_container");

/*get  got it button to close success modal */
const gotItBtn = document.querySelector(".got_it_btn");
singleClick(gotItBtn, successModal, overlay);

/* ================= all about this project button ================= */
const selectRewardBtns = document.querySelectorAll(".select_btn_container");
selectRewardBtns.forEach((selectRewardBtn) => {
   /* open modal */
   singleClick(selectRewardBtn, modalMainContainer, overlay);
});
