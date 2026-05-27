const baseURL = import.meta.env.VITE_SERVER_URL
//week 3 ^^^

async function convertToJson(res) {
  let jsonResponse = null;

  try {
    jsonResponse = await res.json();
  } catch (e) {
  }

  if (res.ok) {
    return jsonResponse;
  }
  const message =
    jsonResponse?.message ||   
    jsonResponse ||            
    "Unknown server error";    

  throw {
    name: "servicesError",
    message: message,
  };
}

export default class ExternalServices {
  constructor(category) {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    //return fetch(this.path)
    //  .then(convertToJson)
    // .then((data) => data);
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) { //week 04
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }

}


