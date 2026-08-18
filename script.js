/* ================================
   FOOD DATA
================================ */

const restaurants = {

    pizza: {
        name: "Pizza Palace 🍕",

        foods: [
            {
                name: "Margherita Pizza",
                price: 249,
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Pepperoni Pizza",
                price: 349,
                image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Veg Pizza",
                price: 299,
                image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Cheese Burst Pizza",
                price: 329,
                image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=500&q=80"
            }
        ]
    },


    burger: {
        name: "Burger House 🍔",

        foods: [
            {
                name: "Classic Burger",
                price: 199,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Cheese Burger",
                price: 249,
                image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Double Burger",
                price: 299,
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "French Fries",
                price: 129,
                image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80"
            }
        ]
    },


    biryani: {
        name: "Royal Biryani 🍛",

        foods: [
            {
                name: "Chicken Biryani",
                price: 299,
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Mutton Biryani",
                price: 399,
                image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Paneer Biryani",
                price: 249,
                image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=500&q=80"
            },

            {
                name: "Chicken 65",
                price: 229,
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80"
            }
        ]
    }
};


/* ================================
   VARIABLES
================================ */

let currentRestaurant = null;

let cart = [];


/* ================================
   SELECT RESTAURANT
================================ */

function selectRestaurant(type) {

    currentRestaurant = restaurants[type];

    document.getElementById("menuTitle").innerText =
        currentRestaurant.name + " Menu";

    displayFoods(currentRestaurant.foods);

    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });

}


/* ================================
   DISPLAY FOOD
================================ */

function displayFoods(foods) {

    const foodList =
        document.getElementById("foodList");

    foodList.innerHTML = "";


    if (foods.length === 0) {

        foodList.innerHTML =
            '<p class="select-message">No food found 😢</p>';

        return;
    }


    foods.forEach(function(food, index) {

        const div = document.createElement("div");

        div.className = "food";

        div.innerHTML = `

            <img src="${food.image}" alt="${food.name}">

            <div class="food-content">

                <h3>${food.name}</h3>

                <p>
                    Delicious and freshly prepared.
                </p>

                <span class="price">
                    ₹${food.price}
                </span>

                <button onclick="addToCart(${index})">
                    Add to Cart 🛒
                </button>

            </div>
        `;

        foodList.appendChild(div);

    });

}


/* ================================
   ADD TO CART
================================ */

function addToCart(index) {

    if (!currentRestaurant) {

        alert("Please select a restaurant first.");

        return;
    }


    const food =
        currentRestaurant.foods[index];


    const existing =
        cart.find(function(item) {

            return item.name === food.name;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: food.name,

            price: food.price,

            image: food.image,

            quantity: 1

        });

    }


    updateCart();

    alert(food.name + " added to cart! 🛒");

}


/* ================================
   UPDATE CART
================================ */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const totalElement =
        document.getElementById("total");


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                padding:40px;
                color:#777;
            ">
                Your cart is empty 🛒
            </p>
        `;

    }


    cart.forEach(function(item, index) {

        total +=
            item.price * item.quantity;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img src="${item.image}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price * item.quantity}
                </p>

                <div class="quantity">

                    <button onclick="changeQuantity(${index}, -1)">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove"
                onclick="removeItem(${index})"
            >
                🗑️
            </button>

        `;


        cartItems.appendChild(div);

    });


    cartCount.innerText = count;

    totalElement.innerText = total;

}


/* ================================
   CHANGE QUANTITY
================================ */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* ================================
   REMOVE ITEM
================================ */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================================
   OPEN CART
================================ */

function openCart() {

    document
        .getElementById("cartBox")
        .classList.add("show");

}


/* ================================
   CLOSE CART
================================ */

function closeCart() {

    document
        .getElementById("cartBox")
        .classList.remove("show");

}


/* ================================
   PLACE ORDER
================================ */

function placeOrder() {

    if (cart.length === 0) {

        alert("Please add food to the cart first! 🍔");

        return;
    }


    closeCart();


    document
        .getElementById("successBox")
        .classList.add("show");

}


/* ================================
   CLOSE SUCCESS MESSAGE
================================ */

function closeSuccess() {

    document
        .getElementById("successBox")
        .classList.remove("show");


    cart = [];

    updateCart();

}


/* ================================
   SEARCH FOOD
================================ */

function searchFood() {

    if (!currentRestaurant) {

        return;
    }


    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const filtered =
        currentRestaurant.foods.filter(function(food) {

            return food.name
                .toLowerCase()
                .includes(search);

        });


    displayFoods(filtered);

}


/* ================================
   GO TO RESTAURANTS
================================ */

function goToRestaurants() {

    document
        .getElementById("restaurants")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================================
   INITIAL CART
================================ */

updateCart();