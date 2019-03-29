![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"
[A JobTech Project]( https://www.jobtechdev.se)

# All Job Ads Widget v 1.0

Do you want to help? Get involved!
see [CONTRIBUTING]( https://github.com/MagnumOpuses/allJobAdsWidget/blob/master/CONTRIBUTING.md)

## Getting started
You can choose to host on premises or use our host in the cloud, it's your choice.

## Docker
`%> sudo docker build -t <Image name> -f Dockerfile`
<br> run
<br> `%>sudo docker run -it  -p 8080:8080 <Image name>`
<br> access test page
<br> `http://localhost:8080/alljobads/`


Usages
------
The easiest way of using the Vacancies Widget is to add references to our hosted script and needed css files at the end of the html file. See Snippet 1.
and then place a clickable element 'afWidgetContainer' according to your preferences. 

First you will need the javascript file on your site or use our hosted version.

`<script src="http://widgets.jobtechdev.se/alljobads/script/AfPbWidget.js"></script>`
<br> or <br>
`<script src="http://widgets.jobtechdev.se/alljobads/script/AfPbWidget.js"></script>`

And a 'div' tag with id 'afWidgetContainer', where you want to display link do modal job list window and some content inside the 'div'.
Minimum is this:

`<div id="afWidgetContainer"></div>`

Recomended is this: 

`<div id="afWidgetContainer">Click here to see jobs</div>`

This widget also supplies a count that shows number of jobs:

`<div id="afJobCount"></div>`

Leave this one empty. It's content will be replaced with a number. 


To filter we have the following options: 

* data-showexpired - (true or false) will list or not list expired ads. 
* data-q           - (string) free search text string to filter jobs, example: ekonomi, truckförare etc 
* data-places      - (string) text string to filter location, if you want more then one place seperate with comma. 

there is also a page limit 

* data-limit       - (number) this will limit number of ads per page in the modal.



Examples
--------

Without counter:
* We are looking for ads in jokkmokk and umeå
* Ads that are of type "ekonomi"
* Shows 10 ads per page

```html
<div
    id="afWidgetContainer"
    data-limit="10"
    data-showexpired="false"
    data-q="ekonomi"
    data-places="jokkmokk,umeå"
    >
    <div style="text-align: center;">
        Se lediga ekonomi jobb att söka i <strong>Jokkmokk</strong> och <strong>Umeå</strong>
    </div>
</div>
```


With counter:
* We are looking for ads in Stockholm
* Ads that are of type "truckchafför"
* Shows 5 ads per page

```html
<div
    id="afWidgetContainer"
    data-limit="5"
    data-showexpired="false"
    data-q="truck"
    data-places="stockholm"
    >
    <div style="text-align: center;">Just nu finns det</div>
        <div
          id="afJobCount"
          data-showExpired="false"
          data-q="ekonomi"
          data-places="stockholm"
          style="    
            text-align: center;
            font-weight: 600;
            border: 3px solid #733ACA;
            width: 60%;
            margin: 10px auto;
            border-radius: 5px; 
          "
        ></div>
        <div style="text-align: center; font-size: 13px">lediga jobb att söka i <strong>Stockholm</strong></div>
      </div>
    </div>
</div>
```


Known issues
------------

