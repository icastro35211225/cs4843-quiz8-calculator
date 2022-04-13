function calc(opcode){
    const data1 = document.getElementById("data1");
    const data2 = document.getElementById("data2");
    const serverresponse = document.getElementById("serverresponse");

    let request = new XMLHttpRequest();
    request.open("GET","https://us-central1-oow237quiz8.cloudfunctions.net/oo237-calc?operation="+opcode+"&data1="+data1.value+"&data2="+data2.value,true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(null);
    request.onreadystatechange = function() {
        switch(this.readyState){
            case 0:
                serverresponse.innerText="Not initialized connection";
                break;
            case 1:
                serverresponse.innerText="Server connection established";
                break;
            case 2:
                serverresponse.innerText="Server recieved the request";
                break;
            case 3:
                serverresponse.innerText="Server is processing the request";
                break;
            case 4:
                if (request.status!=200) {
                    serverresponse.classList.remove("alert-primary");
                    serverresponse.classList.add("alert-danger");
                    serverresponse.innerText="Server gave the error " + request.status + ": " + this.responseText;
                } else {
                    serverresponse.classList.remove("alert-danger");
                    serverresponse.classList.add("alert-primary");
                    serverresponse.innerText = this.responseText;
                }
                break;
        }
    }
}

function pushToPubSub(){
    const serverresponse = document.getElementById("serverresponse");
    console.log(serverresponse);
    let request = new XMLHttpRequest();
    request.open("GET","https://us-central1-oow237quiz8.cloudfunctions.net/oo237-calc?publish=true&result="+serverresponse,true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(null);
    request.onreadystatechange = function() {
        switch(this.readyState){
            case 0:
                serverresponse.innerText="Not initialized connection";
                break;
            case 1:
                serverresponse.innerText="Server connection established";
                break;
            case 2:
                serverresponse.innerText="Server recieved the request";
                break;
            case 3:
                serverresponse.innerText="Server is processing the request";
                break;
            case 4:
                if(request.status!=200) {
                    serverresponse.innerText="Server gave the error " + request.status+": " + this.responseText;
                } else {
                    serverresponse.innerText = this.responseText;
                }
                break;
        }
    }
}