import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

var pagination = require('pagination');

import './css/v2/AfPbWidget.css';

(function (window, document) {

    // ---------------------------- Changeable variables start ---------------------------- //

    var logging = false;
    var scriptDomain = getScriptURL().split('script/v2/AfPbWidget.js')[0];
    var cssUrl = scriptDomain + "/css/v2/";
    var lang = 'sv'  // en or sv

    // ---------------------------- Changable variables end ---------------------------- //

    var afw, pag1;
    var ApiLimit = 2000;
    var allJobsApiUrl = "https://jobsearch.api.jobtechdev.se/market/"
    var afJobsApiUrl = "https://jobsearch.api.jobtechdev.se/";

    // ---------------------------- Helper functions start ---------------------------- //

    /**
     * Will console log a array of function trace and value of passed variable "log"
     * @param {*} log - can be string, array or object
     */
    function l(log) {
        if (logging) {
            var stack;

            try {
                throw new Error('');
            }
            catch (error) {
                stack = error.stack || '';
            }

            stack = stack.split('\n').map(function (line) { return line.trim(); });
            stack.push(numOfChar('-', log.length));
            stack.push(log);
            stack.reverse();
            console.log(stack.slice(0, -2));
        }
    }

    function numOfChar(char, count) {
        var str = '';
        var i = 0;
        do {
            i++;
            str += char;
        } while (i < count);
        return str;
    }

    function getScriptURL() {
        // IE don't support currentScript, solution = querySelector
        var script = document.currentScript || document.querySelector('script[src*="AfPbWidget.js"]')
        l('loaded script:' + script.src);
        return script.src
    }

    function getStylesheet(url) {
        var linkElement = document.createElement("link");
        linkElement.href = url;
        linkElement.rel = "stylesheet";
        var head = document.getElementsByTagName("head")[0],
            done = false;
        // Attach handlers for all browsers
        linkElement.onload = linkElement.onreadystatechange = function () {
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

    function getScript(url, success) {
        var script = document.createElement("script");
        script.src = url;
        var head = document.getElementsByTagName("head")[0],
            done = false;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
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

    function delay() {
        return new Promise(resolve => setTimeout(resolve, 1300));
    }

    function ajax_get(url, callback) {
        let reqHeader = new Headers();

        if (url.search('open-api.dev') > 1 || url.search('/vf/') > 1) {
            l('AfJobs headers set for:' + url);
            reqHeader.append('api-key', process.env.APIKEY);
        }
        else {
            l('AllJobs headers set for: ' + url);
            reqHeader.append('api-key', 'Y29tbXVuaXR5QGpvYnRlY2hkZXYuc2U');
        }

        let initObject = {
            method: 'GET', headers: reqHeader,
        };

        fetch(url, initObject)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                l(data);
                callback(data);
            })
            .catch(function (err) {
                console.log("Something went wrong!", err);
            });

    }

    function checkImageExists(imageUrl, callBack) {
        var imageData = new Image();
        imageData.onload = function () {
            callBack(true);
        };
        imageData.onerror = function () {
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
    i18n.locale = lang;
    i18n.db = {};

    i18n.set = locale => (tCurrent, ...rCurrent) => {
        var key = tCurrent.join('\x01');
        var db = i18n.db[locale] || (i18n.db[locale] = {});
        db[key] = {
            t: tCurrent.slice(),
            v: rCurrent.map((value, i) => i)
        };
        var config = {
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

    function createE(e, c, i) {
        var r = document.createElement(e);
        if (c) r.className = c;
        if (i) r.innerHTML = i;
        return r;
    }

    async function ApiUrl(cont, page, callback) {
        // defaults 
        var limit = 5;
        var offset = 0;
        var showexpired = false;
        var q = '';
        var ed = '';
        var occupationalid = "";
        var places = '';
        var occuids = '';
        var orgnumber = '';
        var httpRequestString = afJobsApiUrl;
        if (cont.dataset.source == "all") {
            var httpRequestString = allJobsApiUrl;
        }

        // fetch from container
        if (cont.dataset.limit) { limit = cont.dataset.limit; }
        if (page > 1) {
            offset = (page * limit) - limit;
        }
        if (cont.dataset.showexpired) { showexpired = cont.dataset.showexpired; }
        if (cont.dataset.q) { q = cont.dataset.q; }
        if (cont.dataset.ed) { ed = cont.dataset.ed; }
        if (cont.dataset.orgnumber) { orgnumber = cont.dataset.orgnumber; }
        /*if(cont.dataset.occupationalid) { occupationalid = cont.dataset.occupationalid; }*/
        if (cont.dataset.source != "all") {
            var promises = [];
            if (cont.dataset.places) {
                var search = cont.dataset.places.split(',');
                var response = fetchLocationId(search);
                promises.push(response);
            }
            if (cont.dataset.occupationalid) {
                var searchOccupationalid = cont.dataset.occupationalid.split(',');
                var responseOccupatinalid = fetchoccupationalid(searchOccupationalid);
                promises.push(responseOccupatinalid);
            }
            httpRequestString += "search?q=" + q +
                "&occupation-collection=" + ed +
                "&offset=" + offset +
                "&limit=" + limit;
            console.log(httpRequestString);
            if (orgnumber) {
                httpRequestString += '&employer=' + orgnumber;
            }


            Promise.all(promises).then((values) => {
                values = values.join("");
                httpRequestString += values;
                callback(httpRequestString);
            })




        } else {
            if (cont.dataset.places) {
                places = cont.dataset.places.split(',').join('&place=');
                httpRequestString += "search?show-expired=" + showexpired +
                    "&q=" + q +
                    "&place=" + places +
                    "&offset=" + offset +
                    "&limit=" + limit;
                if (orgnumber) {
                    httpRequestString += '&employer=' + orgnumber;
                }
                /*            if (occupationalid) {
                                httpRequestString += ''
                            }*/
                callback(httpRequestString);

            }
        }

    }

    function toHttps(url) {
        return url.replace('http:', 'https:');
    }

    function addAdListener(query, call) {
        [].forEach.call(document.querySelectorAll(query), function (e) {
            e.addEventListener('click', function (event) {
                event.preventDefault();
                fnCall(call, e);
            }, false);
        });
    }

    function fnCall(fn, ...args) {
        var func = (typeof fn == "string") ? window[fn] : fn;
        if (typeof func == "function") func(...args)
        else console.error(`${fn} is Not a function!`);
    }

    function addClass(e, c) {
        if (e.classList) {
            e.classList.add(c);
        }
        else {
            arr = e.className.split(" ");
            if (arr.indexOf(c) == -1) {
                e.className += " " + c;
            }
        }
    }

    function removeClass(e, c) {
        if (e.classList) {
            e.classList.remove(c);
        }
        else {
            e.className = e.className.replace(/\b"+ c +"\b/g, "");
        }
    }

    function fetchLocationId(s) {
        s = encodeURI(s);
        var url = afJobsApiUrl + 'taxonomy/search?offset=0&limit=10&show-count=false&q=' + s;

        return new Promise(resolve => ajax_get(url, function (response) {
            var places = "";

            var results = response.result;

            results.forEach(function (result) {
                if (result.type === "place" || result.type === "country" || result.type === "municipality" || result.type === "region") {
                    places += '&' + result.type + '=' + result.id;
                }
            })

            resolve(places);
        }));

    }
    function fetchoccupationalid(s) {
        s = encodeURI(s);
        var url = afJobsApiUrl + 'taxonomy/search?offset=0&limit=10&show-count=false&q=' + s;
        return new Promise(resolve => ajax_get(url, function (response) {

            var occuids = "";

            var results = response.result;

            results.forEach(function (result) {
                if (result.type === "occupation" || result.type === "occupation-group" || result.type === "occupation-field" || result.type === "occupation-name") {
                    occuids += '&' + result.type + '=' + result.id;
                }
            })
            resolve(occuids);
        }));

    }

    // ---------------------------- Helper functions end ---------------------------- //

    document.addEventListener("DOMContentLoaded", function (event) {

        // don't add widget if it exists
        var widget = document.getElementById("afModalWrapper");
        if (widget != undefined) return false;

        l('document loaded');
        afw = document.getElementById("afWidgetContainer");
        if (afw == undefined) {
            throw new Error("can't find container for widget");
        }

        getStylesheet(cssUrl + "AfPbWidget.css");
        getStylesheet("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i,800");

        var afLogoUrl = scriptDomain + "/images/logo-af.svg";
        var content = afw.innerHTML;
        afw.innerHTML = "<div class='afWidgetHeader'></div>"
            + "<div class='afGradientLine'></div>"
            + "<div style='padding: 30px; word-break: break-word;'>"
            + content
            + "</div>"
            + "<div class='afWidgetFooter'>Visa lediga jobb</div>";


        var afJobCount = document.getElementById("afJobCount");
        if (afJobCount != undefined) {

            // counter could be empty or have own values
            var cont = afJobCount;
            if (
                afJobCount.dataset.q == undefined &&
                afJobCount.dataset.showexpired == undefined &&
                afJobCount.dataset.places == undefined &&
                afJobCount.dataset.orgnumber == undefined
            ) {
                cont = afw;
            }
            ApiUrl(cont, 0, function (url) {
                ajax_get(url, function (annonsdata) {
                    var total = parseTotal(annonsdata).toString().split('');
                    afJobCount.innerHTML = '';
                    total.forEach(function (num) {
                        var el = createE("span", "letter", num);
                        afJobCount.appendChild(el);

                    });
                })
            });

        }
        var modalContent = `                
        <div id="afmodalContent">
            <div class='afmodal-header afRow'>
                <div class="afLogo"></div>
                <div class="afJtLogo"></div>
            </div>
            <div class='afGradientLine'></div>
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
        </div>`;
        var modalContent = `                
            <div id="afmodalContent">
                <div class='afmodal-header afRow'>
                    <div class="afLogo"></div>
                    <div class="afJtLogo"></div>
                </div>
                <div class='afGradientLine'></div>
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
            </div>`;

        if (afw.dataset.modal !== "false") {
            var wrapper = createE("div");
            wrapper.id = "afModalWrapper";                        
            wrapper.innerHTML = `<div id='afModal' class='afmodal' style='display: none'>
                    <a href="#close-modal" class="close-modal ">Close</a>`
                    + modalContent;
                    + `</div>`;
            document.body.appendChild(wrapper);
            wrapper.addEventListener('click', function (event) {
                if(event.srcElement == wrapper) {
                    event.preventDefault();
                    removeClass(wrapper, "afBlocker");
                    wrapper.firstChild.setAttribute("style", "display: none");
                }
            }, false);
        } else {
            afw.innerHTML = modalContent;
            getAds(1);
        }

        if (afw.dataset.modal !== "false") {
            afw.onclick = function (e) {
                e.preventDefault();
                addClass(wrapper, "afBlocker");
                wrapper.firstChild.setAttribute("style", "display: inline-block");
                getAds(1);
            };
        }

        // close modal. 
        addAdListener(".close-modal", function (e) {
            removeClass(wrapper, "afBlocker");
            wrapper.firstChild.setAttribute("style", "display: none");
        });
    });

    function parseTotal(adData) {
        l(adData);
        if (adData.total.value != undefined) {
            // af
            return adData.total.value;
        }
        else {
            // all
            return adData.total;
        }
    }

    var addAdRow = function (ad) {
        // move af data to be work as alljobs
        if (afw.dataset.source != "all") {
            ad.header = ad.headline;
            ad.location = '';
            if (ad.workplace_address.postcode) {
                ad.location += ad.workplace_address.postcode;
            }
            if (
                ad.workplace_address.municipality &&
                ad.location.search(ad.workplace_address.municipality) < 1
            ) {
                if (ad.location.length > 0) {
                    ad.location += ', ';
                }
                ad.location += ad.workplace_address.municipality;
            }
            ad.application = {};
            if (ad.application_details.email) {
                ad.application.url = 'mailto:' + ad.application_details.email;
            }
            if (ad.application_details.url) {
                ad.application.url = ad.application_details.url;
            }
            if (ad.application_deadline) {
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
        var adheadElement = createE("h3", '', ad.header);
        var jobplaceElement = createE("div", "afJobplace");
        // below header
        if (ad.employer.name != undefined) {
            jobplaceElement.innerHTML = ad.employer.name + ", ";
        }
        jobplaceElement.innerHTML += ad.location;
        row.appendChild(adheadElement);

        if (ad.application.deadline != undefined) {
            var date = new Date(ad.application.deadline).toLocaleDateString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
            var deadline = createE("span", "afDeadline", "Sista ansökningsdagen: " + date);
            row.appendChild(deadline);
        }
        row.appendChild(jobplaceElement);

        if (ad.employer.logoUrl) {
            var logoUrl = toHttps(ad.employer.logoUrl);
            checkImageExists(logoUrl, function (existsImage) {
                if (existsImage == true) {
                    var logoElement = createE("img", "afListlogo");
                    logoElement.src = logoUrl;
                    row.prepend(logoElement);
                }
                else {
                    // image not exist
                }
            });
        }
        // more info
        var readMore = createE("div", "afReadMore");
        var close = createE("a", "afAdClose", "Stäng");
        close.title = "Stäng";
        readMore.appendChild(close);
        var content = createE("article", "afAdText", ad.markup);
        readMore.appendChild(content);

        var url = '';
        if (ad.application.url) {
            url = ad.application.url;
        }
        else if (ad.sources != undefined && ad.sources[0].url) {
            url = ad.sources[0].url;
        }

        if (url.length > 1) {
            var applyLink = createE("a", "afApply");
            applyLink.href = url;
            applyLink.text = i18n`Apply`;
            // target blank for link but not email
            if (url.search('mailto') < 0) {
                applyLink.target = '_blank';
            }
            readMore.appendChild(applyLink);
        }
        if (ad.sista_ansokningsdag) {
            left.appendChild(dateElement);
        }
        cell.appendChild(row);
        cell.appendChild(readMore);
        newRow.appendChild(cell);
        return newRow;

    }

    async function getAds(page) {

        //TODO: Show waiting gif while fetching data
        ApiUrl(afw, page, function (url) {
            ajax_get(url, function (annonsdata) {
                var total = parseTotal(annonsdata);
                if (total > ApiLimit) {
                    total = ApiLimit;
                }

                if (pag1 == undefined) {
                    l('pagination inizialised');
                    pag1 = new pagination(document.getElementsByClassName('afPagination')[0],
                        {
                            currentPage: 1,	                  	// number
                            totalItems: total,                  // number
                            itemsPerPage: afw.dataset.limit,    // number
                            step: 2,			                // number
                            onInit: getAds	                    // function
                        }
                    );
                    pag1.onPageChanged(getAds);
                }

                var annonsTableBody = document.getElementById("afAnnonsTableBody");
                annonsTableBody.innerHTML = '';


                var annonser = {};
                if (annonsdata.hits) {
                    annonser = annonsdata.hits;
                }
                else {
                    annonser = annonsdata.platsannonser;
                }

                annonser.forEach(function (annons) {
                    annonsTableBody.appendChild(addAdRow(annons));
                });

                // ad opener
                addAdListener(".afTableCell .afRow", function (e) {
                    var className = e.parentNode.className;
                    document.querySelectorAll(".afTableCell").forEach(function (e) {
                        removeClass(e, "opened");
                    });
                    if (className == null || className.indexOf(" opened") < 0) {
                        e.parentNode.className += " opened";
                    }
                });

                // ad closer
                addAdListener(".afAdClose", function () {
                    document.querySelectorAll(".afTableCell").forEach(function (e) {
                        removeClass(e, "opened");
                    });
                });
            })
        });
    }
})(window, document);

