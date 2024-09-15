import express from 'express';

const app = express();

app.get('/api/products', (req, res) => {
  const products =[ 
    {
      id:1,
      name: 'Tiger',
      price: 100,
      image: 'https://www.pexels.com/photo/close-up-photography-of-tiger-792381/'
    },
    {
      id:2,
      name: 'cheetah',
      price: 110,
      image: 'https://www.pexels.com/photo/cheetah-on-top-of-brown-tree-branch-2274018/'
    },
    {
      id: 3,
      name: 'Lion',
      price: 120,
      image: 'https://www.pexels.com/photo/close-up-photo-of-lion-s-head-2220336/'
    }
  ];
 
  //https://localhost:3000/api/products?search=Lion
  //? = query parameter
  //REST = representational state transfer

  if(req.query.search){
    const filterProducts =  products.filter(product => product.name.includes(req.query.search));
    res.send(filterProducts);
    return; //it is nessecary to return here to prevent from application crashing , becsuse we have to leave after response send

  }

   setTimeout(() => {
     res.send(products);
   }, 3000);



})

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if(err){
    console.log('Error starting server:', err);
  }
  else
    console.log(`Server is running on port ${port}`);
});
