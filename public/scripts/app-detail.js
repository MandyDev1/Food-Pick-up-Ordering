
const menuItemId = window.location.pathname.split('/').pop();  // Get the menu item ID from the URL
console.log(menuItemId);

const fetchData = (data) => {
  const $menusList = $('.menu-details');
  $menusList.empty();

  for(const menu of data) {
  const $menuItem = $(`

      <h5>${menu.name}</h5>
      <div class="food-photo"><img src="${menu.imgurl}" alt="${menu.category}"></div>
      <div class="food-photo">${menu.description}</div>
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
                <div class="quantity">Price ${menu.price}</div>
                <button class="order-button" type="submit">
                  <!--<a class="register-login order" href="/order"> -->
                  Order
                  <!-- </a> -->
                </button>
            </form>
   

  `);
    $menuItem.appendTo($menusList);
  }
};


$(() => {

  $.ajax({
    method: 'GET',
    url: `/api/menu/${menuItemId}`  // Fetch menu details for the specific item
  })
  .then((response) => {
    const data = response.menus.rows;
    console.log(data);

    fetchData(data);
  })
  .catch(err => {
    console.log('Error fetching menu details:', err);
  });

});
