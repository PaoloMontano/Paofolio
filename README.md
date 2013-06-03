Paofolio
========

Embedded Vimeo and photo gallery.

Problem:  
Client wanted to display multiple Vimeo videos on their page. 
They chose to embed each video directly on the front page.
This created long load times and issues when using mobile devices.

Proposed solution: 
Load JPG thumbnails instead of every embedded Vimeo video.

Method:
Client stores information on an XML document.
Use JPG images to represent each Vimeo video.
Hover to reveal play button to display presence of video playback.
Selectively replace <div> containing thumbnail with embedded Vimeo video.
Photo gallery retrieves the names, story, and photos from an XML document.
Replaces <div> container with an auto-width gallery.

Example: http://chaos.PaoloMontano.ca/paofolio
