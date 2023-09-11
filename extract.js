const fs = require('fs');
const https = require('https');

function extractUrl() {
    const links = [];
    const urls = [];

    fs.readFile('images.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const parsedData = JSON.parse(data);
                links.push(...parsedData.results);

                links.forEach(element => {
                    urls.push({
                        id: Math.floor(Math.random() * 10000),
                        url: element.urls.raw
                    });
                });

                // Create a directory to save the images
                dir=Math.floor(Math.random()*1000000000)
                if (!fs.existsSync(`downloaded_images${dir}`)) {
                    fs.mkdirSync(`downloaded_images${dir}`);
                }

                urls.forEach(urlObj => {
                    const imageName = `downloaded_images${dir}/${urlObj.id}.jpg`;
                    downloadImage(urlObj.url, imageName);
                });

            } catch (jsonError) {
                console.log('Error parsing JSON:', jsonError);
            }
        }
    });
}

function downloadImage(url, destination) {
    https.get(url, (response) => {
        response.pipe(fs.createWriteStream(destination));
    });
}

extractUrl();
