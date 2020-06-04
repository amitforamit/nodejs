const express = require('express');
const app = express();
const fs = require('fs');

const port = 3000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//console.log(tours);
app.use(express.json());
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
});
app.get('/api/v1/tour/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Invalid Id'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
});
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  //  let newTour = req.body;
  //  newTour.id = newID;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tours
        }
      });
    }
  );
});
app.listen(port, () => {
  console.log('app is running on port 3000');
});
