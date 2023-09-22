$(() => {

  // Change Status of Orders
  $('.order-accept-button').on('click', (e) => {
    e.preventDefault();

    const orderId = $(e.target).attr('data-id-accept');
    const currentOrderStatus = $(e.target).text();

    if (currentOrderStatus === 'Accept') {
      $(e.target).text('In Progress');
    }

    if (currentOrderStatus === 'In Progress') {
      $(e.target).text('Ready for PickUp');
    }

    if (currentOrderStatus === 'Ready for PickUp') {
      $(e.target).text('Order Completed');
    }

    const orderStatus = $(e.target).text();

    $.ajax({
      type: 'POST',
        url: '/restaurants/orders/:id',
        data: { orderId, orderStatus },
        success: (response) => {
          console.log('Server response');

        },
        error: (err) => {
          console.error("Error:", err);
        }
    })

    if (orderStatus === 'Order Completed') {
      // $(e.target).remove();
      $(e.target).attr('disabled', 'disabled');
    }


    $(location).attr('href', '/restaurants/orders/:id')
  });
});
