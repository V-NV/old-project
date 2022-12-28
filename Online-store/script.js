import data from './data.js';
const view = document.querySelector('.content');
const SortBy = document.querySelector('#sort-select');//сортировка
const CartIcon = document.querySelector('.cart');// при клике на корзину
const Logo = document.querySelector('.logo-header')// для возврата на главную по клику
const PayOn = document.querySelector('.cont-pay');
const arrData = data;
const arrFirst = data.slice();
let arrCart = [];//массив карзины
let arrTemp = [];//для первого вызванного фильтра
let arrCurrient = arrData;//текущее состояние массива
let isTable = true;//текущее отображение страницы
let isList = false;//текущее отображение страницы
let arrSmartCheckbox = [];//массив smartfones
let isCheckOn = false; // состояние чекбокса
let suma = 0;//сумма товаров в корзине для header

createTable(arrData)//запуск при первой загрузке со всеми товарами 

console.log(arrData[0].title)
/*----------------------отрисовка таблицой---------------------------- */

function createTable(Data) {
  arrTemp = [];
  arrCurrient = Data;//передача текущего состояния
  Sort2(); 
  let data = arrCurrient;
  let IdVerific = document.getElementsByClassName('item-image')
  
    if(view) {
      view.innerHTML = '';
      
      for (let i = 0; i < arrCurrient.length; i += 1) {
        
        view.innerHTML += `
          <div class="item" id="item${data[i].id}">
            <h2 class="item-name">${data[i].title}</h2>
            <div class="text-cont">
            <li class="item-discr">Брэнд: ${data[i].brand}</li>
            <li class="item-discr">Категория: ${data[i].category}</li>
            <li class="item-discr">Рейтинг: ${data[i].rating}</li>
            <li class="item-discr">Количество: ${data[i].stock}</li>
            <li class="item-price">Цена: $ ${data[i].price}</li>
            </div>
            <img class="item-image" id="${data[i].id - 1}" alt="${data[i].title}" src="${data[i].thumbnail}">
            <div class="item-button-cont">
            <button class="btn-item" id="btn-add${data[i].id}">Добавить в корзину</button>
            <button class="btn-item" id="btn-del${data[i].id}">Удалить из корзины</button>
            </div>
          </div>
        `
            }
      /*for(let j = 0;j<arrFirst.length;j+=1){ 
        for (let i = 0; i < data.length; i += 1) {
          if(arrFirst[j].title == data[i].title){
            data[i].id = arrFirst[j].id
        }}
      }
        console.log(arrFirst[0].id,'arrFirst')
      console.log(arrCurrient[0].id,'arrCurrient')
      */
    }
    isList = false;
    isTable = true;
    
    const a = document.querySelector('.search-result');
    a.textContent = Data.length;
    noItems();
     PopupOn();
     AddItems()
  
  }
  /*----------------------отрисовка таблицой-конец--------------------------- */
 

  /*-------------------------отрисовка списком------------------------------- */

  function createList(Data) {
    arrTemp = [];
    arrCurrient = Data;//передача текущего состояния
    Sort2();
     let data = Data;
      if(view) {
        view.innerHTML = '';
        for (let i = 0; i < Data.length; i += 1) {
          view.innerHTML += `
            <div class="item-list" id="${data[i].id}">
              <div class="text-cont-list">
              <li class="item-discr">Брэнд: ${data[i].brand}</li>
              <li class="item-discr">Категория: ${data[i].category}</li>
              <li class="item-discr">Рейтинг: ${data[i].rating}</li>
              <li class="item-discr">Количество: ${data[i].stock}</li>
              <li class="item-price">Цена: $ ${data[i].price}</li>
              </div>
              <img class="item-image-list" id="${data[i].id-1}" alt="${data[i].title}" src="${data[i].thumbnail}">
              <div class="item-button-cont-list">
              <h2 class="item-name">${data[i].title}</h2>
              <button class="btn-item" id="btn-add${data[i].id}">Добавить в корзину</button>
              <button class="btn-item" id="btn-del${data[i].id}">Удалить из корзины</button>
              </div>
            </div>
          `
        }
        isList = true;
        isTable = false;
        
        const a = document.querySelector('.search-result');
        a.textContent = Data.length;
        noItems();
         PopupOn();
         AddItems()
       }
    }

