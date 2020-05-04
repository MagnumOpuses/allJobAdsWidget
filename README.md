![alt text][logo] 

[logo]: https://github.com/MagnumOpuses/project-meta/raw/master/img/jobtechdev_black.png "JobTech dev logo"
[A JobTech Project]( https://www.jobtechdev.se)

# All Job Ads Widget v 1.0
Do you want to help? Get involved!
see [CONTRIBUTING]( https://github.com/MagnumOpuses/allJobAdsWidget/raw/master/CONTRIBUTING.md)

## Purpose

This widget can be added with just 2 lines of code. <BR />
You can put this Widget where you want on you own website.<BR />
This widget is fetching all jobs from AF(Arbetsförmedlingen / Swedish employment agency) and will display them with a pagination. You can predefine areas and filter the results. 


## Live Demo / Example


![alt text](https://widgets.jobtechdev.se/alljobads/example/demo.jpg)

Here you have a working example: https://widgets.jobtechdev.se/alljobads/<BR />
<BR />
There is also an example without modal here: https://widgets.jobtechdev.se/alljobads/notModal.html

## Getting started
Easiest is to add our javascript file to your site and add a specific element to where you want the widget. <BR />

Of course you can also clone or download the files and run it on your own server. 
If you want to make some changes, please fork the repo or ask for a [feature request](https://github.com/MagnumOpuses/mapWidget/issues/new?assignees=&labels=&template=feature_request.md). 


## Docker
There is a dockerfile if you want to use docker. 
<BR /> Run:

`%>sudo docker build . -t <Image name>`<BR /> 
`%>sudo docker run -it  -p 8080:8080 <Image name>`<BR /> 

access test page <BR /> 
`http://localhost:8080/alljobs` <BR /> 
`http://localhost:8080/alljobs/notModal.html` <BR /> 
 <BR /> 
 
Usages
------
The easiest way of using the AllJobs Widget is to add references to our hosted script at the end of the your html file. <BR />
`<script src="https://widgets.jobtechdev.se/alljobads/script/AfPbWidget.js"></script>`
<BR /> or <BR />
`<script src="https://<host>/<url to where you put the script>/AfPbWidget.js"></script>`

And a 'div' tag with id 'afWidgetContainer', where you want the widget.<br />
Minimum is this:

`<div id="afWidgetContainer"></div>`

But if you want to use the Modal, recomended is this: 

`<div id="afWidgetContainer">Click here to see jobs</div>`

To filter we have the following options: 

* data-showexpired - (true or false) will list or not list expired ads. 
* data-q           - (string) free search text string to filter jobs, example: ekonomi, truckförare etc 
* data-places      - (string) text string to filter location, if you want more then one place seperate with comma. 

there is also a page limit 

* data-limit       - (number) this will limit number of ads per page in the modal.

Other options are modal(popup)or no modal. 

* data-modal       - set it to false to not use modal, default is to use modal.  

There is also a widget also supplies a count that shows number of jobs:

`<div id="afJobCount"></div>`

Leave this one empty. It's content will be replaced with a number. 


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

Here is an example without modal (popup).

```html
<div
    id="afWidgetContainer"
    data-limit="10"
    data-showexpired="false"
    data-q="ekonomi"
    data-places="jokkmokk,umeå"
    data-modal="false"
    >
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
```


Known issues
------------

