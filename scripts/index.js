"use strict";

/* provide switching like bookmark slide, overlay etc by add/remove active claass */
const toggle = (elem) => {
   elem.classList.contains("active") ? elem.classList.remove("active") : elem.classList.add("active");
};

/* add/remove show classes to display element */
const addRemoveClasses = (elem) => {
   if (elem.classList.contains("show")) {
      /* removing classes */
      toggle(elem);

      /* time delay for removing show classes */
      setTimeout(() => {
         elem.classList.remove("show");
      }, 300);

      /* adding classes */
   } else {
      elem.classList.add("show");

      /* time delay for adding active classes */
      setTimeout(() => {
         toggle(elem);
      }, 0.1);
   }
};

/* ================= radio button ================= */
const radioReset = (element) => {
   const radios = document.querySelectorAll('input[type="radio"]');
   radios.forEach((radio) => {
      if (element.classList.contains("got_it_btn") || element.classList.contains("back_btn")) {
         radio.checked = false;
      } else if (element.classList.contains("select_reward_btn")) {
         radio.checked = true;
      }
   });
};

/* provide listening for click */
const clickAction = (action, element, overlay, optional) => {
   /* stop scrolling the body */
   const bodyStopScrolling = document.querySelector(".bodyStopScrolling");

   action.addEventListener("click", (e) => {
      e.preventDefault();

      if (action.classList.contains("bookmark_slide") || action.classList.contains("burger_menu")) {
         /* all about bookmark slide & burger */
         element.forEach((el) => {
            action.classList.contains("burger_menu") ? addRemoveClasses(el) : toggle(el);
            console.log("this test2", el);
         });

         action.classList.contains("burger_menu") ? addRemoveClasses(optional) : toggle(optional);

         /* other buttons such as select reward, continue, close etc */
      } else {
         toggle(bodyStopScrolling);
         radioReset(action);
         addRemoveClasses(element);
      }

      toggle(overlay);
   });
};

/* provide looping single & multiple button  */
const listenForClick = (toClick, element, overlay, optional = "") => {
   if (toClick.length > 1) {
      toClick.forEach((clicked) => {
         clickAction(clicked, element, overlay, optional);
      });
   } else {
      clickAction(toClick, element, overlay, optional);
   }
};

/* get the overlay */
const overlay = document.querySelector(".overlay");

/* ================= get burger element & nav list ================= */
const burger = document.querySelector(".burger_menu");
const burgerLines = document.querySelectorAll(".burger_line");
const navList = document.querySelector(".nav_list");
listenForClick(burger, burgerLines, overlay, navList);

/* ================= get bookmark to slide ================= */
const bookmarks = document.querySelectorAll(".bookmark_slide");
const bookmarkText = document.querySelector(".bookmark_text");
const bookmarkEd = document.querySelector(".ed");
listenForClick(bookmarks, bookmarks, bookmarkText, bookmarkEd);

/* ================= all about modal ================= */
const modalMainContainer = document.querySelector(".modal_main_container");

/* get "back this project" button to open modal */
const backBtn = document.querySelector(".back_btn");
listenForClick(backBtn, modalMainContainer, overlay);

/* get x button to close modal */
const mainModalClose = document.querySelector(".main_modal_close_btn");
const modalClose = document.querySelector(".modal_close");
listenForClick(mainModalClose, modalMainContainer, overlay);
listenForClick(modalClose, modalMainContainer, overlay);

/* get modal "continue" button */
const continueBtns = document.querySelectorAll(".continue_btn");
// listenForClick(continueBtns, modalMainContainer, overlay);

const selectRewardBtns = document.querySelectorAll(".select_reward_btn");
listenForClick(selectRewardBtns, modalMainContainer, overlay);

/* ================= all about success modal ================= */
const successModal = document.querySelector(".success_modal_main_container");
listenForClick(continueBtns, successModal, overlay);

/*get  got it button to close success modal */
const gotItBtn = document.querySelector(".got_it_btn");
listenForClick(gotItBtn, successModal, overlay);
