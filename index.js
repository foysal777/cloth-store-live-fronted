const load_product = (name) => {
    const token = localStorage.getItem('token');
    document.getElementById("card_contain").innerHTML = "";
    fetch(`https://cloth-store-backend-api.vercel.app/shop/product/?name=${name ? name : ""}`
        // , {

        //     method: 'GET',
        //     headers: {
        //         Authorization: `Token ${token}`,
        //         "Content-Type": "application/json",
        //     },
        // }

    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.length > 0) {

                document.getElementById("nodata").style.display = "none";
                document.getElementById("loading").style.display = "none";
                display_product(data);
            } else {

                document.getElementById("card_contain").innerHTML = "";
                document.getElementById("nodata").style.display = "block";
                document.getElementById("loading").style.display = "none";
            }
        }
        )
};

const load_product2 = (color) => {
    console.log(color);
    const token = localStorage.getItem('token');
    console.log(token);
    document.getElementById("card_contain").innerHTML = "";
    fetch(`https://cloth-store-backend-api.vercel.app/shop/product/?color=${color ? color : ""

        }`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.length > 0) {

                document.getElementById("nodata").style.display = "none";
                document.getElementById("loading").style.display = "none";
                display_product(data);
            } else {

                document.getElementById("card_contain").innerHTML = "";
                document.getElementById("nodata").style.display = "block";
                document.getElementById("loading").style.display = "none";
            }
        }
        )
};




const display_product = (products) => {
    const token = localStorage.getItem('token');
    console.log(products)
    products.forEach((product) => {
        console.log(product)
        const parent = document.getElementById("card_contain");
        const div = document.createElement("div");

        div.innerHTML = `
            <div id="card container" class="card container border border-0" style="width: 18rem;"> 
                <img src="${product.image_url}" class="dyimg" alt="...">
                <div class="card-body">
                    <div>
                        <h3 class="flex-grow-1 h5"> ${product.name}</h3>
                        <h3 class="flex-grow-1 h5 text-danger"> Rating : ${product.rating} star</h3>
                        <h5 class=" text-primary">Color : ${product.color}</h5>
                       <p class="">${product.price} $</p>
                    </div>
                    <div class="button d-flex">  
                        ${token ? `<a href="product_details.html?productId=${product.id}" class="btn btn-success btn-sm">Details</a>` : ''}
                        <a href="wishlist.html" class="add-to-wishlist">
                            <img src="images/heart2.png" alt="Wishlist" height="40px" width="40px">
                        </a> 
                    </div>
                </div>
            </div>
        `;
        parent.appendChild(div);

        div.querySelector('.add-to-wishlist').addEventListener('click', (e) => {
            e.preventDefault();
            addToWishlist(product);
        });
    });
};


// add show product





// wishlist 

const addToWishlist = (product) => {
    fetch('https://cloth-store-backend-api.vercel.app/shop/wishlist/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product.id }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            window.location.href = "wishlist.html";
            alert('Product added to wishlist');
        })
        .catch(error => {
            console.error('Error adding product to wishlist:', error);
            alert('Error , Adding product to wishlist');
        });
};

const removeFromWishlist = (productId) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(product => product.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.location.reload();
    alert('Product Removed from wishlist');
};

document.addEventListener('DOMContentLoaded', () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-container');

    wishlist.forEach(product => {
        const li = document.createElement('li');
        console.log(li);
        li.classList.add('wishlist-item');

        li.innerHTML = `
            <div class="review_card ">
                <img class="review_img" src="${product.image_url}" alt="not found"> <br><br>
                  <p class = "text-danger" >Rating : ${product.rating} star</p>
                <small class="text-success"> Product Name :  ${product.name}</small>
                <p> $${product.price}</p>
              
                <p class = "text-danger" > ${product.color}</p>
                <div class="d-flex gap-3">
                    <button class="btn btn-danger btn-sm">Favourite</button>
                    <button class="btn btn-secondary btn-sm" onclick="removeFromWishlist(${product.id})">Remove</button>
                </div>
            </div>
        `;

        wishlistContainer.appendChild(li);
    });
});






const handle_search = () => {
    const value = document.getElementById("search").value;

    load_product(value);
}
const token = localStorage.getItem('token');
const loadColor = () => {
    fetch("https://cloth-store-backend-api.vercel.app/shop/product/?color"



    )
        .then((res) => res.json())
        .then((data) => {


            console.log(data)
            data.forEach((item) => {
                const parent = document.getElementById("color_id");
                const li = document.createElement("li");
                li.classList.add("dropdown-item");
                li.innerHTML = `
                 <li  onclick="load_product2('${item.color}')" >${item.color} </li>
                `
                parent.appendChild(li);
            });
        });
};

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Your message has been submitted!');
});


// sorting 


function handle_sort() {
    // Get all the cards in the container
    const container = document.getElementById('card_contain');
    const cards = Array.from(container.getElementsByClassName('card'));

    // Sort the cards by price 
    cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('p').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('p').textContent.replace('$', ''));
        return priceA - priceB;
    });

    // Clear the container
    container.innerHTML = '';

    // Append the sorted cards back into the container
    cards.forEach(card => container.appendChild(card));
}

// Attach the handle_sort function to the Sort button
document.querySelector('.sortt').addEventListener('click', handle_sort);




loadColor();

load_product();





