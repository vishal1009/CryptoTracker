const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
var upd;


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype=form.elements.coinType.value;
    console.log(ctype);
    fetchPrice(ctype);
    


});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  };

const fetchPrice= async(ctype)=>{
    const r= await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
    const price=r.data.ticker.price;
    const volume=r.data.ticker.volume;
    const change=r.data.ticker.change;
    const base=r.data.ticker.base;
    const target=r.data.ticker.target;
    const time = timeConverter(r.data.timestamp);
    var col= "green";
    if(change<0){
        col = "red";
    }
    res.innerHTML=`
<thead class="thead-dark">
<tr>
<th scope="col">Propery</th>
<th scope="col">Value</th>
</tr>
</thead>
<tbody>
<tr class="table-light">
    <td>${base}</td>
    <td style="color:${col};"id="test">${price} ${target}</td>
</tr>
<tr class="table-light">
    <td>Volume</td>
    <td>${volume}</td>
</tr>
<tr class="table-light">
    <td>Change</td>
    <td style="color:${col};">${change}</td>
</tr>
<tr class="table-light">
    <td>Last Update</td>
    <td>${time}</td>
</tr>
<tbody>
`
upd=setTimeout(()=>fetchPrice(ctype),1000);
    

}

 