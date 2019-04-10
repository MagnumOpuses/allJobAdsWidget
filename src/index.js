var pagination = require('pagination');

(function(window, document) {

  // ---------------------------- Changeable variables start ---------------------------- //

  let logging = false;
  const apiUrl = "https://jobs.dev.services.jtech.se/";
  const scriptDomain = getScriptURL().split('script/AfPbWidget.js')[0];
  const scriptsUrl = scriptDomain + "/script/";
  const cssUrl = scriptDomain + "/css/";
  const lang = 'sv'  // en or sv

  // ---------------------------- Changable variables end ---------------------------- //

  let afw, pag1;
  const ApiLimit = 2000;

  // ---------------------------- Helper functions start ---------------------------- //

  /**
   * Will console log a array of function trace and value of passed variable "log"
   * @param {*} log - can be string, array or object
   */
  function l(log) 
  {
    if(logging){
      var stack;
  
      try {
        throw new Error('');
      }
      catch (error) {
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
    linkElement.onload = linkElement.onreadystatechange = function() {
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
    script.onload = script.onreadystatechange = function() {
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

  function ajax_get(url, callback) 
  {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        try {
          var data = JSON.parse(request.responseText);
        } catch(err) {
          console.log(err.message + " in " + request.responseText);
          return;
        }
        callback(data);
      }
    };
 
    request.open("GET", url, true);
    if(url.search('jtech.se/open/search') > 1) {
      l('AfJobs headers set for:' + url);
      request.setRequestHeader("api-key", "apa");
    } else {
      l('AllJobs headers set for: ' + url );
      request.setRequestHeader("api-key", "am9ic2Nhbm5lckBqdGVjaC5zZQo");
    }
    request.send();
  }

  function checkImageExists(imageUrl, callBack) 
  {
    var imageData = new Image();
    imageData.onload = function() {
      callBack(true);
    };
    imageData.onerror = function() {
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

  function ApiUrl(cont, page = 0)
  {
    // defaults 
    var limit = 5;
    var offset = 0;
    var showexpired = false;
    var q = '';
    var places = '';

    // fetch from container
    if(cont.dataset.limit) { limit = cont.dataset.limit; }
    if(cont.dataset.showexpired) { showexpired = cont.dataset.showexpired; }
    if(cont.dataset.q) { q = cont.dataset.q; }
    if(cont.dataset.places) { places = cont.dataset.places.split(',').join('&place=');}

    if(page > 1 ) {
      offset = (page * limit) - limit;
    }

    var httpRequestString = apiUrl;

    if(cont.dataset.source == "af"){
      httpRequestString += 'open/'; 
    }
    
    return (
      httpRequestString + 
      "search?show-expired=" + showexpired +
      "&q=" + q +
      "&place=" + places +
      "&offset=" + offset +
      "&limit=" + limit
    );  
  }

  function toHttps(url) 
  {
    return url.replace('http:', 'https:');
  }

  function addAdListener(query, call) 
  {
    [].forEach.call( document.querySelectorAll( query ), function ( e ) {
      e.addEventListener( 'click', function () {
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
    if (e.classList) { 
      e.classList.add(c);
    } else {
      arr = e.className.split(" ");
      if (arr.indexOf(c) == -1) {
        e.className += " " + c;
      }
    }    
  }

  function removeClass(e,c) {
    if (e.classList) { 
      e.classList.remove(c);
    } else {
      e.className = e.className.replace(/\b"+ c +"\b/g, "");
    }
  }

	// ---------------------------- Helper functions end ---------------------------- //

  document.addEventListener("DOMContentLoaded", function(event) { 

    afw = document.getElementById("afWidgetContainer");
    if(afw == undefined) {
      throw new Error("can't find container for widget");
    }

    getStylesheet(cssUrl + "AfPbWidget.css");
    getStylesheet("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i,800");

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
      ajax_get(ApiUrl(cont), function(annonsdata) {
        var total = '';
        if(annonsdata.total != undefined) 
        {
          total = annonsdata.total.toString().split('');
        } 
        else 
        {
          total = annonsdata.antal_platsannonser.toString().split('');
        }
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
      q.className = 'afselected';
      q.innerText = afw.dataset.q;
      t.innerHTML = 'Annonser inom ';
      t.appendChild(q);
    }

    if(afw.dataset.places) {
      var p = document.createElement('span');
      p.className = 'afselected';
      p.innerText = afw.dataset.places;
      t.innerHTML += ' att söka i ';
      t.appendChild(p);

    }

    afw.onclick = function() 
    {
      addClass(wrapper,"blocker");
      wrapper.firstChild.setAttribute("style", "display: inline-block");
      getAds(1);
    };

    // close modal. 
    addAdListener(".close-modal", function() 
    {
      removeClass(wrapper, "blocker");
      wrapper.firstChild.setAttribute("style", "display: none");
    });

  });

  var addAdRow = function(annons) 
  {
    // move af data to be work as alljobs
    if(afw.dataset.source == "af") {
        annons.header = annons.rubrik;
        annons.employer = annons.arbetsgivare;
        annons.employer.name = annons.employer.namn;

        annons.location = '';
        if(annons.arbetsplatsadress.gatuadress) {
          annons.location += annons.arbetsplatsadress.gatuadress;
        }
        if(
          annons.arbetsplatsadress.postort && 
          annons.location.search(annons.arbetsplatsadress.postort) < 1
          ) {
          if(annons.location.length > 0) {
            annons.location += ', ';
          }
          annons.location += annons.arbetsplatsadress.postort;
        }
        annons.application = annons.ansokningsdetaljer;
        annons.application.site = {};
        annons.application.site.url = annons.application.webbadress;
        annons.application.deadline = annons.sista_ansokningsdatum;
        annons.markup = annons.beskrivning.annonstext;
    }

    l(annons);
    
    var newRow = createE("div", "afTableRow");
    newRow.id = annons.id;    

    var cell = createE("div", "afTableCell");
    var row = createE("div", "afRow");

    var adheadElement = createE("h3",'',annons.header);
    var jobplaceElement = createE("div", "afJobplace");

    if (annons.employer.name != undefined) 
    {
        jobplaceElement.innerHTML = annons.employer.name + ", ";
    }

    jobplaceElement.innerHTML += annons.location;

    row.appendChild(adheadElement);

    if (annons.application.deadline != undefined) 
    {
        var date = new Date(annons.application.deadline).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        var deadline = createE("span", "afDeadline", "Sista ansökningsdagen: " + date);
        row.appendChild(deadline);
    }

    row.appendChild(jobplaceElement);

    if (annons.employer.logoUrl) 
    {
      var logoUrl = toHttps(annons.employer.logoUrl);
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

    var readMore = createE("div", "afReadMore");
    var close = createE("a","afAdClose","Stäng");

    readMore.appendChild(close);
    
    var content = createE("article", "afAdText", annons.markup);
    readMore.appendChild(content);

    var url = '';
    if(annons.application.site.url) 
    {
      url = annons.application.site.url;
    } 
    else if(annons.sources != undefined && annons.sources[0].url) 
    {
      url = annons.sources[0].url;
    }
    
    if(url.length > 1) 
    {
      var applyLink = createE("a", "afApply");
      applyLink.href = url;
      applyLink.target = '_blank';
      applyLink.text = i18n`Apply`;
      readMore.appendChild(applyLink);
    }
    if(annons.sista_ansokningsdag) 
    {
      left.appendChild(dateElement);
    }
    cell.appendChild(row);
    cell.appendChild(readMore);
    newRow.appendChild(cell);
    return newRow;

  }

  function getAds(sida) 
  {
    //TODO: Show waiting gif while fetching data
    ajax_get(ApiUrl(afw,sida), function(annonsdata) 
    {
      l(annonsdata);
      var total = '';
      if(annonsdata.total != undefined) 
      {
        total = annonsdata.total.toString().split('');
      } 
      else 
      {
        total = annonsdata.antal_platsannonser.toString().split('');
      }


      if(annonsdata.total > ApiLimit)
      {
        total = ApiLimit;
      }

      if(pag1 == undefined)
      {
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
  }
})(window, document);

