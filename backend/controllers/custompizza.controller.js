import CustomPizza from '../models/custompizza.model.js';
import Base from '../models/base.model.js';
import Sauce from '../models/sauce.model.js';
import Cheese from '../models/cheese.model.js';
import Vegetables from '../models/vegetables.model.js';
import Meats from '../models/meats.model.js';

export const createCustomPizza = async (req, res) => {
  try {
    const { userId, title, base, sauce, cheese, vegetables, meats } = req.body;

    // Validate if the base and sauce exist, and calculate their price
    const foundBase = await Base.findById(base);
    const foundSauce = await Sauce.findById(sauce);
    const foundCheese = cheese ? await Cheese.findById(cheese) : null;
    const foundVegetables = vegetables ? await Vegetables.findById(vegetables) : null;
    const foundMeats = meats ? await Meats.findById(meats) : null;

    if (!foundBase || !foundSauce) {
      return res.status(400).json({ message: 'Base or Sauce is invalid' });
    }
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    // Calculate total price based on the selected ingredients
    let totalPrice = foundBase.price + foundSauce.price;

    if (foundCheese) totalPrice += foundCheese.price;
    if (foundVegetables) totalPrice += foundVegetables.price;
    if (foundMeats) totalPrice += foundMeats.price;
 
        

    // Create the custom pizza after validation and price calculation
    const customPizza = new CustomPizza({
      userId :req.user.id,
      title,
      base,
      sauce,
      cheese,
      vegetables,
      meats,
      price: totalPrice,  
      slug,
    });

    await customPizza.save();
    res.status(201).json(customPizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
