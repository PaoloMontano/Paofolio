Pirouette
========

The solution to embedding multiple Vimeo videos to a single page gallery.
Rather than embedding Vimeo's videos for all your work, the page will represent each video with an image.
This allows for faster loading on desktops and mobile devices.
Additionally, Pirouette will only play one video at a time. 
So if there is a video currently playing while the user clicks on a different thumbnail, Pirouette will
stop the previous video and replace it with the appropriate image. Therefore solving multiple playback issues.


Problem:
======
Client wanted to display multiple Vimeo videos on their page. 
They chose to embed each video directly on the front page.
This created long load times and issues when using mobile devices.

Proposed solution:
======
Load JPG thumbnails instead of every embedded Vimeo video.

Method:
======
Client stores information on an XML document.
Use JPG images to represent each Vimeo video.
Hover to reveal play button to display presence of video playback.
Selectively replace <div> containing thumbnail with embedded Vimeo video.
Photo gallery retrieves the names, story, and photos from an XML document.
Replaces <div> container with an auto-width gallery.

Examples: http://chaos.paolomontano.ca/pirouette/
          http://chaos.PaoloMontano.ca/HERA

Video and photos from HERA films (http://herafilms.com).
