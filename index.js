//npm start run dev  for launching project

const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const productPath = path.join(__dirname, "products.json");

const getAll = async() => {
  const dataString = await fs.readFile(productPath, 'utf8');
  const data = JSON.parse(dataString);
  return data;
}

const getById = async (id) => {
  const allProducts = await getAll();
  const product = allProducts.find(product => product.id === id);
  return product ? product : null;
}

const create = async (price, name) => {
  const newProduct = {
    id: uuid.v4(),
    price: price,
    name: name,
  }

  
}