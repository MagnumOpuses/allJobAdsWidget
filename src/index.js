var pagination = require('pagination');

import './css/AfPbWidget.css';
import './css/animate.css';
 
(function(window, document) {

  // ---------------------------- Changeable variables start ---------------------------- //

  let logging = false;
  const scriptDomain = getScriptURL().split('script/AfPbWidget.js')[0];
  const scriptsUrl = scriptDomain + "/script/";
  const cssUrl = scriptDomain + "/css/";
  const lang = 'sv'  // en or sv

  // ---------------------------- Changable variables end ---------------------------- //

  let afw, pag1;
  const ApiLimit = 2000;
  const allJobsApiUrl = "https://jobtechjobs-api.dev.services.jtech.se/market/" 
  const afJobsApiUrl ="https://open-api.dev.services.jtech.se/";
  


  // ---------------------------- Helper functions start ---------------------------- //

  /**
   * Will console log a array of function trace and value of passed variable "log"
   * @param {*} log - can be string, array or object
   */
  function l(log) 
  {
    if(logging)
    {
      var stack;
  
      try 
      {
        throw new Error('');
      }
      catch (error) 
      {
        stack = error.stack || '';
      }
    
      stack = stack.split('\n').map(function (line) { return line.trim(); });
      stack.push(numOfChar('-',log.length));
      stack.push(log);
      stack.reverse();
      console.log(stack.slice(0, -2));
    }
  }
  
  function numOfChar(char,count) 
  {
    var str='';
    var i = 0;
    do {
      i++;
      str += char;
    } while (i < count);
    return str;
  }

  function afScrollIt(destination, duration = 200, easing = 'linear', callback) {

    const easings = {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };
  
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  
    if ('requestAnimationFrame' in window === false) {
      //window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }
  
    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
  
      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }
  
      requestAnimationFrame(scroll);
    }
  
    scroll();
  }

  function getScriptURL() 
  {
    // IE don't support currentScript, solution = querySelector
    var script =  document.currentScript || document.querySelector('script[src*="AfPbWidget.js"]')
    l('loaded script:' + script.src );
    return script.src
  }

  function getStylesheet(url) 
  {
    var linkElement = document.createElement("link");
    linkElement.href = url;
    linkElement.rel = "stylesheet";
    var head = document.getElementsByTagName("head")[0],
      done = false;
    // Attach handlers for all browsers
    linkElement.onload = linkElement.onreadystatechange = function() 
    {
      if (
        !done &&
        (!this.readyState ||
          this.readyState == "loaded" ||
          this.readyState == "complete")
      ) {
        done = true;
        //success();
        l('loaded css:' + url);
        linkElement.onload = linkElement.onreadystatechange = null;
        // head.removeChild(linkElement);
      }
    };
    head.appendChild(linkElement);
  }

  function getScript(url, success) 
  {
    var script = document.createElement("script");
    script.src = url;
    var head = document.getElementsByTagName("head")[0],
      done = false;
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() 
    {
      if (
        !done &&
        (!this.readyState ||
          this.readyState == "loaded" ||
          this.readyState == "complete")
      ) {
        done = true;
        success();
        l('Loaded script:' + url);
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
      }
    };
    head.appendChild(script);
  }

  function delay() 
  {
    return new Promise(resolve => setTimeout(resolve, 1300));
  }

  function ajax_get(url, callback) 
  {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function() 
    {
      if (request.readyState == 4 && request.status == 200) 
      {
        try 
        {
          var data = JSON.parse(request.responseText);
        } 
        catch(err) 
        {
          console.log(err.message + " in " + request.responseText);
          return;
        }
        callback(data);
      }
    };
 
    request.open("GET", url, true);
    if(url.search('open-api.dev') > 1 || url.search('/vf/') > 1) 
    {
      l('AfJobs headers set for:' + url);
      request.setRequestHeader("api-key", process.env.APIKEY);
    } 
    else 
    {
      l('AllJobs headers set for: ' + url );
      request.setRequestHeader("api-key", "am9ic2Nhbm5lckBqdGVjaC5zZQo");
    }
    request.send();
  }

  function checkImageExists(imageUrl, callBack) 
  {
    var imageData = new Image();
    imageData.onload = function() 
    {
      callBack(true);
    };
    imageData.onerror = function() 
    {
      callBack(false);
    };
    imageData.src = imageUrl;
  }

  function i18n(template) 
  {
    for (var
      info = i18n.db[i18n.locale][template.join('\x01')],
      out = [info.t[0]],
      i = 1, length = info.t.length; i < length; i++
    ) out[i] = arguments[1 + info.v[i - 1]] + info.t[i];
    return out.join('');
  }
  i18n.locale = lang;
  i18n.db = {};
  
  i18n.set = locale => (tCurrent, ...rCurrent) => {
    const key = tCurrent.join('\x01');
    let db = i18n.db[locale] || (i18n.db[locale] = {});
    db[key] = {
      t: tCurrent.slice(),
      v: rCurrent.map((value, i) => i)
    };
    const config = {
      for: other => (tOther, ...rOther) => {
        db = i18n.db[other] || (i18n.db[other] = {});
        db[key] = {
          t: tOther.slice(),
          v: rOther.map((value, i) => rCurrent.indexOf(value))
        };
        return config;
      }
    };
    return config;
  };
  
  // .for('sv')`Hallo ${'name'}`; example with variable
  i18n.set('en')`Apply`
      .for('sv')`Ansök`;

  function createE(e, c = '', i = '') 
  {
    var r = document.createElement(e);
    r.className = c;
    r.innerHTML = i;
    return r;
  }

  async function ApiUrl(cont, page, callback)
  {
      // defaults 
      var limit = 5;
      var offset = 0;
      var showexpired = false;
      var q = '';
      var places = '';
      var httpRequestString = allJobsApiUrl;
      if(cont.dataset.source != "all") {
        var httpRequestString = afJobsApiUrl;
      }

      if(page > 1 ) {
        offset = (page * limit) - limit;
      }

      // fetch from container
      if(cont.dataset.limit) { limit = cont.dataset.limit; }
      if(cont.dataset.showexpired) { showexpired = cont.dataset.showexpired; }
      if(cont.dataset.q) { q = cont.dataset.q; }
      if(cont.dataset.source != "all")
      {
        if(cont.dataset.places) 
        { 
          var search = cont.dataset.places.split(',');
          const response = search.map(fetchLocationId);
      
          Promise.all(response).then(places => {
            places = places.join('&municipality='); 
            httpRequestString += "search?q=" + q +
            "&municipality=" + places +
            "&offset=" + offset +
            "&limit=" + limit;
            callback(httpRequestString);

          });      
        }
      } else {
        if(cont.dataset.places) 
        { 
          places = cont.dataset.places.split(',').join('&place=');
          httpRequestString += "search?show-expired=" + showexpired +
          "&q=" + q +
          "&place=" + places +
          "&offset=" + offset +
          "&limit=" + limit;
          callback(httpRequestString);

        }
      }
  }

  function toHttps(url) 
  {
    return url.replace('http:', 'https:');
  }

  function addAdListener(query, call) 
  {
    [].forEach.call( document.querySelectorAll( query ), function ( e ) 
    {
      e.addEventListener( 'click', function (event) 
      {
        event.preventDefault();
        fnCall(call, e);
      }, false );
    });
  }

  function fnCall(fn, ...args)
  {
    let func = (typeof fn =="string")?window[fn]:fn;
    if (typeof func == "function") func(...args)
    else console.error(`${fn} is Not a function!`);
  }

  function addClass(e, c) 
  {
    if (e.classList) 
    { 
      e.classList.add(c);
    } 
    else 
    {
      arr = e.className.split(" ");
      if (arr.indexOf(c) == -1) 
      {
        e.className += " " + c;
      }
    }    
  }

  function removeClass(e,c) 
  {
    if (e.classList) 
    { 
      e.classList.remove(c);
    } 
    else 
    {
      e.className = e.className.replace(/\b"+ c +"\b/g, "");
    }
  }

  function fetchLocationId(s) 
  {
    const url = afJobsApiUrl + 'taxonomy/search?offset=0&limit=10&type=municipality&show-count=false&q=' + s;
    return new Promise(resolve => ajax_get(url, function(response)
    {
      var places = [];
      let municipalies = response.result;
      municipalies.forEach(function(municipality)
      {
        places.push(municipality.id);
      })
      resolve(places);
    }));
  }

	// ---------------------------- Helper functions end ---------------------------- //

  document.addEventListener("DOMContentLoaded", function(event) { 
    
    // don't add widget if it exists
    var widget =  document.getElementById("afModalWrapper");
    if (widget != undefined) {
      return false;
    }
    
    l('document loaded');
    afw = document.getElementById("afWidgetContainer");
    if(afw == undefined) {
      throw new Error("can't find container for widget");
    }

    var afJobCount = document.getElementById("afJobCount");
    if (afJobCount != undefined) {

      // counter could be empty or have own values
      var cont = afJobCount;
      if(
        afJobCount.dataset.q == undefined && 
        afJobCount.dataset.showexpired == undefined && 
        afJobCount.dataset.places == undefined
        ) {
        cont = afw;          
      }
      ApiUrl(cont, 0, function(url) {
        ajax_get(url, function(annonsdata) {
          var total = parseTotal(annonsdata).toString().split('');
          afJobCount.innerHTML = '';
          total.forEach(function(num) {
            var el = createE("span", "letter", num);
            afJobCount.appendChild(el);
  
          });
        })
        /*
        .fail(function() {
          $afJobCount.html("Missing data");
          console.log("Couldn't get job ad from remote service");
        });
        */  

      });     

    }

    var wrapper = createE("div");
    wrapper.id = "afModalWrapper";
    wrapper.innerHTML = `<div id='afModal' class='afmodal' style='display: none'>
        <a href="#close-modal" class="close-modal ">Close</a>
        <div id="afmodalContent">
          <div class='afmodal-header afRow'>
              <h2>Här har du jobben</h2>
          </div>
          <div class='afRow' >
              <div id='afListContent' class="afListContent">
                  <div class="afTable">
                      <div id="afAnnonsTableBody" >
                          <!-- generated rows will go here-->
                      </div>
                  </div>
              </div>
              <div class="afPaginationWrapper">
                  <div class="afPagination"></div>
              </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(wrapper);

    // build header 
    var t = document.querySelector("#afmodalContent h2");
    t.innerText = 'Jobbannonser ';
    if(afw.dataset.q) {
      var q = document.createElement('span');
      q.className = 'afSelected';
      q.innerText = afw.dataset.q;
      t.innerHTML = 'Annonser för ';
      t.appendChild(q);
    }

    if(afw.dataset.places) {
      var p = document.createElement('span');
      p.className = 'afSelected';
      p.innerText = afw.dataset.places;
      t.innerHTML += ' att söka i ';
      t.appendChild(p);

    }

    afw.onclick = function(e) 
    {
      e.preventDefault();
      addClass(wrapper,"blocker");
      wrapper.firstChild.setAttribute("style", "display: inline-block");
      getAds(1);
    };

    // close modal. 
    addAdListener(".close-modal", function(e) 
    {
      removeClass(wrapper, "blocker");
      wrapper.firstChild.setAttribute("style", "display: none");
    });

  });

  function parseTotal(adData) {
    l(adData);
    if(adData.total.value != undefined) 
    {
      // af
      return adData.total.value;
    } 
    else 
    {
      // all
      return adData.total;
    }
  }

  var addAdRow = function(ad) 
  {
    // move af data to be work as alljobs
    if(afw.dataset.source != "all") {
        ad.header = ad.headline;
        ad.location = '';
        if(ad.workplace_address.postcode) {
          ad.location += ad.workplace_address.postcode;
        }
        if(
          ad.workplace_address.municipality && 
          ad.location.search(ad.workplace_address.municipality) < 1
          ) {
          if(ad.location.length > 0) {
            ad.location += ', ';
          }
          ad.location += ad.workplace_address.municipality;
        }
        ad.application = {};
        if(ad.application_details.email) {
          ad.application.url = 'mailto:' + ad.application_details.email;
        }
        if(ad.application_details.url) {
          ad.application.url = ad.application_details.url;
        }
        if(ad.application_deadline) {
          ad.application.deadline = ad.application_deadline;
        }

        ad.markup = ad.description.text;
    }

    l(ad);
    
    // wrapper
    var newRow = createE("div", "afTableRow");
    newRow.id = ad.id;    

    var cell = createE("div", "afTableCell");
    var row = createE("div", "afRow");

    // header
    var adheadElement = createE("h3",'',ad.header);
    var jobplaceElement = createE("div", "afJobplace");
    // below header
    if (ad.employer.name != undefined) 
    {
        jobplaceElement.innerHTML = ad.employer.name + ", ";
    }
    jobplaceElement.innerHTML += ad.location;
    row.appendChild(adheadElement);

    if (ad.application.deadline != undefined) 
    {
        var date = new Date(ad.application.deadline).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        var deadline = createE("span", "afDeadline", "Sista ansökningsdagen: " + date);
        row.appendChild(deadline);
    }
    row.appendChild(jobplaceElement);

    if (ad.employer.logoUrl) 
    {
      var logoUrl = toHttps(ad.employer.logoUrl);
      checkImageExists(logoUrl, function(existsImage) 
      {
        if(existsImage == true) 
        {
          var logoElement = createE("img", "afListlogo");
          logoElement.src = logoUrl;
          row.prepend(logoElement);
        }
        else 
        {
          // image not exist
        }
      });
    }
    // more info
    var readMore = createE("div", "afReadMore");
    var close = createE("a","afAdClose","Stäng");
    close.title = "Stäng";
    readMore.appendChild(close);
    var content = createE("article", "afAdText", ad.markup);
    readMore.appendChild(content);

    var url = '';
    if(ad.application.url) 
    {
      url = ad.application.url;
    } 
    else if(ad.sources != undefined && ad.sources[0].url) 
    {
      url = ad.sources[0].url;
    }
    
    if(url.length > 1) 
    {
      var applyLink = createE("a", "afApply");
      applyLink.href = url;
      applyLink.text = i18n`Apply`;
      // target blank for link but not email
      if(url.search('mailto') < 0) {
        applyLink.target = '_blank';
      }
      readMore.appendChild(applyLink);
    }
    if(ad.sista_ansokningsdag) 
    {
      left.appendChild(dateElement);
    }
    cell.appendChild(row);
    cell.appendChild(readMore);
    newRow.appendChild(cell);
    return newRow;

  }

  async function getAds(page) 
  {
    //TODO: Show waiting gif while fetching data
    ApiUrl(afw, page, function(url) 
    {
      ajax_get(url, function(annonsdata) 
      {
        var total = parseTotal(annonsdata);
        if(total > ApiLimit)
        {
          total = ApiLimit;
        }

        if(pag1 == undefined)
        {
          l('pagination inizialised');
          pag1 = new pagination(document.getElementsByClassName('afPagination')[0],
            {
              currentPage: 1,	                  	// number
              totalItems: total,                  // number
              itemsPerPage: afw.dataset.limit,    // number
              step: 2,			                      // number
              onInit: getAds	                    // function
            }
          );
          pag1.onPageChanged(getAds);
        }

        var annonsTableBody = document.getElementById("afAnnonsTableBody");
        annonsTableBody.innerHTML= '';

        var annonser = {};
        if(annonsdata.hits)
        {
          annonser = annonsdata.hits;
        }
        else 
        {
          annonser = annonsdata.platsannonser;
        }
        afScrollIt(annonsTableBody,1000);
        annonser.forEach(function(annons) 
        {
          annonsTableBody.appendChild(addAdRow(annons));
        });

        // ad opener
        addAdListener(".afTableRow h3", function(e) 
        {
          document.querySelectorAll(".afTableCell").forEach(function (e) 
          {
            removeClass(e, "opened");
          });
          e.parentNode.parentNode.className += " opened";   
        });

        // ad closer
        addAdListener(".afAdClose", function() 
        {
          document.querySelectorAll(".afTableCell").forEach(function (e) 
          {
            removeClass(e, "opened");
          });
        });
        
      })
      /*
      .fail(function() {
        console.log("Couldn't get job ad from remote service");
      });
      */
    });
  }
})(window, document);

