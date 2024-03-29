const express = require('express');

const app = express();

app.get('/api/signup', (req, res) => {
    res.json({
        data: 'you hit signup endoin yay'
    })
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}/`)
})

