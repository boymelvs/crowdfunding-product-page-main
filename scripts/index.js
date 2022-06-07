"use strict";

//////////////////////////////////
//    UTILITY FUNCTIONS         //
//////////////////////////////////
/* provide switching like bookmark slide, overlay etc by add/remove active claass */
const toggle = (elem) => {
   elem.classList.contains("active") ? elem.classList.remove("active") : elem.classList.add("active");
};

/* add/remove show classes to display element/HTML TAG */
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

/* ================= form reset ================= */
const forms = document.querySelectorAll(".pledge_form");
const formReset = (radioKey) => {
   forms.forEach((form) => {
      form.reset();
   });

   removeAllWarning(radioKey);
};

/* ================= radio button ================= */
const radioReset = (element, clickKey) => {
   const radios = document.querySelectorAll('input[type="radio"]');

   radios.forEach((radio, radioKey) => {
      if (element.classList.contains("got_it_btn") || element.classList.contains("back_btn") || element.classList.contains("modal_close_btn")) {
         radio.checked = false;
         formReset(radioKey);
      } else if (radioKey === clickKey + 1) {
         radio.checked = true;
      }
   });
};

/* provide listening for click */
const clickAction = (action, element, overlay, optional, clickKey = "") => {
   /* stop scrolling the body */
   const bodyStopScrolling = document.getElementById("bodyStopScrolling");

   action.addEventListener("click", (e) => {
      e.preventDefault();

      if (action.classList.contains("bookmark_slide") || action.classList.contains("burger_menu")) {
         /* all about bookmark slide & burger */
         element.forEach((el) => {
            action.classList.contains("burger_menu") ? addRemoveClasses(el) : toggle(el);
         });

         action.classList.contains("burger_menu") ? addRemoveClasses(optional) : toggle(optional);

         /* other buttons such as select reward, continue, close etc */
      } else {
         toggle(bodyStopScrolling);
         radioReset(action, clickKey);
         addRemoveClasses(element);
      }

      toggle(overlay);
   });
};

/* provide looping single & multiple button  */
const listenForClick = (toClick, element, overlay, optional = "") => {
   if (toClick.length > 1) {
      toClick.forEach((clicked, clickKey) => {
         clickAction(clicked, element, overlay, optional, clickKey);
      });
   } else {
      clickAction(toClick, element, overlay, optional);
   }
};

/////////////////////////////////////////
// VARIABLES AND CALL UTILITY FUNCTION //
////////////////////////////////////////
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

/* get  "select" button */
const selectRewardBtns = document.querySelectorAll(".select_reward_btn");
listenForClick(selectRewardBtns, modalMainContainer, overlay);

/* ================= all about success modal ================= */
const successModal = document.querySelector(".success_modal_main_container");

/* get  got it button to close success modal */
const gotItBtn = document.querySelector(".got_it_btn");
listenForClick(gotItBtn, successModal, overlay);

///////////////////////////////////
//    UPDATING STATISTICS        //
///////////////////////////////////
/* ================= get statistics =================*/
const updateStatistics = (value) => {
   let goalAmount = 100000;
   let backedAmounts;
   let totalBackers;
   let progressBarLength;

   const progressBar = document.querySelector(".progress_bar");
   const statTotals = document.querySelectorAll(".stat_total");

   statTotals.forEach((statTotal) => {
      if (statTotal.classList.contains("total_amount_accummulated")) {
         backedAmounts = Number(value) + Number(statTotal.textContent.slice(1).replace(/,/g, ""));

         // statTotal.innerHTML = "$" + `${backedAmounts}`;
         statTotal.innerHTML = "$" + `${backedAmounts.toLocaleString()}`;
         progressBarLength = Math.floor((backedAmounts / goalAmount) * 100);
         progressBar.style.width = `${progressBarLength}%`;
      } else {
         totalBackers = Number(statTotal.textContent.replace(/,/g, "")) + 1;
         statTotal.innerHTML = `${totalBackers.toLocaleString()}`;
         // statTotal.innerHTML = `${totalBackers}`;
      }
   });
};

/* ================= get number of days left =================*/
const numDaysLefts = document.querySelectorAll(".num_days");
const modalNumDaysLefts = document.querySelectorAll(".modal_num_days");
const standPledges = document.querySelectorAll(".stand_pledges");
const pledgesDescriptionContainer = document.querySelectorAll(".pledge_description_container");
const grayOuts = document.querySelectorAll(".gray_out_modal");

/* gray out and disable the pledges if day turn zero */
const outOFStock = (numDaysLeftKey) => {
   selectRewardBtns[numDaysLeftKey].textContent = "Out of Stock";
   selectRewardBtns[numDaysLeftKey].classList.add("out_of_stock_btn");
   standPledges[numDaysLeftKey].classList.add("out_of_stock_pledge");
   grayOuts[numDaysLeftKey].classList.add("out_of_stock_modal_pledge");
};

const updateDaysLeft = (standNum) => {
   numDaysLefts.forEach((numDaysLeft, numDaysLeftKey) => {
      if (standNum == numDaysLeftKey + 1) {
         let remainingDays = Number(numDaysLeft.innerHTML) - 1;

         if (remainingDays == 0) {
            outOFStock(numDaysLeftKey);
         }
         numDaysLeft.innerHTML = remainingDays;
      }
   });

   modalNumDaysLefts.forEach((modalNumDaysLeft, modalNumDaysLeftKey) => {
      if (standNum == modalNumDaysLeftKey + 1) {
         let remainingDays = Number(modalNumDaysLeft.innerHTML) - 1;

         modalNumDaysLeft.innerHTML = remainingDays;
      }
   });
};

/* validation input purposes */
const amountInputs = document.querySelectorAll(".amount_input");
const warnings = document.querySelectorAll(".warning");
const inputBorders = document.querySelectorAll(".amount_label");

/* remove warning input value */
const removeAllWarning = (inputKey) => {
   warnings[inputKey].classList.remove("active");
   inputBorders[inputKey].classList.remove("active");
};

amountInputs.forEach((amountInput, inputKey) => {
   let timeOut;

   amountInput.addEventListener("input", (event) => {
      let removeWarning = true;
      event.preventDefault();

      if (timeOut) {
         clearTimeout(timeOut);
      }

      timeOut = setTimeout(() => {
         if (Number(amountInput.min) > Number(amountInput.value)) {
            warnings[inputKey].classList.add("active");
            inputBorders[inputKey].classList.add("active");
            removeWarning = false;
         }
      }, 750);

      if (removeWarning) {
         removeAllWarning(inputKey);
      }
   });
});

//////////////////////////////
//    FORMS SUBMISSION      //
//////////////////////////////
const pledgeForms = document.querySelectorAll(".pledge_form");
pledgeForms.forEach((pledgeForm, pledgeFormKey) => {
   pledgeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let value = amountInputs[pledgeFormKey].value;

      updateStatistics(value);
      updateDaysLeft(pledgeFormKey);

      addRemoveClasses(modalMainContainer);
      addRemoveClasses(successModal);
   });
});

/////////////////////
//   ARROW UP      //
/////////////////////
/* ================= all about arrow up ================= */
/* get up_arrow */
const arrowUP = document.querySelector(".scroll_up");

/* listening when to show up_arrow */
window.addEventListener("scroll", () => {
   window.pageYOffset > 750 ? arrowUP.classList.add("active") : arrowUP.classList.remove("active");
});
