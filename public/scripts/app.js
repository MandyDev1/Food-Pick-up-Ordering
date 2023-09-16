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
    $(`.pagination > li:nth-child(${i})`).after(`<li class="page-item page-item-numbers ${i == page ? 'active': ''}" ><a class="page-link" href="/menus">${i}</a></li>`);
  }
};

const fetchData = (page, records, totalCount, data) => {
  // let page = 1, records = 16, totalCount = 0;

    const $menusList = $('.row-main');
    // const $address = $('.address-block');
    $menusList.empty();
    // $address.empty();
    // renderPagination(page, totalCount, records);
    renderPagination(page, records, totalCount);

    // $address.text(`${value.address}<br>${value.city}, ${value.province} ${value.postal_code}`);

    for(const menu of data.slice((page - 1) * records, page * records)) {

      const $menuItem = $(`
          <div class="row">
          <div class="column">
          <h6>${menu.name}</h6>
              <a class="food-photo" href="#"><img src="${menu.imgurl}" alt="${menu.category}"></a>
              <form class="food-details" method="POST" action="/cart">
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

    let page = 1, records = 15;


    // Load Data to Page
    fetchData(page, records, totalCount, data);

    $(document).on('click', '.page-item-numbers a', function() {
      // console.log($(this).text());
      // $('.active').removeClass('active');
      // $(this).addClass('active');
      page = Number($(this)[0].text);
      // console.log($(this));
      fetchData(page, records, totalCount, data);
      // console.log(page);
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



    // ORDER BUTTON
    $('.order-button').click((e) => {
      e.preventDefault();

      console.log('cookie is:', $.cookie('user_id'));

      // console.log($(this.element).closest('.column').find('h6'));
      const mainColumn = $(e.target).closest('.column');
      const mainForm = mainColumn.children('form');

      const productName = mainColumn.children('h6');

      const quantity = mainForm.children('.food-quantity').children('.dropdown-menu').children('select').val();

      if ($('.cart-quantity').text() === '') {
        $('.cart-quantity').text(quantity);
      } else {
        $('.cart-quantity').text(Number(quantity) + Number($('.cart-quantity').text()));
      }

      // NEED TO ADD EACH MENU ON ORDER TO LOCAL STORAGE
      // DISPLAY TO CART WHEN CART IS OPENED
    });


  })
  .catch(err => {
    console.log('error in getting menus');
  });

});



