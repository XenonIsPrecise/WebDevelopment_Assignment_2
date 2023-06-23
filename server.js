const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/productsModel');
const Category = require('./models/categoriesModel');

app.use(express.json());

//routes
mongoose.connect('mongodb+srv://sujalacharya567:hahaha123@assignment2.kot4riu.mongodb.net/DressStore?retryWrites=true&w=majority')
.then(() =>{
    console.log('Connected to MongoDB...')
    app.listen(3000, () =>
     {console.log('Server running on port 3000...')})
})
.catch(err => console.error('Could not connect to MongoDB...'));

app.get('/', (req, res) => {
    res.json('{"message":Welcome to DressStore Application}');
});

// app.post('/products', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// });

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
});

app.post('/categories', async(req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
});

app.get('/products/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
});

app.get('/categories/:id', async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.put('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, published, category } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, published, category },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });


  //Deleting a product by id
  app.delete('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

//   find the product name which name contains 'kw'

app.get('/products/search/:keyword', async (req, res) => {
    try {
      const { keyword } = req.params;
  
      const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  





app.get('/blog', function (req, res) {
    res.send('We are on blog and we are using nodemon');
  })
  
  