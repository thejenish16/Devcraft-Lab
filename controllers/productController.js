const Product = require('../models/Product');

exports.create = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ msg: "Name and Price required" });
    }

    if (quantity && quantity < 0) {
      return res.status(400).json({ msg: "Quantity cannot be negative" });
    }

    const product = await Product.create({
      name,
      price,
      quantity: quantity || 0,
      category,
      userId: req.user.id
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    let filter = {
      isDeleted: false,
      userId: req.user.id
    };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }


    if (product.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }


    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await Product.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });

    res.json({ msg: "Product deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};