//
//
"use strict";

let scrollBtn = document.querySelector(".scroll-to-top");
window.addEventListener("scroll", () => {
  if (scrollY >= 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});
scrollBtn.addEventListener("click", () =>
  scroll({ top: 0, behavior: "smooth" })
);

const swiper = new Swiper(".swiper", {
  // speed: 400,
  spaceBetween: 0,
  centeredSlides: true,
  loop: "true",
  autoplay: {
    delay: 100000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
});

const groupsSwiper = new Swiper(".groups-swiper", {
  // slidesPerView: 3,

  // spaceBetween: 10,
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
const offerSwiper = new Swiper(".offer-swiper", {
  // slidesPerView: 3,

  // spaceBetween: 10,
  autoplay: {
    delay: 10000,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    // 576: {
    //   slidesPerView: 2,
    //   spaceBetween: 30,
    // },
    // 992: {
    //   slidesPerView: 2,
    //   spaceBetween: 30,
    // },
    // 1024: {
    //   slidesPerView: 3,
    //   spaceBetween: 30,
    // },
    // 1200: {
    //   slidesPerView: 4,
    //   spaceBetween: 0,
    // },
  },
  scrollbar: {
    el: ".offer-swiper-scrollbar",
    draggable: true,
  },
});

// comment
let sideCategory = document.querySelectorAll(
  "aside .aside-category .item .head"
);
sideCategory.forEach((ele) => {
  ele.addEventListener("click", () => {
    sideCategory.forEach((e) => {
      if (e != ele) {
        e.parentElement.classList.remove("show");
      }
    });
    ele.parentElement.classList.toggle("show");
  });
});

//////
let smNav = document.querySelector(".sm-nav");

/// aside side menu
let aside = document.querySelector("aside");
smNav.querySelector("#aside-icon").addEventListener("click", (e) => {
  e.preventDefault();
  aside.classList.add("show");
});

aside.querySelector(".close-icon span").addEventListener("click", () => {
  aside.classList.remove("show");
});

aside.addEventListener("click", (e) => {
  if (e.target == aside) {
    aside.classList.remove("show");
  }
});

/// main menu
let sideMainMenu = document.querySelector(".side-main-menu");
smNav.querySelector("#side-main-menu-icon").addEventListener("click", (e) => {
  e.preventDefault();
  sideMainMenu.classList.add("show");
});

sideMainMenu.querySelector(".close-icon span").addEventListener("click", () => {
  sideMainMenu.classList.remove("show");
});

sideMainMenu.addEventListener("click", (e) => {
  if (e.target == sideMainMenu) {
    sideMainMenu.classList.remove("show");
  }
});

/// main menu dropdown at side main menu link
let coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// cart open and close
let cartControl = document.querySelector(".cart-control");
let secondRow = document.querySelector("header .second-row");
secondRow.querySelector(".bag").addEventListener("click", () => {
  cartControl.classList.add("show");
});
smNav.querySelector("#cart").addEventListener("click", (e) => {
  e.preventDefault();
  cartControl.classList.add("show");
});
cartControl.querySelector(".close-icon span").addEventListener("click", () => {
  cartControl.classList.remove("show");
});
cartControl.addEventListener("click", (e) => {
  if (e.target == cartControl) {
    cartControl.classList.remove("show");
  }
});

// cart products controls

let products = cartControl.querySelector(".cart-control .products");
let allBuyIconButtons = document.querySelectorAll(".buy-icon");
let item;
let imgSrc;
let productTitle;
let productPrice;
let ItemsChosen = [];

allBuyIconButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.firstElementChild.classList.remove("fa-bag-shopping");
    btn.firstElementChild.classList.add("fa-check-double");
    btn.classList.add("disabled");

    if (btn.parentElement.parentElement.classList.contains("item")) {
      item = btn.parentElement.parentElement;
      productTitle = item.querySelector(".name").textContent;
    } else if (
      btn.parentElement.parentElement.parentElement.classList.contains("item")
    ) {
      item = btn.parentElement.parentElement.parentElement;
      productTitle = item.querySelector(".product-title").textContent;
    }
    imgSrc = item.querySelector("img").getAttribute("src");
    productPrice = item.querySelector(".price .new").textContent;

    addProduct();
    generateCartControls();

    ItemsChosen.push(item);
  });
});

function addProduct() {
  let isExist = false;
  products.querySelectorAll(".product").forEach((product) => {
    if (product.querySelector(".title").textContent == productTitle) {
      isExist = true;
    }
  });
  if (!isExist) {
    products.innerHTML += `
    <div class="product">
    <div class="image">
      <img src="${imgSrc}" alt="" />
    </div>
    <div class="info">
      <h4 class="title">${productTitle}</h4>
      <span class="price">${productPrice}</span>
      <div class="controls">
      <span class="minus"><i class="fa-solid fa-minus"></i></span>
      <span class="count">1</span>
      <span class="plus"><i class="fa-solid fa-plus"></i></span>
      </div>
      <span class="remove-product-icon">
        <i class="fa-solid fa-trash-can"></i>
      </span>
    </div>
    </div>
  `;
  }
}

function generateCartControls() {
  products.querySelectorAll(".product").forEach((currentProduct) => {
    countControls(currentProduct);
    removeProduct(currentProduct);
    changingNumberOfProducts();
    calcTotalPrice();
  });
}

function countControls(currentProduct) {
  let minus = currentProduct.querySelector(".minus");
  let plus = currentProduct.querySelector(".plus");
  let count = currentProduct.querySelector(".count");
  plus.addEventListener("click", () => {
    if (count.textContent == 0) {
      minus.classList.remove("disable");
    }
    count.innerHTML++;
    changingNumberOfProducts();
    calcTotalPrice();
  });
  minus.addEventListener("click", () => {
    count.innerHTML--;
    if (count.textContent == 0) {
      minus.classList.add("disable");
    }
    changingNumberOfProducts();
    calcTotalPrice();
  });
}

function removeProduct(currentProduct) {
  currentProduct
    .querySelector(".remove-product-icon")
    .addEventListener("click", () => {
      ItemsChosen.forEach((item) => {
        if (
          currentProduct.querySelector(".price").textContent ==
          item.querySelector(".price .new").textContent
        ) {
          let btn = item.querySelector(".buy-icon");
          btn.firstElementChild.classList.remove("fa-check-double");
          btn.firstElementChild.classList.add("fa-bag-shopping");
          btn.classList.remove("disabled");
        }
      });

      currentProduct.remove();
      changingNumberOfProducts();
      calcTotalPrice();
    });
}

function changingNumberOfProducts() {
  let itemsCount = 0;
  products.querySelectorAll(".product").forEach((product) => {
    itemsCount += +product.querySelector(".count").textContent;
  });
  cartControl.querySelector(".total-items span").innerHTML = itemsCount;
  smNav.querySelector("#cart span").innerHTML = itemsCount;
  secondRow.querySelector(".bag span").innerHTML = itemsCount;
}

function calcTotalPrice() {
  let total = 0;
  products.querySelectorAll(".product .price").forEach((price) => {
    let productPrice = +price.textContent.slice(1);
    let productCount =
      price.nextElementSibling.querySelector(".count").textContent;
    total += productPrice * productCount;
  });
  cartControl.querySelector(".total-price").textContent =
    total < 1000 ? `$${total}.00` : `$${total}`;
}
