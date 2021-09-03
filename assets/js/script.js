// Humburger toogle menu icon start
let hamburger = document.querySelector('.humburger');
let menu1 = document.querySelector('.main-menu');
// toggles hamburger menu in and out when clicking on the hamburger
hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    menu1.classList.toggle('active');
})
// Humburger toogle menu icon end

// Form validation start
let form = document.querySelector('.contact-form');
let fname = document.querySelector('.fname');
let email = document.querySelector('.email');
let msg = document.querySelector('.msg');
let userCheck = /^[A-Za-z. ]{3,30}$/;
let emailexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let flag = true;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validation();
    if (flag) {
        alert("Thank you..! form successully submited");
        resetForm();
    }
});

function validation() {
    if (!fname.value || !userCheck.test(fname.value)) {
        setError(fname, '*This filed required');
        flag = false;
    } else {
        flag = true;
        fname.parentElement.querySelector('.error').classList.remove("showerror");
    }

    if (!email.value || !emailexp.test(email.value)) {
        setError(email, '*This filed required');
        flag = false;
    } else {
        flag = true;
        email.parentElement.querySelector('.error').classList.remove("showerror");
    }

    if (!msg.value || !userCheck.test(msg.value)) {
        setError(msg, '*This filed required');
        flag = false;
    } else {
        flag = true;
        msg.parentElement.querySelector('.error').classList.remove("showerror");
    }
}

function setError(input, message) {
    let formControl = input.parentElement;
    formControl.querySelector('.error').innerText = message;
    formControl.querySelector('.error').classList.add("showerror")
}

function resetForm() {
    fname.value = '';
    email.value = '';
    msg.value = '';
}
// Form validation end

// -------------------------------------------india live updates starts
var page_path = window.location.href;
if (page_path.includes('index.html')) {
    var stateData = document.querySelector('.state-data');
    var loadMoreBtn = document.querySelector('.fetchBtn');
    var loadData = 10;
    var arrLength;

    window.addEventListener('load', loadXMLDoc)

    function loadXMLDoc() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            var html = '';

            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    data = JSON.parse(xmlhttp.responseText);
                    arrLength = data.statewise.length;
                    for (var i = 0; i < loadData; i++) {
                        var filterIndexData = data.statewise[i];
                        html += `
                        <ul class="state-data">
                        <li>
                          <ul class="info-one info">
                            <li>
                              <h4>state</h4>
                            </li>
                            <li>${filterIndexData.state}</li>
                          </ul>
                        </li>
                        <li>
                          <ul class="info-two info">
                            <li>
                              <h4>confirmed</h4>
                            </li>
                            <li>${filterIndexData.confirmed}</li>
                          </ul>
                        </li>
                        <li>
                          <ul class="info-three info">
                            <li>
                              <h4>active</h4>
                            </li>
                            <li>${filterIndexData.active}</li>          
                          </ul>
                        </li>
                        <li>
                          <ul class="info-four info">
                            <li>
                              <h4>recovered</h4>
                            </li>
                            <li>${filterIndexData.recovered}</li>          
                          </ul>
                        </li>          
                        <li>
                          <ul class="info-three info">
                            <li>
                              <h4>deaths</h4>
                            </li>
                            <li>${filterIndexData.deaths}</li>         
                          </ul>
                        </li>
                      </ul> `
                        stateData.innerHTML = html
                    }
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }
            }
        };
        xmlhttp.open("GET", "https://data.covid19india.org/data.json", true);
        xmlhttp.send();
    }
    //load More
    loadMoreBtn.addEventListener('click', function () {
        loadData = loadData + 10;
        if (loadData > arrLength) {
            loadData = arrLength;
            loadMoreBtn.classList.add("hiddenBtn");
        }
        console.log(loadData)
        loadXMLDoc();
    });
    //for slide to top 
    var gotoTop = document.getElementsByClassName("top")[0];
    var backTop = function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }
    gotoTop.addEventListener('click', backTop)
    gotoTop.addEventListener('click', function (event) { event.preventDefault() })
}

// -------------------------------------------statewise starts

var page_path = window.location.href;
if (page_path.includes('state.html')) {
    var select = document.querySelector('.select');

    window.addEventListener('load', statedata)
    function statedata() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            var html = "<option value='---Select State---'>---Select State---</option>";

            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    data = JSON.parse(xmlhttp.responseText);
                    data.statewise.forEach(function (value) {
                        // display all state name in form select dropdown
                        html += `<option value="${value.state}">${value.state}</option>`
                        select.innerHTML = html
                    });
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "https://data.covid19india.org/data.json", true);
        xmlhttp.send();
    }

    var select = document.querySelector("select[name='select-state']")
    select.addEventListener('change', function (e) {
        e.preventDefault();
        var stateValue = document.querySelector("select[name='select-state']");
        var stateVal = stateValue.options[stateValue.selectedIndex].text;
        if (stateVal.length === 0) {
            //errormsg()
            return false
        }

        var state = document.querySelector(".statewise")
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            var html = '';

            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    data = JSON.parse(xmlhttp.responseText);
                    data.statewise.forEach(function (value) {
                        if (value.state == stateVal) {
                            html += ` <li>
                                        <h3>Confirmed</h3>
                                        <p>${value.confirmed}</p>
                                    </li>
                                    <li>
                                        <h3>Active</h3>
                                        <p>${value.active}</p>
                                    </li>
                                    <li>
                                        <h3>Recovered</h3>
                                        <p>${value.recovered}</p>
                                    </li>
                                    <li>           
                                        <h3>Deaths</h3>
                                        <p>${value.deaths}</p>
                                    </li>`
                        }
                        state.innerHTML = html
                    });
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "https://data.covid19india.org/data.json", true);
        xmlhttp.send();
    });
}
// -------------------------------------------statewise end

// -------------------------------------------datewise starts

var page_path = window.location.href;
if (page_path.includes('date.html')) {
    var select = document.querySelector('.select');


    window.addEventListener('load', datewisedata)

    function datewisedata() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            var html = "<option value=''>---Select Date---</option>";

            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    data = JSON.parse(xmlhttp.responseText);
                    data.cases_time_series.forEach(function (value) {
                        // display dates in form select dropdown
                        html += `<option value="${value.date}">${value.date}</option>`
                        select.innerHTML = html
                    });
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "https://data.covid19india.org/data.json", true);
        xmlhttp.send();
    }

    var select = document.querySelector("select[name='select-date']")
    select.addEventListener('change', function (e) {
        e.preventDefault();
        var dateValue = document.querySelector("select[name='select-date']");
        var dateVal = dateValue.options[dateValue.selectedIndex].text;
        if (dateVal.length === 0) {
            return false
        }

        var date = document.querySelector(".datewise")
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            var html = '';

            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    data = JSON.parse(xmlhttp.responseText);
                    data.cases_time_series.forEach(function (value) {

                        if (value.date == dateVal) {
                            html += `<li>  
                                        <h4>Date</h4>
                                        <p>${value.dateymd}</p>
                                    </li>
                                    <li>
                                        <h4>Confirmed</h4>
                                        <p>${value.totalconfirmed}</p>
                                    </li>                  
                                    <li>
                                        <h4>Recovered</h4>
                                        <p>${value.totalrecovered}</p>
                                    </li>
                                    <li>
                                        <h4>Deaths</h4>
                                        <p>${value.totaldeceased}</p>
                                    </li> `
                        }
                        date.innerHTML = html
                    });
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "https://data.covid19india.org/data.json", true);
        xmlhttp.send();
    });
}







