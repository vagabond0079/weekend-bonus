'use strict';

var hoursOfOperation = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

// ========== CookieShop Object Constructor ==========

function CookieShop(shopLoc, minCust, maxCust, avgCookiePerCust){
  this.shopLoc = shopLoc;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePerCust = avgCookiePerCust;
  this.totalCustEachHour = [];
  this.totalCookiesPerHour = [];
  this.totalStaffPerHour = [];
}

CookieShop.prototype.randomCust = function() {
  for( var i = hoursOfOperation.length; i > 0; i--) {
    this.totalCustEachHour.push (Math.floor (Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
  }
};

CookieShop.prototype.cookiesPerHour = function() {
  for( var i = 0; i < this.totalCustEachHour.length; i++) {
    this.totalCookiesPerHour.push (Math.floor (this.totalCustEachHour[i] * this.avgCookiePerCust));
    this.totalStaffPerHour.push ( Math.max ( 2, (Math.ceil (this.totalCookiesPerHour[i]/20))));
  }
};

// ========== Add CookieShop Rows to Sales Report Table ==========

CookieShop.prototype.salesReportTableRows = function() {
  var newEl = document.createElement('tr');
  newEl.id = this.shopLoc + ' row';
  var position = document.getElementById('salesReportTable');
  position.appendChild(newEl);

  newEl = document.createElement('th');
  newEl.className = 'firstCol';
  var newText = document.createTextNode(this.shopLoc);
  newEl.appendChild(newText);
  position = document.getElementById(this.shopLoc + ' row');
  position.appendChild(newEl);

  var total = 0;
  for( var i in this.totalCookiesPerHour) {
    total += this.totalCookiesPerHour[i];
  }

  this.totalCookiesPerHour.push(total);

  for (i = 0; i <= hoursOfOperation.length; i++){
    newEl = document.createElement('td');
    newText = document.createTextNode(this.totalCookiesPerHour[i]);
    newEl.appendChild(newText);
    position = document.getElementById(this.shopLoc + ' row');
    position.appendChild(newEl);
  }

  CookieShop.prototype.staffReportTableRows = function() {
    var newEl = document.createElement('tr');
    newEl.id = this.shopLoc + ' row Staff';
    var position = document.getElementById('staffReportTable');
    position.appendChild(newEl);

    newEl = document.createElement('th');
    newEl.className = 'firstCol';
    var newText = document.createTextNode(this.shopLoc);
    newEl.appendChild(newText);
    position = document.getElementById(this.shopLoc + ' row Staff');
    position.appendChild(newEl);

    var total = 0;
    for( var i in this.totalStaffPerHour) {
      total += this.totalStaffPerHour[i];
    }

    this.totalStaffPerHour.push(total);

    for (i = 0; i <= hoursOfOperation.length; i++){
      newEl = document.createElement('td');
      newText = document.createTextNode(this.totalStaffPerHour[i]);
      newEl.appendChild(newText);
      position = document.getElementById(this.shopLoc + ' row Staff');
      position.appendChild(newEl);
    }
  };
};

// ========== Create CookieShop Objects ==========

var cookieShopFirstPike = new CookieShop('First and Pike', 23, 65, 6.3);
var cookieShopSeatacAirport = new CookieShop('Seatac Airport', 3, 24, 1.2);
var cookieShopSeattleCenter = new CookieShop('Seattle Center', 11, 38, 3.7);
var cookieShopCapitolHill = new CookieShop('Capitol Hill', 20, 38, 3.2);
var cookieShopAlki = new CookieShop('Alki', 2, 16, 4.6);

var cookieShops = [cookieShopFirstPike, cookieShopSeatacAirport, cookieShopSeattleCenter, cookieShopCapitolHill, cookieShopAlki];

for(var i = 0; i < cookieShops.length; i++) {
  cookieShops[i].randomCust();
  cookieShops[i].cookiesPerHour();
}

// ========== Add Sales Report Table and Heading Rows ==========

function salesReportTableHead (){
  var newEl = document.createElement('table');
  newEl.id = 'salesReportTable';
  var position = document.getElementById('tableWrap');
  position.appendChild(newEl);

  newEl = document.createElement('thead');
  newEl.id = 'colHeaders';
  position = document.getElementById('salesReportTable');
  position.appendChild(newEl);

  newEl = document.createElement('tr');
  newEl.id = 'colHeadersRow';
  position = document.getElementById('colHeaders');
  position.appendChild(newEl);

  newEl = document.createElement('th');
  newEl.className = 'firstCol';
  newEl.className = 'topLeft';
  var newText = document.createTextNode('Daily Sales Report');
  newEl.appendChild(newText);
  position = document.getElementById('colHeadersRow');
  position.appendChild(newEl);

  for (var i = 0; i < hoursOfOperation.length; i++){
    newEl = document.createElement('th');
    newText = document.createTextNode(hoursOfOperation[i]);
    newEl.appendChild(newText);
    position = document.getElementById('colHeadersRow');
    position.appendChild(newEl);
  }

  newEl = document.createElement('th');
  newText = document.createTextNode('Daily Location Total');
  newEl.appendChild(newText);
  position = document.getElementById('colHeadersRow');
  position.appendChild(newEl);
}

// ========== Array for Total Cookies Sold Per Hour from All Shops ==========

var cookieTotalsPerHourAllShops = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

for(i = 0; i < cookieShops.length; i++){
  for(var j = 0; j < hoursOfOperation.length; j++){
    cookieTotalsPerHourAllShops[j] = cookieTotalsPerHourAllShops[j] + cookieShops[i].totalCookiesPerHour[j];
  }
}

var total = 0;
for( i in cookieTotalsPerHourAllShops) {
  total += cookieTotalsPerHourAllShops[i];
}

cookieTotalsPerHourAllShops.push(total);

// ========== Add Sales Report Table Footer and Totals Row ==========

function salesReportTableFoot (){
  var newEl = document.createElement('tfoot');
  newEl.id = 'colTotals';
  var position = document.getElementById('salesReportTable');
  position.appendChild(newEl);

  newEl = document.createElement('tr');
  newEl.id = 'colTotalsRow';
  position = document.getElementById('colTotals');
  position.appendChild(newEl);

  newEl = document.createElement('th');
  newEl.className = 'firstCol';
  var newText = document.createTextNode('Totals:');
  newEl.appendChild(newText);
  position = document.getElementById('colTotalsRow');
  position.appendChild(newEl);

  for (var i = 0; i <= hoursOfOperation.length; i++){
    newEl = document.createElement('td');
    newText = document.createTextNode(cookieTotalsPerHourAllShops[i]);
    newEl.appendChild(newText);
    position = document.getElementById('colTotalsRow');
    position.appendChild(newEl);
  }
}

// ========== Create Staff Report Table and Headings Row ==========

function staffReportTableHead (){
  var newEl = document.createElement('table');
  newEl.id = 'staffReportTable';
  var position = document.getElementById('tableWrap');
  position.appendChild(newEl);

  newEl = document.createElement('thead');
  newEl.id = 'colHeadersStaff';
  position = document.getElementById('staffReportTable');
  position.appendChild(newEl);

  newEl = document.createElement('tr');
  newEl.id = 'colHeadersRowStaff';
  position = document.getElementById('colHeadersStaff');
  position.appendChild(newEl);

  newEl = document.createElement('th');
  newEl.className = 'firstCol';
  newEl.className = 'topLeft';
  var newText = document.createTextNode('Daily Staff Report');
  newEl.appendChild(newText);
  position = document.getElementById('colHeadersRowStaff');
  position.appendChild(newEl);

  for (var i = 0; i < hoursOfOperation.length; i++){
    newEl = document.createElement('th');
    newText = document.createTextNode(hoursOfOperation[i]);
    newEl.appendChild(newText);
    position = document.getElementById('colHeadersRowStaff');
    position.appendChild(newEl);
  }

  newEl = document.createElement('th');
  newText = document.createTextNode('Total Staff Hours');
  newEl.appendChild(newText);
  position = document.getElementById('colHeadersRowStaff');
  position.appendChild(newEl);
}

// ========== Array for Total Staff Hours from All Shops ==========

var staffTotalsPerHourAllShops = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

for(i = 0; i < cookieShops.length; i++){
  for(j = 0; j < hoursOfOperation.length; j++){
    staffTotalsPerHourAllShops[j] = staffTotalsPerHourAllShops[j] + cookieShops[i].totalStaffPerHour[j];
  }
}

total = 0;
for( i in staffTotalsPerHourAllShops) {
  total += staffTotalsPerHourAllShops[i];
}

staffTotalsPerHourAllShops.push(total);

// ========== Create Staff Report Footer and Totals Row  ==========

function staffReportTableFoot (){
  var newEl = document.createElement('tfoot');
  newEl.id = 'colTotalsStaff';
  var position = document.getElementById('staffReportTable');
  position.appendChild(newEl);

  newEl = document.createElement('tr');
  newEl.id = 'colTotalsRowStaff';
  position = document.getElementById('colTotalsStaff');
  position.appendChild(newEl);

  newEl = document.createElement('th');
  newEl.className = 'firstCol';
  var newText = document.createTextNode('Totals:');
  newEl.appendChild(newText);
  position = document.getElementById('colTotalsRowStaff');
  position.appendChild(newEl);

  for (var i = 0; i <= hoursOfOperation.length; i++){
    newEl = document.createElement('td');
    newText = document.createTextNode(staffTotalsPerHourAllShops[i]);
    newEl.appendChild(newText);
    position = document.getElementById('colTotalsRowStaff');
    position.appendChild(newEl);
  }
}

// ========== Render Tables to View ==========

salesReportTableHead(cookieShops);

for(i = 0; i < cookieShops.length; i++){
  cookieShops[i].salesReportTableRows();
}

salesReportTableFoot();

staffReportTableHead();

for(i = 0; i < cookieShops.length; i++){
  cookieShops[i].staffReportTableRows();
}

staffReportTableFoot();

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

// ========== Event Handler for Crate Cookie Shop Form Submit ==========

function handleCookieShopCreate(event) {
  event.preventDefault();

  var form = event.target;

  var store = camelize(form.shopLoc.value);
  var shopLoc = form.shopLoc.value;
  var minCust = parseInt(form.minCust.value);
  var maxCust = parseInt(form.maxCust.value);
  var avgCookiePerCust = parseFloat(form.avgCookiePerCust.value);

  store = new CookieShop(shopLoc, minCust, maxCust, avgCookiePerCust);
  store.randomCust();
  store.cookiesPerHour();

  cookieShops.push(store);

  document.getElementById('tableWrap').innerHTML = '';

  salesReportTableHead(cookieShops);

  for(i = 0; i < cookieShops.length; i++){
    cookieShops[i].salesReportTableRows();
  }

  salesReportTableFoot();

  staffReportTableHead();

  for(i = 0; i < cookieShops.length; i++){
    cookieShops[i].staffReportTableRows();
  }

  staffReportTableFoot();
}

var cookieShopCreate = document.getElementById('cookieShopCreate');
cookieShopCreate.addEventListener ('submit', handleCookieShopCreate);
