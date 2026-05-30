const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
 //   this.category = category;
 //   this.path = `../json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(`${baseURL}/products/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}/product/${id}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }

}
