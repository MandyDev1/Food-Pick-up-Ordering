// Client facing scripts here
const fetchData = (data) => {

  const $menusList = $('.row-main');

  $menusList.empty();

  for(const menu of data) {

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
$(() => {

$.ajax({
  method: 'GET',
  url: '/api/menu'
})
.then((response) => {

  const data = response.menus.rows;
  // const firstPageData = response.menus.slice(0,15);




  // Load Data to Page
  fetchData(data);
  })
  .catch(err => {
    console.log('error in getting menus');
  })
});
