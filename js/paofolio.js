/**
 * Loads images, names, and story needed to represent each Vimeo video.
 * @param  {XML} url [XML file with information for each Video.]
  */
function firstLoad(url) {
  var xmlhttp;
  var txt,x,xx,vim,i,num;
  clearMedia();
  if (window.XMLHttpRequest) {
    //  code for IE7+, FireFox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    //  code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      txt = '';
      x = xmlhttp.responseXML.documentElement.getElementsByTagName('FEATURE');
      for (i = 0; i < x.length; i++) {
        txt += '<div id="feature' + i + '" class="featureBox">';
        txt += '<div id="visual' + i + '" class="visual">';
        txt += getImages(x[i],i);
        txt += '</div> <!-- visual' + i + ' -->';
        txt += '<div id="synopsis' + i + '" class="synopsis">';
        txt += '<div id="title' + i + '" class="titleBox">';
        xx = x[i].getElementsByTagName('TITLE');
        try {
          txt += xx[0].firstChild.nodeValue;
        } catch (er) {
          txt += 'Title Unavailable';
        }
        txt += '</div> <!-- title' + i + ' -->';
        txt += '<div id="summary' + i + '" class="descriptionBox">';
        xx = x[i].getElementsByTagName('DESC');
        try {
          txt += xx[0].firstChild.nodeValue;
        } catch (er) {
          txt += 'Description unavailable.';
        }
        txt += '</div> <!-- summary' + i + ' -->';
        txt += '</div> <!-- synopsis' + i + ' -->';
        txt += '</div> <!-- feature' + i + ' -->';
        num = i + 1;
      }
      document.getElementById('mediaWrapperID').innerHTML=txt;
      document.getElementById('mediaWrapperID').style.width = ((num * 715)) + 'px';
    }
  };
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

/**
 * Targets specific spot to replace JPG image with an embedded Vimeo Video.
 * @param  {int}    Vimeo Vimeo ID
 * @param  {int}    spot  Unique location for where embedded video is placed.
 */
function loadVideo(vimeo, spot) {
  var xmlhttp;
  var txt,x,xx,vim,i;
  if (window.XMLHttpRequest) {
    //  code for IE7+, FireFox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    //  code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      x = xmlhttp.responseXML.documentElement.getElementsByTagName('FEATURE');
      for (i = 0; i < x.length; i++) {
        txt = getImages(x[i],i);
        document.getElementById('visual' + i).innerHTML=txt;
      }
  document.getElementById('visual' + spot).innerHTML='<iframe src="http://player.vimeo.com/video/' + vimeo + '?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=ee8811&amp;autoplay=1" width="715" height="402" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
    }
  };
  xmlhttp.open("GET","films.xml",true);
  xmlhttp.send();
}

/**
 * Sets the thumbnail image for the appropriate video.
 * @param  {XML Document Tag} x Specific Couple
 * @param  {int}              i Identifier for the specific div tag.
 * @return {String}             Full HTML markup for thumbnail with hover play button.
 */
function getImages(x,i) {
  var txt,xx;
  xx = x.getElementsByTagName('VIDEO');
  try {
    vim = xx[0].firstChild.nodeValue;
  } catch (er) {
    vim = '50803425';
  }
  txt = '<a href="#" onclick="loadVideo(' + vim + ',' + i + '); return false">';
  xx = x.getElementsByTagName('PREVIEW');
  try {
    txt += '<img src="' + xx[0].firstChild.nodeValue + '" />';
  } catch (er) {
    txt += '<img src="images/preview.jpg" />';
  }
  txt += '</a>';
  txt += '<div class="playArrow"><a href="#" onclick="loadVideo(' + vim + ',' + i + '); return false"><img src="images/Arrow.png" /></a></div><!-- playArrow -->';

  return txt;
}

/**
 * Creates the photo gallery.
 * @param  {XML Document} url Document containing information for feature gallery.
 * @return {String}           HTML markup for gallery.
 */
function loadPhotos(url) {
  var xmlhttp;
  var txt,x,xx,i,num;
  clearMedia();
  if (window.XMLHttpRequest) {
    //  code for IE7+, FireFox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    //  code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      txt = '';
      num = 0;
      x = xmlhttp.responseXML.documentElement.getElementsByTagName('COUPLE');
      for (i = 0; i < x.length; i++) {
        txt += '<div id="photoBox" class="photoBox">';
        txt += '<div id="photoGallery' + i + '" class="photoGallery">';
        txt += getGallery(x[i]);
        txt += '</div> <!-- photoGallery -->';
        txt += '<div id="photoHolder' + i + '" class="photoHolder">';
        txt += '<div id="photoTitle' + i + '" class="photoTitle">';
        txt += getStringValues(x[i],'NAME');
        txt += '</div> <!-- photoTitle -->';
        txt += '<div id="photoStory' + i + '" class="photoStory">';
        txt += getStringValues(x[i],'STORY');
        txt += '</div> <!-- photoStory -->';
        txt += '</div> <!-- photoHolder -->';
        txt += '</div> <!-- photoBox -->';
        num += totalImages(x[i]);
      }
      document.getElementById('mediaWrapperID').style.width = ((num * 725) - 15) + 'px';
      document.getElementById('mediaWrapperID').innerHTML=txt;
    }
  };
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

/**
 * Creates a gallery for the specific coulpe in feature section.
 * @param  {XML Document Tag} x Contains multiple tags for pictures.
 * @return {String}             HTML Markup to create gallery.
 */
function getGallery(x) {
  var txt,xx,i;
  txt = '';
  xx = x.getElementsByTagName('PICTURE');
  for (i = 0; i < xx.length; i++) {
    txt += '<img src="' + xx[i].firstChild.nodeValue + '" alt="" />';
  }
  return txt;
}

/**
 * Retrieves name or story from XML file.
 * @param  {XML Document Tag}   x                Specific couple.
 * @param  {TagName}            tagname          TagName identifier.
 * @return {String}                              Value of TagName.
 */
function getStringValues(x,tagname) {
  var xx,txt;
  xx = x.getElementsByTagName(tagname);
  try {
    txt = xx[0].firstChild.nodeValue;
  } catch (er) {
    txt = tagname + 'unavailable.';
  }
  return txt;
}

/**
 * Determines the total number of images in the gallery.
 * @param  {[type]} x [description]
 * @return {int}      [Total number of images.]
 */
function totalImages(x) {
  var xx;
  xx = x.getElementsByTagName('PICTURE');
  return xx.length;
}

/**
 * Clears the container to reset scrollbar position.
 */
function clearMedia() {
  document.getElementById('mediaWrapperID').innerHTML='';
}
