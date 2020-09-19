
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("the home page is running ....")
});

module.exports = router;