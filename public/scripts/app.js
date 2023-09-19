// Client facing scripts here
// const db = require('../../db/connection');

// const val = db.query(`SELECT * FROM restaurants`)
//                 .then(data => data.rows[0]);

// const Story = document.querySelector('#approvedList');
// let page = 1, records = 16, totalCount = 0, search = '';

const renderPagination = (page, records, totalCount) => {
  $('.page-item-numbers').remove();

  let pagesNumbers = Math.ceil(totalCount / records);

  for (let i = 1; i <= pagesNumbers; i++) {
    // if (i === 2) {
      $(`.pagination > li:nth-child(${i})`).after(`<li class="page-item page-item-numbers ${i == page ? 'active': ''}" ><a class="page-link" href="/menus">${i}</a></li>`);
    // }
    // $(`.pagination > li:nth-child(${i})`).after(`<li class="page-item page-item-numbers ${i == page ? 'active': ''}" ><a class="page-link" href="/menus?page=${i}">${i}</a></li>`);
  }
};

// // Store Each menu Added to cart in LocalStorage
// const menuStorage = {};

// FETCH MENU ADDED TO CART
const fetchOrderMenu = (data) => {
  const $tableBody = $('tbody');

  for (const id in data) {
    const $menu = $(
      `
      <tr>
          <td>${data[id].name}</td>
          <td>
            <div class="dropdown-menu" id="dropdown-menu-order">
              <select class="cart-select" onchange="replaceSelection()">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </td>
          <td class="unitPrice">$${data[id].price}</td>
          <td>
              <div class="form-group mb-2">
                <button class="btn delete-menu-item" data-id="${id}">Delete</button>
              </div>
          </td>
        </tr>
      `
    );

    // SET QUANTITY SELECTED ON MENU PAGE AS SELECTED
    $menu.find(`.cart-select option[value='${Number(data[id].quantity)}']`).attr("selected","selected");

    $menu.appendTo($tableBody);
  }

  fetchOrderTotal();

};

// Change Cart Quantity as Well
const updateCartQuantity = () => {
  let newQuantity = 0;
  for (tr of $('tbody tr')) {
    console.log($(tr).find('.cart-select').val());
    newQuantity += Number($(tr).find('.cart-select').val());
  }

  // Set new Cart Quantity
  sessionStorage.setItem('cartQuantity', newQuantity);
};

const fetchOrderTotal = () => {
  let totalAmount= 0;

  const $tableRows = $('tbody tr');

  for (const $tr of $tableRows) {
    const $quantity = $($tr).find('select').val();
    const $unitPrice = $($tr).find('.unitPrice').text().replace('$', '');

    totalAmount += $quantity * $unitPrice;
  }
  const $totalTag = $(`<tr class='total'>
    <td colspan="2" class="total-label">Total:</td>
    <td colspan="2" class="total-price">$${totalAmount.toFixed(2)}</td>
  </tr>`);

  $totalTag.appendTo($('tfoot'));
};

const fetchData = (page, records, totalCount, data) => {
  // let page = 1, records = 16, totalCount = 0;

    const $menusList = $('.row-main');
    // const $address = $('.address-block');
    $menusList.empty();
    // $address.empty();
    // renderPagination(page, totalCount, records);
    renderPagination(page, records, totalCount);


    // ENSURE CART QUANTITY IS UNCHANGED

    // $address.text(`${value.address}<br>${value.city}, ${value.province} ${value.postal_code}`);

    for(const menu of data.slice((page - 1) * records, page * records)) {

      const $menuItem = $(`
          <div class="row">
            <div class="column">
              <a class="food-photo" href="menus/${menu.id}"><img src="${menu.imgurl}" alt="${menu.category}"></a>
              <div class="namePrice">
                <h6>${menu.name}</h6>
                <span>$${menu.price}</span>
              </div>
              <form class="food-details" method="POST" action="/cart">
                <input type="hidden" name="menuId" value="${menu.id}">
                <div class="food-quantity">
                  <div class="quantity">Quantity:</div>
                  <div class="dropdown-menu">
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                  </div>
                  </div>
                  <button class="order-button" type="submit">
                    <!--<a class="register-login order" href="/order"> -->
                    Order
                    <!-- </a> -->
                  </button>
              </form>
            </div>
          </div>`);

      $menuItem.appendTo($menusList);

    }
};

