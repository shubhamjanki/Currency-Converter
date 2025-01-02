const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button")
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");
for (let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";  
        }else if(select.name ==="to" && code==="INR"){
            newOption.selected="selected";    
        }

        select.append(newOption);

     }
     select.addEventListener("change",(evt)=>{
        updateflag(evt.target);    
     });
}


const updateflag=(element)=>{
 let currcode=element.value;
 let countrycode=countryList[currcode];
 let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
 let img=element.parentElement.querySelector("img");   
 img.src=newsrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();  
    let amount= document.querySelector(".amount input") ;
    let amtval=amount.value;
    if(amtval==="" || amtval<=1){
        amtval=1;
        amount.value="1"
    }

   const URL =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`
    let response=await fetch(URL)
    let data= await response.json();
    console.log(response);
    let fromCurrency=fromcurr.value.toLowerCase();  
    let toCurrency=tocurr.value.toLowerCase();
    rate = data[fromCurrency][toCurrency];
     let final=rate*amtval;
     msg.innerText= ` ${amtval} ${fromcurr.value} to ${tocurr.value} is:${final} `

   
} )
