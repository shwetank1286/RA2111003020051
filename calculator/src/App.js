const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const WINDOW_SIZE = 10;
let storedNumbers = [];

const fetchNumbers = async (numberType) => {
    try {
        const response = await axios.get(`http://testserver/api/${numberType}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching numbers:', error);
        return [];
    }
};

const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    let beforeNumbers = [...storedNumbers];
    let afterNumbers = [...storedNumbers];

    let fetchedNumbers = await fetchNumbers(numberId);

    if (fetchedNumbers.length > 0) {
        fetchedNumbers = fetchedNumbers.filter((num) => !storedNumbers.includes(num));
        storedNumbers = [...storedNumbers, ...fetchedNumbers].slice(-WINDOW_SIZE);
        afterNumbers = [...storedNumbers];
    }

    const average = storedNumbers.length >= WINDOW_SIZE ? calculateAverage(storedNumbers) : null;

    res.json({
        beforeNumbers,
        afterNumbers,
        average
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
