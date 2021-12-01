import "./style.scss";
import axios from "axios" ;
// 抓取 API 資料，渲染畫面
const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.getElementById('showList');
let data = [];

function getData () {
    axios.get(url).then(function (response) {
        data = response.data;
        // renderData();
    });
}
getData();

function renderData (showData) {
    let str = '';
    showData.forEach((item) => {
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
// 監聽三個按鈕的大區塊
const buttonGroup = document.querySelector(".button-group");

buttonGroup.addEventListener('click',function (e) {
    // 透過 if 判斷式判斷是否點到按鈕
    if (e.target.nodeName === 'BUTTON') {
        // 宣告這三個按鈕的節點，tabs 為類陣列
        const tabs = document.querySelectorAll('.button-group button');
        // 利用回圈拿掉按鈕的 active 樣式
        tabs.forEach((item) => {
            e.target.classList.remove('active');
        });
        // 取出埋在 html 裡的 data-type 的值賦予到變數 type 上
        let type = e.target.dataset.type;
        // 用 if 判斷式去判斷是 N04、N05、N06 哪一個，並在裡面用 filter 篩選資料再渲染出來
        let filterData = [];
        if (type === 'N04') {
            // 宣告一個空陣列來存放篩選出來的資料
            filterData = data.filter((item) => {
                if (item.種類代碼 === 'N04') {
                    return item;
                }
            });
        } else if (type === 'N05') {
            filterData = data.filter((item) => {
                if (item.種類代碼 === 'N05') {
                    return item;
                }
            });
        } else if (type === 'N06') {
            filterData = data.filter((item) => {
                if (item.種類代碼 === 'N06') {
                    return item;
                }
            });
        };
        renderData(filterData);
    };
})