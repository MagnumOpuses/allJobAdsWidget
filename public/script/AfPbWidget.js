(function(window, document) {
  let httpRequestString = "";
  let jQuery, $;
  let baseUrl = "https://develop-sokannonser.dev.services.jtech.se/";
  let scriptDomain = document.location.href; //"http://jobtech.digitalconcept.se/widget/vacancieswidget/";
  let $pagination,
    $afWidgetContainer,
    defaultOpts,
    annonsTableBody,
    afModal;

  // Helper functions start ---------------------------------------------------

  function getStylesheet(url) {
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
        linkElement.onload = linkElement.onreadystatechange = null;
        // head.removeChild(linkElement);
      }
    };
    head.appendChild(linkElement);
  }

  function getScript(url, success) {
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
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
      }
    };
    head.appendChild(script);
  }

  function ajax_get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {

        //console.log('responseText:' + request.responseText);
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
    request.setRequestHeader("api-key", "am9ic2Nhbm5lckBqdGVjaC5zZQo");
    request.send();
  }

  function checkImageExists(imageUrl, callBack) {
    var imageData = new Image();
    imageData.onload = function() {
    callBack(true);
    };
    imageData.onerror = function() {
    callBack(false);
    };
    imageData.src = imageUrl;
    }

  function i18n(template) {
    for (var
      info = i18n.db[i18n.locale][template.join('\x01')],
      out = [info.t[0]],
      i = 1, length = info.t.length; i < length; i++
    ) out[i] = arguments[1 + info.v[i - 1]] + info.t[i];
    return out.join('');
  }
  i18n.locale = 'sv';
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


  window.onload = function() {
    //Load jQuery version 3.2.0 if it isn't already loaded.
    if (typeof jQuery == "undefined" || window.jQuery.fn.jquery !== "3.2.0") {
      getScript(
        "https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.js",
        function() {
          if (typeof window.jQuery == "undefined") {
            if (window.console)
              console.log("Sorry, but jQuery wasn't able to load");
          } else {
            $ = jQuery = window.jQuery.noConflict();
            if (window.console)
              console.log(
                "This page is now jQuerified with v" + jQuery.fn.jquery
              );
            main($);
          }
        }
      );
    } else {
      if (window.console)
        console.log("jQuery v" + jQuery.fn.jquery + " already loaded!");
      main();
    }
  };
	// Helper functions end ---------------------------------------------------

  var main = function($) {
    getStylesheet(scriptDomain + "css/AfPbWidget.css");
    getStylesheet("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i,800");

    var $afJobCount = $("#afJobCount");

    if ($afJobCount.length) {
      if ($afJobCount[0].dataset.q.length > 0 || $afJobCount[0].dataset.places.length > 0) {
        httpRequestString =
          baseUrl +
          "search?show-expired=" +
          $afJobCount[0].dataset.showexpired +
          "&q=" +
          $afJobCount[0].dataset.q +
          "&place=" +
          $afJobCount[0].dataset.places.split(',').join('&place=');

        //Get 'antal_platsannonser'
        ajax_get(httpRequestString, function(annonsdata) {
          var total = annonsdata.total.toString().split('');
          total.forEach(function(num) {
            var el = document.createElement("span");
            el.className = 'letter';
            el.innerText = num;
            $afJobCount[0].appendChild(el);

          });
        })
        /*
        .fail(function() {
          $afJobCount.html("Missing data");
          console.log("Couldn't get job ad from remote service");
        });
        */
      } else {
        $afJobCount.html("Check tag parameter.");
      }
    }
    
    $afWidgetContainer = $("#afWidgetContainer");

    if($afWidgetContainer.length) {
      getScript(scriptDomain + "script/pagination.js", function() {
        getScript(scriptDomain + "script/jquery.modal.js", function() {
            $.modal.defaults = {
                fadeDuration: 200,
                closeExisting: true,
                escapeClose: true,
                clickClose: true,
                closeText: "Close",
                closeClass: "",
                showClose: true,
                spinnerHtml: true,
                modalClass: "modal",
                showSpinner: true,
                fadeDelay: 1.0
            };
    
            $("body").prepend(
            `<div id='afModal' class='afmodal' style='display: none'>
	            <div id="afmodalContent">
						    <div class='afmodal-header afRow'>
						        <h2>Här har du jobben</h2>
						    </div>
						    <div class='afRow' >
						        <div id='afListContent' class="afListContent">
						            <div class="afTable">
						                <div class="afTableBody" id="afAnnonsTableBody" >
						                    <!-- generated rows will go here-->
						                </div>
						            </div>
						        </div>
						        <div class="pagination">
						            <ul id="dynamic-total-pages-pagination"></ul>
						        </div>
						    </div>
							</div>
            </div>`
            );
    
            afModal = $("#afModal");
    
            // build header 
              
            var t = document.querySelector("#afmodalContent h2");
            var w = document.querySelector("#afWidgetContainer");
            t.innerText = 'Jobbannonser ';
            if(w.dataset.q) {
              var q = document.createElement('span');
              q.className = 'afselected';
              q.innerText = w.dataset.q;
              t.innerHTML = 'Annonser inom ';
              t.appendChild(q);
            }

            if(w.dataset.places) {
              var p = document.createElement('span');
              p.className = 'afselected';
              p.innerText = w.dataset.places;
              t.innerHTML += ' att söka i ';
              t.appendChild(p);

            }

            annonsTableBody = $("#afAnnonsTableBody")[0];
            $pagination = $("#dynamic-total-pages-pagination");
            defaultOpts = {
              startPage: 1,
              onPageClick: function(evt, page) {
                  getAds(page);
                  //Show new page from top..
                  $("#afListContent").animate({ scrollTop: 0 });
              }
            };
            $pagination.twbsPagination(defaultOpts);

            afModal.on($.modal.BEFORE_OPEN, function(event, modal) {
            getAds(1);
            });
        });
      });
      //Show The Window
      $afWidgetContainer[0].onclick = function() {
        $("#afModal").modal();
      };
    }


    //do on click row in annons list
    $(document).on("click", ".afTableRow h3", function() {
      //Show ad
      $('.afTableCell').removeClass("opened");
      $(this).parent().parent().addClass("opened");
    });

    $(document).on("click", ".afAdClose", function() {
      $('.afTableCell').removeClass("opened");
    });  

  };



  var addAdRow = function(annons, map) {
    switch(map) {
      case 'all':
        allMapping(annons);
      case 'af':
        afMapping(annons);
    }
  };

  var afMapping = function(annons) {

  }

  var allMapping = function(annons) {
    //console.log(annons);
    
    var newRow = document.createElement("div");
    newRow.className = "afTableRow";
    newRow.id = annons.id;    
    var attribute = document.createAttribute("data-annonsid");
    attribute.value = annons.id;
    newRow.setAttributeNode(attribute);

    var cell = document.createElement("div");
    cell.className = "afTableCell";
    var row = document.createElement("div");
    row.className = "afRow";

    var adheadElement = document.createElement("h3");
    adheadElement.innerHTML = annons.header;
    var jobplaceElement = document.createElement("div");
    jobplaceElement.className = "afJobplace";
    if (annons.employer.name != undefined) {
        jobplaceElement.innerHTML = annons.employer.name + ", ";
    }
    jobplaceElement.innerHTML += annons.location;

    row.appendChild(adheadElement);

    if (annons.application.deadline != undefined) {
        var deadline = document.createElement("span");
        deadline.className = "afDeadline";
        var date = new Date(annons.application.deadline).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        deadline.innerText = 'Sista ansökningsdagen: ' + date;
        row.appendChild(deadline);
    }

    row.appendChild(jobplaceElement);

    if (annons.employer.logoUrl) {

      checkImageExists(annons.employer.logoUrl, function(existsImage) {
        if(existsImage == true) {
          var logoElement = document.createElement("img");
          logoElement.className = "afListlogo";
          logoElement.src = annons.employer.logoUrl;
          row.prepend(logoElement);
        }
        else {
          // image not exist
        }
      });
    }

    var readMore = document.createElement("div");
    readMore.className = "afReadMore";

    var close = document.createElement("a");
    close.className = 'afAdClose';
    close.innerText = 'Stäng';
    readMore.appendChild(close);
    
    var content = document.createElement("article");
    content.className = "afAdText";
    content.innerHTML = annons.markup;
    readMore.appendChild(content);

    if (annons.application.url || annons.sources[0].url) { 
      if (annons.application.url) {
        url = annons.application.url;
      }
      if (annons.sources[0].url) {
        url = annons.sources[0].url;
      }      
      var applyLink = document.createElement("a");
      applyLink.className = "afApply";
      applyLink.href = url;
      applyLink.target = '_blank';
      applyLink.text = i18n`Apply`;
      readMore.appendChild(applyLink);
    }
    if (annons.sista_ansokningsdag) {
      left.appendChild(dateElement);
    }
    cell.appendChild(row);
    cell.appendChild(readMore);
    newRow.appendChild(cell);
    annonsTableBody.appendChild(newRow);

  }

  var adsURL = function(sida) {
    var afw = $afWidgetContainer[0];
    var limit = afw.dataset.limit;
    var offset = 0;

    if(sida > 1 ) {
      offset = (sida * limit) - limit;
    }

    httpRequestString =
    baseUrl +
    "search?show-expired=" +
    afw.dataset.showexpired +
    "&q=" +
    afw.dataset.q +
    "&place=" +
    afw.dataset.places.split(',').join('&place=');

    return (
      httpRequestString + 
      "&offset=" + offset +
      "&limit=" + limit
    );
  };

  function getAds(sida, limit) {
    //TODO: Show waiting gif while fetching data
    // afLoadingImage

    ajax_get(adsURL(sida), function(annonsdata) {

      var afw = $afWidgetContainer[0];
      var limit = afw.dataset.limit;

      totalPages = annonsdata.total / limit;
      $pagination.twbsPagination("destroy");
      $pagination.twbsPagination(
        $.extend({}, defaultOpts, {
          totalPages: totalPages,
          startPage: sida,
          initiateStartPageClick: false
        })
      );

      $(".afTableBody").empty();
      var annonser = annonsdata.hits;
      annonser.forEach(function(annons, index, annonser) {
        addAdRow(annons, 'all');            // options all/af/old 
      });
    })
    /*
    .fail(function() {
      console.log("Couldn't get job ad from remote service");
    });
    */
  }
})(window, document);

