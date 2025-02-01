window.addEventListener("DOMContentLoaded", function () {
    openPage("historia", "container");
});

function openPage(x, y) {
    var indice = x; 
    var target = y; 

    if (!localStorage.getItem("objs")) {
        const objs = {};
        localStorage.setItem("objs", JSON.stringify(objs));
    }

    var ob = JSON.parse(localStorage.getItem("objs"));

    if (!(indice in ob)) {
        ob[indice] = {};
        localStorage.setItem("objs", JSON.stringify(ob));
    }

    var url = 'content/' + indice + '.html'

    var xml = new XMLHttpRequest()

    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200 ) {
            document.getElementById(target).innerHTML = xml.responseText

            identificar(indice)

            let a  = [...document.querySelectorAll("input")]
                a.map((evt) =>{
                    evt.addEventListener("click", (e)=>{
                    let id = e.target.id
                    let objeto = JSON.parse(localStorage.getItem("objs"))
                    objeto[indice][id] = !objeto[indice][id]
                    localStorage.setItem("objs", JSON.stringify(objeto));       
                })
            })


        }
    }

    xml.open("GET", url, true)
    
    xml.send()
}


function identificar(indice) {
    let objs = JSON.parse(localStorage.getItem("objs")) || {};

    if(Object.keys(objs[indice]).length === 0){
        let a = [...document.querySelectorAll("input")];
        a.map((evt) => {
            let name = evt.id; 
            objs[indice][name] = evt.checked; 
        });
        localStorage.setItem("objs", JSON.stringify(objs));
    }

    let b = [...document.querySelectorAll("input")]
    b.map((ele)=>{
        let ident = ele.id
        let value = objs[indice][ident]
        ele.checked = value
    }) 
}











