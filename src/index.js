import "./style.scss";
import axios from "axios" ;
// 抓取 API 資料，渲染畫面
const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.getElementById('showList');
let data = [];

function getData () {
    axios.get(url).then(function (response) {
        data = response.data;
        renderData();
    });
}
getData();

function renderData () {
    let str = '';
    data.forEach((item) => {
        str += `<tr>
        <td>${item.作物名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>`
        
    });
    showList.innerHTML = str;
}

// 種類篩選，在 button 裡有埋 data-type
