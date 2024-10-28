// Show modal on "Check to Proceed" button click
const load_cart = () => {
    const container = document.getElementById("add_cart");
    container.innerHTML = ""; 
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    let totalQuantity = 0;

    const table = document.createElement("table");

    table.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tableBody = table.querySelector("tbody");

    cart.forEach((product, index) => {
        const productQuantity = product.quantity || 1;
        const totalProductPrice = parseFloat(product.price) * (product.quantity || 1);
        totalPrice += totalProductPrice;
        totalQuantity += productQuantity; 

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${product.image_url}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity || 1}</td>
            <td>$${totalProductPrice.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    container.appendChild(table);
    localStorage.setItem("totalQuantity", totalQuantity);
    localStorage.setItem("totalamount", totalPrice);

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("row", "mt-4");

    totalDiv.innerHTML = `
        <div class="col-12 d-flex justify-content-end align-items-center gap-3">
            <div class="text-end">
                <h3 class="text-danger fw-bold border border-danger p-3">Total Price: $${totalPrice.toFixed(2)}</h3>
            </div>
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#checkoutModal">Check to Proceed</button>
        </div>
    `;

    container.appendChild(totalDiv);

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            removeFromCart(index);
            container.innerHTML = "";
            load_cart(); 
        });
    });
};

// Function to handle form submission in the modal
const checkoutForm = document.getElementById("checkoutForm");
checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get user data from the form
    const userDetails = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value
    };

    // Store user details in localStorage or pass it to the backend as needed
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Close the modal and redirect to a checkout page
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
    checkoutModal.hide();
    window.location.href = "makepayment.html"; // Redirect to checkout page
});

// Define removeFromCart function as before
const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
};

window.onload = load_cart;
