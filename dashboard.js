
  function toggleSidebar() {
    let sidebar = document.querySelector('.sidebar');
    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'block';
    } else {
      sidebar.style.display = 'none';
    }
  }

  // Bar chart using Chart.js
  var ctx = document.getElementById('barChart').getContext('2d');
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 10 
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });




// for html javascript 


// for order dyamically handle 
document.addEventListener("DOMContentLoaded" , ()=>{

     const totalorder = localStorage.getItem("totalQuantity");

    const ordercard =  document.querySelector(".card-orders h2")|| 0;

    ordercard.textContent = totalorder; 



});


// Total sales today 


document.addEventListener("DOMContentLoaded", ()=> {


    const totalsales = localStorage.getItem("totalamount") || 0;

    const salescard = document.querySelector(".card-sales h2");

    salescard.textContent = totalsales;

});


