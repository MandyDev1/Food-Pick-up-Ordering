
const menuItemId = window.location.pathname.split('/').pop();  // Get the menu item ID from the URL

$.ajax({
  method: 'GET',
  url: `/api/menu/${menuItemId}`  // Fetch menu details for the specific item
})
.then((response) => {
  const menuItem = response.menuItem;

  // Update the DOM to display menu details
  $('#menuName').text(menuItem.name);
  $('#menuDescription').text(menuItem.description);
  $('#menuPrice').text(`Price: $${menuItem.price.toFixed(2)}`);
})
.catch(err => {
  console.log('Error fetching menu details:', err);
});


