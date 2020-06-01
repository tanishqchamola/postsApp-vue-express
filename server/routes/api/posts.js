const express = require('express');

const router = express.Router();
const Item = require('../../models/Items');

// Get posts
router.get('/', (req, res) => {
    Item.find({})
        .then((items) => {
            res.json(items);
        })
        .catch(err => console.log(err));
});

// Add posts
router.post('/', (req, res) => {
    const {
        title,
        author,
        content
    } = req.body;

    const newItem = new Item({
        title,
        author,
        content
    });

    newItem.save()
        .then(() => console.log('New item added successfully...'))
        .catch(err => console.log(err));

    res.status(201).send();
});

// Delete posts
router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err) => console.log(err));
    console.log('Item deleted successfully...')

    res.status(200).send();
});

module.exports = router;