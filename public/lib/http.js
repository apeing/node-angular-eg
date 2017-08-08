/**
 * Created by Administrator on 2017/8/2.
 */
(function () {
    function getHttpRequest(){
        if (window.XMLHttpRequest)
            return new XMLHttpRequest();
        return new ActiveXObject('Microsoft.XMLHTTP');
    }

    function sendPostRequest(url, headers, body, callback){
        var xmlhttp = getHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4){
                if(xmlhttp.status==201){
                    callback(null, JSON.parse(xmlhttp.responseText || null));
                } else{
                    callback({status: xmlhttp.status, response: xmlhttp.responseText}, null);
                }

            }
        };
        xmlhttp.open('POST', url, true);
        for(var key in headers){
            xmlhttp.setRequestHeader(key, headers[key]);
        }
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        xmlhttp.send(JSON.stringify(body));
    }

    function sendGetRequest(url, headers, callback){
        var xmlhttp = getHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4) {// 4 = "loaded"
                if (xmlhttp.status==200) {// 200 = OK
                    callback(null, JSON.parse(xmlhttp.responseText));
                    return;
                } else{
                    callback({status: xmlhttp.status, response: xmlhttp.responseText});
                }
            }
        };
        xmlhttp.open('GET', url, true);
        for(var key in headers){
            xmlhttp.setRequestHeader(key, headers[key]);
        }
        xmlhttp.send();
    }
    window.http = {
        post: sendPostRequest,
        get: sendGetRequest
    };

})();