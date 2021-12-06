import css from "./style.scss";
import axios from "axios" ;
// 抓取 API 資料，渲染畫面
const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.getElementById('showList');
let data = [];

function getData () {
    axios.get(url).then(function (response) {
        data = response.data;
        renderData(data);
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
        let tabs = document.querySelectorAll('.button-group button');
        // 利用回圈拿掉按鈕的 active 樣式
        tabs.forEach((item) => {
            item.classList.remove('active');
        });
        // 取出埋在 html 裡的 data-type 的值賦予到變數 type 上
        let type = e.target.dataset.type;
        // 用 if 判斷式去判斷是 N04、N05、N06 哪一個，並在裡面用 filter 篩選資料再渲染出來
        // let filterData = [];
        if (type === 'N04') {
            // 宣告一個空陣列來存放篩選出來的資料
            changeType(type);
            e.target.classList.add('active');
        } else if (type === 'N05') {
            changeType(type);
            e.target.classList.add('active');
        } else if (type === 'N06') {
            changeType(type);
            e.target.classList.add('active');
        };
        // renderData(filterData);
    };
});

// 將判斷 type 裏面 filter 重複的地方，重新包裝成一個函式
function changeType (type) {
    let filterData = [];
    filterData = data.filter((item) => {
        if (item.種類代碼 === type) {
            return item;
        }
    });
    renderData(filterData);
};

// 搜尋資料
const searchGroup = document.querySelector('.search-group');

searchGroup.addEventListener('click', function (e) {
    const inputSearch = document.getElementById('crop');
    // 透過 if 判斷是否點擊到按鈕
    if (e.target.nodeName === 'BUTTON') {
        // 用 trim 濾掉空白字串，若為空白就中斷函式
        if (inputSearch.value.trim() === '') {
            alert('請輸入想要知道的作物唷！')
            return;
        }
        let filterData = [];
        // 利用 filter 跟 match 來篩選資料
        filterData = data.filter((item) => {
            return (item.作物名稱 && item.作物名稱.match(inputSearch.value.trim()));
        });
        // 若找不到資料（也就是篩選後資料長度為 0 ，就顯示找不到
        if (filterData.length == 0) {
            showList.innerHTML = `<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>`;
        } else {
            renderData(filterData);
        }
    }
});
