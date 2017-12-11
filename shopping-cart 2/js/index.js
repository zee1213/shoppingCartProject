var removedItem,
    sum = 0;

$(function(){
  calculatePrices();

  $(document).on("click", "a.remove", function() {
      removeItem.apply(this);
  });
  

  $(document).on("click", ".removeAlert a", function(){    
    
    addItemBackIn();
    
    hideRemoveAlert();
  });
  
  $(document).on("change", "input.quantity", function(){
    var val = $(this).val(),
        pricePer,
        total
    
    if ( val <= "0") {
      removeItem.apply(this);
    } else {
      
      sum = 0;
      
      pricePer = $(this).parents("td").prev("td").text();
     
      pricePer = formatNum(pricePer);
     
      total = parseFloat(val * pricePer).toFixed(2);
      
      $(this).parents("td").siblings(".itemTotal").text("$" + total);
      
     
      calculatePrices();
    }
  });
  
});


function removeItem() {
 
  removedItem = $(this).closest("tr").clone();
  
  $(this).closest("tr").fadeOut(500, function() {
    $(this).remove();
    sum = 0;
    calculatePrices();
  });
 
  $(".removeAlert").fadeIn();
  
  
  setTimeout(function(){
    hideRemoveAlert();
  }, 5000); 
}

function hideRemoveAlert() {
  $(".removeAlert").fadeOut(500);
}

function addItemBackIn() {
  sum = 0;
  $(removedItem).prependTo("table.items tbody").hide().fadeIn(500) 
  calculatePrices();
}

function updateSubTotal(){
  $("table.items td.itemTotal").each(function(){
    var value = $(this).text();
   
    value = formatNum(value);

    sum += parseFloat(value);
    $("table.pricing td.subtotal").text("$" + sum.toFixed(2));
  });
}

function addTax() {
  var tax = parseFloat(sum * 0.05).toFixed(2);
  $("table.pricing td.tax").text("$" + tax);
}

function calculateTotal() {
  var subtotal = $("table.pricing td.subtotal").text(),
      tax = $("table.pricing td.tax").text(),
      shipping = $("table.pricing td.shipping").text(),
      total;
  
  subtotal = formatNum(subtotal);
  tax = formatNum(tax);
  shipping = formatNum(shipping);
   
  total = (subtotal + tax + shipping).toFixed(2);
  
  $("table.pricing td.orderTotal").text("$" + total);
}

function calculatePrices() {
  updateSubTotal();
  addTax();
  calculateTotal();
}

function formatNum(num) {
  return parseFloat(num.replace(/[^0-9-.]/g, ''));
}