// let prevVal = $('.cart-select').val();
const replaceSelection = () => {
  for (tr of $('tbody tr')) {

    let selectedVal = $(tr).find('.cart-select').val();

    $(tr).find('.cart-select > option').each(function(i, item) {
      // if(item.value === prevVal) {
        $(item).removeAttr("selected");
      // }
    })

    $(tr).find('.cart-select > option').each(function(i, item) {
      if(item.value === selectedVal) {
        $(item).attr("selected", "true");
        prevVal = $(item).val();
      }
    })
  }

};

const fetchCategory = (category) => {
  const $menuCat = $('.menu-category');

  for (const c of category) {
    const $catItem = $(`
        <a class="cat-item" href="#"><span id=${c.toLowerCase().split(" ").join("-")}><li>${c}</li></span></a>`)
    ;

    $catItem.appendTo($menuCat);
  }
};



$(() => {


  $('select').on('change', (e) => {
    $(e.target).attr('selected', 'selected');
  });

  $.ajax({
    method: 'GET',
    url: '/api/menus'
  })
  .then((response) => {
    const totalCount = response.result;


    const data = response.menus;
    // const firstPageData = response.menus.slice(0,15);

    const dataCategory = [];

    for (const d of data) {
      let newCat = d.category.split("-").map(el => el[0].toUpperCase() + el.slice(1)).join(" ");
      if (!dataCategory.includes(newCat)) {
        dataCategory.push(newCat);
      }
    }
    fetchCategory(dataCategory);

    let page = 1, records = 16;

    // Set Cart Quantity Back to Original Value
    // $('.cart-quantity').text(localStorage.getItem('cartQuantity'));
    $('.cart-quantity').text(sessionStorage.getItem('cartQuantity'));

    // Load Data to Page
    fetchData(page, records, totalCount, data);

    $('.page-item-numbers a').on('click', function() {
      // console.log($(this).text());
      $('.page-item-numbers.active').removeClass('active');
      $(this).parent().addClass('active');
      page = Number($(this)[0].text);
      // sessionStorage.setItem('test', $(this));

      // for (li of $(this).parent().parent().find('.page-item-numbers')) {
      //   $(li).removeClass('active');
      // }$('.page-item-numbers.active')
      // console.log($(this));
      fetchData(page, records, totalCount, data);
      // console.log(page);
      // console.log($(this));
    });

    // Previous Page
    $('[aria-label="Previous"]').click(function() {
      if (page > 1) {
        page--;
      }
      fetchData(page, records, totalCount, data);
    });

    // Next page
    $('[aria-label="Next"]').click(function() {
      if (page * records < totalCount) {
        page++;
      }
      fetchData(page, records, totalCount, data);
    });


    // Menu Category Shows only menu in that category
    // $(document).on('click', 'a.cat-item', () => {
      //   // console.log('Yay')
      //   const $catName = $(this).children('span').attr('id');
      //   console.log($catName);

      //   // const catData = data.filter(element => element.category === $catName);

      //   // totalCounts = catData.length;
      //   // fetchData(page, records, totalCount, catData)
      // });

      // CHECK IF USER IS LOGGED IN
    if ($('.welcome-msg')) {  // User is logged in if element is present

      // ORDER BUTTON
      $('.order-button').click((e) => {
        e.preventDefault();

        // console.log('cookie is:', $.cookie());
        // console.log($(window.cookie === ''));

        // console.log($(this.element).closest('.column').find('h6'));
        const mainColumn = $(e.target).closest('.column');

        const mainForm = $(mainColumn).find('form');

        const productName = $(mainColumn).find('.namePrice').children('h6').text();
        const productPrice = $(mainColumn).find('.namePrice').children('span').text().replace('$', '');
        const menuId = $(mainForm).children('input').val();

        const quantity = $(mainForm).children('.food-quantity').children('.dropdown-menu').children('select').val();
        console.log(quantity)


        // GET THE ALREADY STORED VALUES
        // console.log(Object.keys(JSON.parse(sessionStorage.getItem('menus'))).length);
        if (!sessionStorage.getItem('menus') || !JSON.parse(sessionStorage.getItem('menus'))) {
          // ADD THE NEW MENU TO IT
          const menuStorage = {};

          menuStorage[menuId] = {
            id: menuId,
            name: productName,
            quantity,
            price: productPrice
          };
          // menuStorage = JSON.parse(sessionStorage.getItem('menus'));


          sessionStorage.setItem('menus', JSON.stringify(menuStorage));
        }
        const menuStorage = JSON.parse(sessionStorage.getItem('menus'));

        // if(menuStorage[menuId]) {
        //   menuStorage[menuId].quantity = Number(menuStorage[menuId].quantity) + Number(quantity);
        //   // console.log(menuStorage[menuId])

        //   sessionStorage.setItem('menus', JSON.stringify(menuStorage));
        // }

        menuStorage[menuId] = {
          id: menuId,
          name: productName,
          quantity,
          price: productPrice
        };


        // Ensure Cart Quantity is Correct through different pages
        if ($('.cart-quantity').text() === '') {
          $('.cart-quantity').text(quantity);
        } else {
          $('.cart-quantity').text(Number(quantity) + Number($('.cart-quantity').text()));
        }
        // NEED TO ADD EACH MENU ON ORDER TO LOCAL STORAGE
        // DISPLAY TO CART WHEN CART IS OPENED
        // localStorage.setItem('menus', JSON.stringify(menuStorage));
        // localStorage.setItem('cartQuantity', $('.cart-quantity').text());
        sessionStorage.setItem('menus', JSON.stringify(menuStorage));
        sessionStorage.setItem('cartQuantity', $('.cart-quantity').text());

        // console.log(localStorage)

      });
      // localStorage.removeItem('cartQuantity');
    }

    // LOGIN / REGISTER FORM
    $(".btn-primary").on('click', () => {
      $('reset')[0].reset();
    });

    // LOAD MENU FOR A ORDER
    $.ajax({
      method: 'GET',
      url: '/cart'
    })
    .then(() => {

      // const $orderData = JSON.parse(localStorage.getItem('menus'));
      // const $cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
      const $orderData = JSON.parse(sessionStorage.getItem('menus'));
      const $cartQuantity = JSON.parse(sessionStorage.getItem('cartQuantity'));
      // Check if Cart is Empty
      // if (localStorage.length === 0) {
      if (!JSON.parse(sessionStorage.getItem('menus'))) {
        const $pTag = $(`<p>`).text('Your Cart is Empty');

        $('table').remove();
        $('.place-order').remove();
        $pTag.appendTo($('.main-order'));
      }

      // TABLE ELEMENT
      // Set Cart Quantity
      $('.cart-quantity').text($cartQuantity);

      fetchOrderMenu($orderData);
      // fetchOrderTotal();

      // Check if Quantity is adjusted
      $('.cart-select').on('change', (e) => {
        const $menuId = $(e.target).parent().parent().next().next().find('button').attr('data-id');

        const sessionMenu = JSON.parse(sessionStorage.getItem('menus'));

        // Change Quantity of menu in Session Storage
        sessionMenu[$menuId].quantity = $(e.target).val();

        sessionStorage.setItem('menus', JSON.stringify(sessionMenu));

        updateCartQuantity();

        // Remove the Old Total Row
        $('.total').remove();

        fetchOrderTotal();
      })

      // On clicking menu button
      $('.menu-button').on('click', () => {
        updateCartQuantity();
      });

      // Clicking the Delete Button Should Delete the item
      $('.delete-menu-item').on('click', (e) => {
        const menuId = $(e.target).attr('data-id');

        const sessionMenu = JSON.parse(sessionStorage.getItem('menus'));

        // Delete the item from the session menu
        delete sessionMenu[menuId];

        console.log('Menu', sessionMenu);
        sessionStorage.setItem('menus', JSON.stringify(sessionMenu));
        // fetchOrderMenu(sessionMenu);
        if (Object.keys(sessionMenu).length > 0) {
          $('tbody').empty();
          $('tfoot').empty()
          fetchOrderMenu(sessionMenu);
          updateCartQuantity();
          location.reload();
        } else {
          const $pTag = $(`<p>`).text('Your Cart is Empty');

          $('table').remove();
          $('.place-order').remove();
          $pTag.appendTo($('.main-order'));
          updateCartQuantity();
        }

      });
    })
    .catch(err => console.log(err));


  })
  .catch(err => {
    console.log('error in getting menus');
  });

});



