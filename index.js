console.log("Getting nearest open restaurants");

const getRestaurantData = async () => {
  console.log("Processing...");
  const request = await fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=60607&open_now=true", {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Max-Age': '8640',
      'Vary': 'Origin',
      'Authorization': 'Bearer', // get API key from YELP
    }
});
  const data = await request.json();
  return data;
};

getRestaurantData().then((res) => {
  if (res && res.businesses) {
    res.businesses.forEach(({name, rating, price, distance}) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = "row";

      const colDiv = document.createElement('div');
      rowDiv.appendChild(colDiv);

      const cardOuterDiv = document.createElement('div');
      cardOuterDiv.className = "card blue-grey darken-1";
      colDiv.appendChild(cardOuterDiv);

      const cardInnerDiv = document.createElement('div');
      cardInnerDiv.className = "card-content white-text";
      cardOuterDiv.appendChild(cardInnerDiv);

      const span = document.createElement('span');
      span.className = 'card-title';
      span.innerHTML = name;
      cardInnerDiv.appendChild(span);

      const priceRes = document.createElement('p');
      priceRes.innerHTML = price;
      cardInnerDiv.appendChild(priceRes);

      const ratingRes = document.createElement('p');
      ratingRes.innerHTML = rating;
      cardInnerDiv.appendChild(ratingRes);

      const distanceRes = document.createElement('p');
      distanceRes.innerHTML = distance;
      cardInnerDiv.appendChild(distanceRes);

      const cardBody = document.getElementById('card-body');
      cardBody.appendChild(rowDiv);
    });
  }
});