/*-------------------------отрисовка-списком-конец----------------------------*/

/*----------------------------------------------------------------------------*/

/*------------------------------swich-table-list------------------------------*/
const Table = document.getElementById("table");
const List = document.getElementById("list");
Table.className = 'now';

List.addEventListener('click', function(){
    if(!isList && arrCurrient.length < 1) {
      createList(arrData)
      Table.className = '';
      List.className = 'now';
      isList = true;
      isTable = false;
    }
    if(!isList && arrCurrient.length > 0) {
      createList(arrCurrient)
      Table.className = '';
      List.className = 'now';
      isList = true;
      isTable = false;
    }
});


Table.addEventListener('click', function(){
  if(!isTable && arrCurrient.length < 1) {
    createTable(arrData)
    Table.className = 'now';
    List.className = '';
    isList = false;
    isTable = true;
  }
  if(!isTable && arrCurrient.length > 0) {
    createTable(arrCurrient)
    Table.className = 'now';
    List.className = '';
    isList = false;
    isTable = true;
  }
});

/*------------------------------swich-table-list-END-----------------------------*/
/*let o = document.querySelector('.text-cont')
console.log(o.childNodes[1].className)*/
/*-----------------------------------Ввод-инпут----------------------------------*/

const searchInput = document.querySelector('#input');

if (searchInput) {
  searchInput.oninput = function(event) {
 console.log(searchInput.value, 'введено')
    const ItemToDelete2  = document.querySelectorAll('.item-list');
    const ItemToDelete  = document.querySelectorAll('.item');
    let dataTA = arrData;
    const res = event.target.value
    
    const a = document.querySelector('.search-result')
   if(isCheckOn === true){dataTA = arrSmartCheckbox}//если включен чекбокс
   
    for (let i = 0; i < dataTA.length; i += 1) {
                                                           //все варианты для поиска в одну строку       
      let SearchString = dataTA[i].title + ' ' + dataTA[i].price.toString() + ' ' +  dataTA[i].brand + ' ' +  dataTA[i].stock.toString() + ' ' +  dataTA[i].rating.toString() + ' ' +  dataTA[i].category;
                    
      if (SearchString.toLowerCase().includes(res.toLowerCase() || res) == true ) {
       
          arrTemp.push(dataTA[i])
       }
     }
     view.innerHTML = '';
    isTable?createTable(arrTemp):createList(arrTemp);
  }
}
/*-----------------------------------Ввод-инпут----------------------------------*/

/*-----------------------------------Нет-товаров---------------------------------*/

function noItems(){
const a = document.querySelector('.search-result')
const b = document.querySelector('.no-items')
if(a.textContent < 1){
  b.classList.remove('off')
}
else{
b.classList.add('off')  
}
}

/*-----------------------------Нет-товаров-конец-----------------------------*/

/*--------------------------------Сортировка---------------------------------*/

//const SortBy = document.querySelector('#sort-select'); переместил вверх

SortBy.addEventListener('change', Sort);
 
  function Sort() {
    console.log(SortBy.value,'текущая выбранная сортировка');
if ((SortBy).value == 'a-z') {
  arrCurrient.sort(function (a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    return 0;
  });
} else if ((SortBy).value == 'z-a') {
  arrCurrient.sort(function (a, b) {
    if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
    if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
    return 0;
  });
} else if ((SortBy).value == 'from-min') {
  arrCurrient.sort((a, b) => a.price*1 - b.price*1);
} else if ((SortBy).value == 'from-max') {
  arrCurrient.sort((a, b) => b.price*1 - a.price*1);
}
isTable?createTable(arrCurrient):createList(arrCurrient);
}
function Sort2() {//тоже что первая но без замыкания
  console.log(SortBy.value,'текущая выбранная сортировка');
if ((SortBy).value == 'a-z') {
arrCurrient.sort(function (a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
});
} else if ((SortBy).value == 'z-a') {
arrCurrient.sort(function (a, b) {
  if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
  if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
  return 0;
});
} else if ((SortBy).value == 'from-min') {
arrCurrient.sort((a, b) => a.price*1 - b.price*1);
} else if ((SortBy).value == 'from-max') {
arrCurrient.sort((a, b) => b.price*1 - a.price*1);
}
}

