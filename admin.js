
document.getElementById('add_product_btn').addEventListener('click', function () {
    var productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
});


document.getElementById('upload_form').addEventListener('submit', function (e) {
    e.preventDefault();


    var productName = document.getElementById('product_name').value;
    var productDes = document.getElementById('product_description').value;
    var productColor = document.getElementById('product_color').value;
    var productSize = document.getElementById('product_size').value;
    var productPrice = document.getElementById('product_price').value;
    var productRating = document.getElementById('product_rating').value;
    var imageInput = document.getElementById('image_input').files[0];


    if (!imageInput) {
        alert('Please select an image');
        return;
    }

 
    var formData = new FormData();
    formData.append('image', imageInput);

    // Upload the image to imgbb
    fetch('https://api.imgbb.com/1/upload?key=add07eb16060304e9d624f9962001708', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            var imageUrl = data.data.url;

            var productData = {
                name: productName,
                description: productDes,
                color: productColor,
                size : productSize,
                price: productPrice,
                rating: productRating,
                image_url: imageUrl
            };

            console.log('Product Data:', productData);
            const token = localStorage.getItem("token");
            fetch('https://cloth-store-backend-api.vercel.app/shop/product/', {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                alert("Post Successfully Completed");

           
            

        
                var productModal = new bootstrap.Modal(document.getElementById('productModal'));
                productModal.hide();
                document.getElementById('upload_form').reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.log('Image upload failed:', data.error);
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
});

// #==============================================================







