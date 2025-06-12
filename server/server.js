const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Sử dụng express.json() thay vì body-parser

let tours = [
  { id: 1, name: "Tour Đà Lạt", description: "Khám phá Đà Lạt", price: 1500000 },
  { id: 2, name: "Tour Hà Nội", description: "Khám phá Hà Nội", price: 1200000 }
];

app.get('/api/tours', (req, res) => {
  res.status(200).json(tours);
});

app.post('/api/tours', (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Thiếu thông tin tour!' });
  }

  const newTour = {
    id: tours.length + 1,
    name,
    description,
    price
  };

  tours.push(newTour);

  res.status(201).json(newTour);
});

app.put('/api/tours/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const tourIndex = tours.findIndex(tour => tour.id === parseInt(id));

  if (tourIndex === -1) {
    return res.status(404).json({ message: 'Tour không tồn tại!' });
  }

  tours[tourIndex] = { id: parseInt(id), name, description, price };

  res.status(200).json(tours[tourIndex]);
});

app.delete('/api/tours/:id', (req, res) => {
  const { id } = req.params;

  const tourIndex = tours.findIndex(tour => tour.id === parseInt(id));

  if (tourIndex === -1) {
    return res.status(404).json({ message: 'Tour không tồn tại!' });
  }

  tours.splice(tourIndex, 1);

  res.status(200).json({ message: 'Xóa tour thành công!' });
});

app.listen(port, () => {
  console.log(`Server đang chạy trên http://localhost:${port}`);
});