/*--------------------------------Сортировка---------------------------------*/

/*---------------------------- -Чекбоксы-верхние-----------------------------*/
const BoxCategory = document.getElementById('category');//весь контейнер категории
const CheckSmart = document.getElementById('smart');
const CheckNout = document.getElementById('nout');
const CheckShirt = document.getElementById('shirt');
const CheckWatch = document.getElementById('watch');
let ArrAllCategory = [];
//console.log(CheckSmart.checked)
BoxCategory.addEventListener('click',() => {
  //console.log(CheckSmart.checked)
  arrSmartCheckbox = [];// все зажатые
  let arrTempBox = [];//для конката
  let arrSmart = [];
  let arrNout = [];
  let arrShirt = [];
  let arrWatch = []; 

    if (CheckSmart.checked) {
      arrSmart = [];
      arrSmart = arrData.filter((el) => el.category.includes('smartphones'));
    }
    if (CheckNout.checked) {
      arrNout = [];
      arrNout = arrData.filter((el) => el.category.includes('laptops'));
    }
    if (CheckShirt.checked) {
      arrShirt = [];
      arrShirt = arrData.filter((el) => el.category.includes('mens-shirts'));
    }
    if (CheckWatch.checked) {
      arrWatch = [];
      arrWatch = arrData.filter((el) => el.category.includes('mens-watches'));
    }  
    if(CheckSmart.checked || CheckNout.checked || CheckShirt || CheckWatch) {
      searchInput.value = '';// очистка инпута при выкл чекбокса
      searchInput.placeholder = 'Введите запрос'
      isCheckOn = true;
        arrSmartCheckbox = arrTempBox.concat(arrSmart, arrNout, arrShirt, arrWatch);
        isTable?createTable(arrSmartCheckbox):createList(arrSmartCheckbox);
    }  
      if(arrSmartCheckbox.length < 1){
        isCheckOn = false;
        isTable?createTable(arrData):createList(arrData);
      }
  });

/*---------------------------------Чекбоксы-END---------------------------------*/

/*--------------------------------Карточки попап--------------------------------*/

function PopupOn(){
  
  const itemPopup = document.getElementsByClassName('item-image');
  const itemPopupList = document.getElementsByClassName('item-image-list');
  const Left = document.querySelector('.left');
  const Right = document.querySelector('.right');
  const Footer = document.querySelector('.footer');
  const Popup = document.querySelector('.popup');

  
  let elements = [];
  if(isTable){elements = itemPopup}
  if(isList){elements = itemPopupList}

  for(let el of elements){
  el.addEventListener('click', function(event) {
  
  let elem = event.target
  let ID = elem.id;
 
  view.classList.add('off')
  Left.classList.add('off')
  Right.classList.add('off')
  Footer.classList.add('foot-down')

  Popup.classList.remove('off')

    Popup.innerHTML = '';
    Popup.innerHTML += `
    <div class="item-pop" id="${ID}}">
         <div class="exit">х</div>
         <h2 class="item-name-pop">${arrFirst[ID].title}</h2>
       <div class="cont-box-pop">
        <div class="img-box-pop">
        <img class="item-image-pop" id="i${arrFirst[ID].images[0]}" alt="${arrFirst[ID].title}" src="${arrFirst[ID].thumbnail}">
       </div>
       <div class="text-cont-pop">
        <li class="item-discr">Брэнд: ${arrFirst[ID].brand}</li>
        <li class="item-discr">Категория: ${arrFirst[ID].category}</li>
        <li class="item-discr">Рейтинг: ${arrFirst[ID].rating}</li>
        <li class="item-discr">Скидка: ${arrFirst[ID].discountPercentage} %</li>
        <li class="item-discr">Количество: ${arrFirst[ID].stock}</li>
        <li class="item-price">Цена: $ ${arrFirst[ID].price}</li>
       <div class="arrow" id="left-arrow">&#8644</div>
      </div>
      </div>
          <div class="opisanie">Описание: ${arrFirst[ID].description}</div>
        <div class="item-button-cont-pop">
          <button class="btn-item" id="btn-add${arrFirst[ID].id}">Добавить в корзину</button>
          <button class="btn-item" id="btn-del${arrFirst[ID].id}">Удалить из корзины</button>
        </div>
      </div>
    `
    const Mov = document.querySelector('.item-image-pop');
    const btnChange = document.getElementById('left-arrow');
       
    let arrImg = arrFirst[ID].images;
      
    let count = 0;
   
    btnChange.addEventListener('click', function(){
   
      if(count === 0 ){
        Mov.src = arrImg[count];
        count += 1;
      }
      else if(count > 0 && count < arrImg.length){
        Mov.src = arrImg[count];
        count += 1;
       }
       else if(count > arrImg.length){
        count = 0
        Mov.src = arrImg[count];
        count += 1;
       }
       else if(count < 0){
        count = 0;
        count = arrImg.length-1
        Mov.src = arrImg[count];
        count += 1;
       }
       else if(count == arrImg.length){
        count = 0;
        Mov.src = arrImg[count];
        count += 1;
       }

    })
   
    const ZoomImg = document.querySelector('.item-image-pop');
    ZoomImg.addEventListener('mouseover', function(){
        ZoomImg.classList.add('item-image-pop-on');
     })
    ZoomImg.addEventListener('mouseout', function(){
         ZoomImg.classList.remove('item-image-pop-on');
     })
  AddItems();
  
    const Exit = document.querySelector('.exit');
    Exit.addEventListener('click', function() {
      
      Left.classList.remove('off')
      Right.classList.remove('off')
      Footer.classList.remove('foot-down')
      view.classList.remove('off');
      Popup.classList.add('off');
      Popup.innerHTML = '';
   
  })
})
  }
}

