const express = require('express');
const router = express.Router();
const Animal = require('../models/animal.js');
const Caretaker = require('../models/caretaker');
const Food = require('../models/food');

// 1. Hiển thị những con vật không có người chăm sóc
router.get('/animals/uncared', async (req, res) => {
    try {
        const animals = await Animal.find({ caretakers: { $size: 0 } });
        res.json(animals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Hiển thị 5 người chăm sóc nhiều động vật nhất và hoạt động trong ít nhất 2 năm
router.get('/caretakers/top', async (req, res) => {
    try {
        const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
        const caretakers = await Caretaker.aggregate([
            { $match: { hireDate: { $lte: twoYearsAgo } } },
            { $project: { name: 1, animalCount: { $size: "$animals" } } },
            { $sort: { animalCount: -1 } },
            { $limit: 5 }
        ]);
        res.json(caretakers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Hiển thị những động vật sinh ra và lớn lên trong sở thú
router.get('/animals/born-in-zoo', async (req, res) => {
    try {
        const animals = await Animal.find({ birthDate: { $exists: true } });
        res.json(animals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Hiển thị những người đang chăm sóc thú trên 3 năm
router.get('/caretakers/long-term', async (req, res) => {
    try {
        const threeYearsAgo = new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000);
        const caretakers = await Caretaker.find({
            "animals.startDate": { $lte: threeYearsAgo },
            "animals.endDate": { $exists: false }
        });
        res.json(caretakers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ANIMALS
router.get('/animals', async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST for adding an animal
router.post('/animals', async (req, res) => {
    try {
        let savedAnimals;

        if (Array.isArray(req.body)) {
            // If the request body is an array, create multiple animals
            savedAnimals = await Animal.insertMany(req.body);
        } else {
            // If the request body is a single object, create one animal
            const newAnimal = new Animal(req.body);
            savedAnimals = await newAnimal.save();
        }

        res.status(201).json(savedAnimals);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET CARETAKERS
router.get(('/caretakers'), async (req, res) => {
    try {
        const caretakers = await Caretaker.find();
        res.json(caretakers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST for adding a caretaker
router.post('/caretakers', async (req, res) => {
    try {
        let savedCaretakers;

        if (Array.isArray(req.body)) {
            // If the request body is an array, create multiple caretakers
            savedCaretakers = await Caretaker.insertMany(req.body);
        } else {
            // If the request body is a single object, create one caretaker
            const newCaretaker = new Caretaker(req.body);
            savedCaretakers = await newCaretaker.save();
        }

        res.status(201).json(savedCaretakers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET FOOD
router.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST for adding food
router.post('/foods', async (req, res) => {
    try {
        let savedFoods;

        if (Array.isArray(req.body)) {
            // If the request body is an array, create multiple foods
            savedFoods = await Food.insertMany(req.body);
        } else {
            // If the request body is a single object, create one food
            const newFood = new Food(req.body);
            savedFoods = await newFood.save();
        }

        res.status(201).json(savedFoods);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT for updating an animal
router.put('/animals/:id', async (req, res) => {
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json(updatedAnimal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT for updating a caretaker
router.put('/caretakers/:id', async (req, res) => {
    try {
        const updatedCaretaker = await Caretaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCaretaker) {
            return res.status(404).json({ message: 'Caretaker not found' });
        }
        res.json(updatedCaretaker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;