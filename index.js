
const express = require('express');
const app = express();
const youtubedl = require('youtube-dl');

app.get('/api', (req, res) => {
  const url = req.query.url; // Get the 'url' query parameter from the request

  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  const video = youtubedl(url);

  video.on('info', function(info) {
    console.log('Download started');
    console.log('Title:', info.title);
    console.log('Number of videos in playlist:', info.entries.length);
  });

  video.on('end', function() {
    console.log('Download finished');
    // You can send a response to the client here if needed
    res.send('Download finished');
  });

  video.pipe(res); // Pipe the video stream directly to the response
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
