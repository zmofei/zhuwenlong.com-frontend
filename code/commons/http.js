 // http function
 function http(obj) {
   var url = obj.url;
   var method = obj.method || 'get';
   var data = obj.data || {};
   var dataStr = '';
   var argcount = 0;
   var timeout = 5000;

   for (var key in data) {
     if (argcount++) {
       dataStr += '&';
     }
     dataStr += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
   }

   var client = new XMLHttpRequest();
   client.responseType = 'json';
   client.open(method, url);
   client.send(dataStr);
   client.onload = function() {
     clearTimeout(timeoutTest);
     if (this.status >= 200 && this.status < 300) {
       obj.success && obj.success(this.response);
     }
   }
   client.onerror = function() {
     clearTimeout(timeoutTest);
     obj.error && obj.error(this.statusText);
   }

   var timeoutTest = setTimeout(function() {
     obj.error && obj.error('timeout abort');
     client.abort();
   }, timeout)
 }

 export default http;