/*--------------------------------Карточки попап-End-------------------------------*/

/*-------------------------------------корзина-------------------------------------*/
CartIcon.addEventListener('click',OpenCart);

function OpenCart(){
  const CartPage = document.querySelector('.cart-page');
  const Left = document.querySelector('.left');
  const Right = document.querySelector('.right');
  const Footer = document.querySelector('.footer');
   
  view.classList.add('off');
  Left.classList.add('off');
  Right.classList.add('off');
  Footer.classList.add('foot-down');
  CartPage.classList.remove('off');
  PayOn.classList.add('off');
    CartPage.innerHTML = '';
    CartPage.innerHTML += `
    <div class="left-cart">
    <div class="left-cart-header">
        <p class="articl">Товаров в корзине</p>
          <div class="paginat-box">
             <div class="item-box">
                <p>items: <span> 0 </span></p>
             </div>
                <div class="item-box2">
                <p>page:<span> &#9664 </span><span>0</span><span> &#9654 </span></p>
            </div>      
            </div>
    </div>
      <div class="left-cart-content">
    </div>
</div>    
<div class="right-cart">
       <div class="right-cart-header">
           <p class="articl">Итого:</p>
       </div>
       <div class="right-cart-content">
         <p>Товаров:</p>
         <p>Сумма</p>
         <div class="sort">
         <div>
            <input class="promo-input" id="input" placeholder="Введите промо код" autofocus="">
         </div> 
            <p class="promotest">Тестовый код: 'Rss10' 'Rss15'</p>  
        </div>
        <button class="btn-buy">Купить</button>
       </div>       
</div> 
    `
    const CartItem = document.querySelector('.left-cart-content');
    
    
    for (let i = 0; i < arrCart.length; i += 1) {
    
    CartItem.innerHTML += `
           
    <div class="item-cart" id="${arrCart[i].id}">
                  
       <div class="img-box-cart">
        <img class="item-image-pop" id="i${arrCart[i].images[0]}" alt="${arrCart[i].title}" src="${arrCart[i].thumbnail}">
       </div>
       <div class="text-cont-cart">
        <h2 class="cart-name">${arrCart[i].title}</h2>
        <div class="opisanie-cart">Описание: ${arrCart[i].description}</div>
        <p class="discr-cart">Брэнд: ${arrCart[i].brand}</p>
        <p class="discr-cart">Категория: ${arrCart[i].category}</p>
       <div class="down-cart">
        <p class="discr-cart-d">Рейтинг: ${arrCart[i].rating}</p>
        <p class="discr-cart-d">Скидка: ${arrCart[i].discountPercentage} %</p>
       </div> 
      </div>
          
        <div class="item-button-cont-cart">
          <p class="discr-cart">Наличие: ${arrCart[i].stock}</p>
          <button class="btn-item-cart" id="btn-plus${arrCart[i].id}"> + </button>
          <button class="btn-item-cart" id="btn-minus${arrCart[i].id}"> - </button>
          <p class="price-cart-d">Цена: $ ${arrCart[i].price}</p>
        </div>
    </div>
    `
    
  }
   /**************************************кнопка купить  и пустая корзина********************************/
  document.querySelector('.btn-buy').disabled = false;
  if(arrCart.length<1){
    document.querySelector('.btn-buy').disabled = true;
    CartItem.innerHTML += `
    <p class="header-cart-sum">В корзине не товаров</p>
    <p class="header-cart-sum">Кнопка оплаты активна только при наличии товара в корзине</p>
    `
  }
 /***********************************кнопка купить и пустая корзина END********************************/ 
  
 /*********************************оплата***************************/

const Pay = document.querySelector('.btn-buy');
//const PayOn = document.querySelector('#container-pay');

Pay.addEventListener('click', PayForm)

function PayForm() {
  
 // let PayOn = document.querySelector('#container-pay');
  console.log(PayOn)
CartPage.classList.add('off')
PayOn.classList.remove('off');
console.log(PayOn)
const form = document.getElementById("form");
const username = document.getElementById("username");
const adress = document.getElementById("adress");
const email = document.getElementById("email");
const telepfone = document.getElementById("telepfone");
const cardnumber = document.getElementById("cardnumber");
const date = document.getElementById("date");
const cvv = document.getElementById("cvv");
//regExp
const eml = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cv = /^[0-9]{3,4}$/; 
const mmyy = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/; 

const Validate = (item, messageType, message) => {
    const formControl = item.parentElement;
    formControl.className = messageType === "error" ? "form-control error" : "form-control success";
    if (messageType === "error" && !!message) {
        const small = formControl.querySelector("small");
        small.innerHTML = message;
    }
};
function checkUser(username) {
    if (username.value.toLowerCase().split(' ').length === 2 && username.value.toLowerCase().split(' ')[0].length >=3 && username.value.toLowerCase().split(' ')[1].length >=3) {
        
        Validate(username, "success");
    }
    else {
        
        Validate(username, "error", "Введите два слова от 3 символов каждое ");
    }
}
function checkTelepfone(telepfone) {
    let aNumber = telepfone.value.toString().split('+').join('')*1;
    if (telepfone.value.toString()[0] === '+' && telepfone.value.toString().length >= 10 && !isNaN(aNumber) ) {
        Validate(telepfone, "success");
    }
    else {
      
        Validate(telepfone, "error", "Формат ввода: +123456789(от 9 цифр после +)");
    }
}
function checkAdres(adress) {
    if (adress.value.toString().trim().split(' ').length >= 3 && adress.value.toString().split(' ')[0].length >=5 && adress.value.toString().split(' ')[1].length >=5 && adress.value.toString().split(' ')[2].length >=5) {
       
        Validate(adress, "success");
    }
    else {
       
        Validate(adress, "error", "От 3-ёх слов от 5-ти символов каждое");
    }
}
function checkEmail(email) {
    if (eml.test(email.value.toLowerCase())) {
       
        Validate(email, "success");
    }
    else {
       
        Validate(email, "error", "Формат ввода: email@gmail.com(ru)");
    }
}

function checkCard (cardnumber) {
    let cardN = cardnumber.value.toString().trim().split(' ').join('');
    if ((cardN.length === 16 && !isNaN(cardN*1)) || (cardN.length === 5 && !isNaN(cardN*1))) {
       //console.log(cardnumber.value.toString().trim().split(' ').join(''))
        Validate(cardnumber, "success");
    }
    else {
       // console.log(cardnumber.value.toString().trim().split(' ').join('').length)
        Validate(cardnumber, "error", "Формат ввода: 5 или 16 цифр");
    }
    
    cardnumber.oninput = function(event){
      let visa = document.querySelector('.visa');
      let inp = event.target.value
      if(+inp[0] === 4){visa.src = 'https://i.pinimg.com/474x/2e/85/de/2e85de7a272291a5f07d8f978a409fc3.jpg'}
      else if(+inp[0] === 5){visa.src = 'https://image.shutterstock.com/image-photo/image-260nw-277654622.jpg'}
      else if(+inp[0] === 6){visa.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEcv9Ysyc9Vxe6uHhZptfkRheSF-0zXDRfpn2-fPFK06kY0lgtoicgzGCaNcZFrhYplw&usqp=CAU'}
         else{visa.src='https://cdn.iconscout.com/icon/premium/png-128-thumb/shopping-payment-1950536-1647158.png'}
    }
  
}
function checkDate(date) {
    if (mmyy.test(date.value) && date.value.toString().length == 4) {
        let dm = date.value.toString('').split('');
        date.value = dm[0]+dm[1]+'/'+ +dm[2]+dm[3]
        Validate(date, "success");
    }
    else {
        Validate(date, "error", "Формат ввода: 0723");
    }
}
function checkCvv(cvv) {
    if (cv.test(cvv.value.toLowerCase())) {
        Validate(cvv, "success");
    }
    else {
        Validate(cvv, "error", "3 или 4 цифры");
    }
}
const checkRequired = (items) => {
    items.forEach((item) => {
        if (item.value.trim() === "") {
            Validate(item, "error", captializedNameOFInput(item) + " is required");
        }
        else {
            Validate(item, "success");
        }
    });
};

const captializedNameOFInput = (item) => {
    return item.id[0].toUpperCase() + item.id.slice(1);
};

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([username, adress, email, telepfone, cardnumber, date, cvv]);
	checkUser(username);
    checkAdres(adress);
    checkEmail(email);
	checkTelepfone(telepfone);
    checkCard(cardnumber);
    checkDate(date);
	checkCvv(cvv);
  
});
}


