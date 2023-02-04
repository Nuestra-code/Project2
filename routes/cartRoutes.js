const express = require('express');
const router = express.Router();
const auth = require ('../auth');

//get cart items
router.get("/cart", auth, async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await findOne({ owner });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
});


export default router;