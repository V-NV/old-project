import data from './data.js';

const arrData = data;

createItemList(arrData)

function createItemList(Data) {
    const view = document.querySelector('.content');
    if(view) {
      view.innerHTML = '';
      for (let i = 0; i < data.length; i += 1) {
        view.innerHTML += `
          <div class="item">
            <h2>Наименование: <span class="item-name">${data[i].name}</span></h2>
            <p class="item-price">ID: ${data[i].id}</p>
            <p class="item-price">брэнд: ${data[i].brand}</p>
            <img class="item-photo" src="${data[i].images[0]}">
            <button class="_btn item-btn additem" data-itemid="${data[i].itemid}">Добавить в корзину</button>
            <button class="_btn item-btn removeitem" data-itemid="${data[i].itemid}">Удалить из корзины</button>
          </div>
        `
      }
    }
  }