/*********************************оплата END***************************/

};
/*********************************корзина END***************************/
 
/******************добавление/удаление товара в корзину END*************/

function AddItems(){
let BtnAddDel = document.querySelectorAll('.btn-item');
let MainCart = document.querySelector('.cart');
//let suma = 0; вынесенно вверх

for(let el of BtnAddDel){
el.addEventListener('click', function(e) {
  const korz = document.querySelector('.cartscore');
  const summ = document.querySelector('.header-summ');
  
  let knop = e.target;
  //console.log(knop,'эта кнопка нажата')
  let idBtn = knop.id.slice(7);

  let isDouble = [];
  isDouble = arrCart.filter((items) => +items.id == +idBtn);

if(knop.id.includes('add') && isDouble.length < 1){
    arrCart.push(arrFirst[idBtn-1])
    korz.textContent = arrCart.length;
    suma += +arrFirst[idBtn-1].price;
    summ.textContent = suma;
  }
    let textId = knop.id.slice(0,7)
    //console.log(textId,'textId')
    if(knop.id.includes('del') && arrCart.length>0) {
     // console.log(arrCart,'arrCart до фильтра')
     let temp = [];
     temp = arrCart.filter((items) => +items.id !== +idBtn)
     // console.log(arrTemp,'arrTemp')
     arrCart = temp; 
     //console.log(arrCart,'arrCart после фильтра')
     if(isDouble.length){
     suma = suma - +arrFirst[idBtn-1].price;
     korz.textContent = arrCart.length;
     summ.textContent = suma;
     }
      }
      //}
})
}
}
/********************LOGO CLICK***************/
Logo.addEventListener('click',function(){
  const CartPage = document.querySelector('.cart-page');
  const Left = document.querySelector('.left');
  const Right = document.querySelector('.right');
  const Footer = document.querySelector('.footer');
  const Popup = document.querySelector('.popup');

  view.classList.remove('off')
  Left.classList.remove('off')
  Right.classList.remove('off')
  Footer.classList.remove('foot-down')
  CartPage.classList.add('off')
  Popup.classList.add('off')
  PayOn.classList.add('off');
  AddItems()
})
/********************LOGO CLICK***************/



