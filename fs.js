const fs = require('fs');

fs.readdir('./tmp', (eventType, filename) => {
    if (filename)
        console.log(filename);
});
