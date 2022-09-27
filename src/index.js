const URL =
  "https://script.google.com/macros/s/AKfycbxUFFZPEGtR-REdDwMH5Tqm5PLHm-5GuRUBdRItPY2QFXd0iKJhBtYmkqVOwxINUIxq/exec";

// login function
const showEle = (element) => {
  element.classList.remove("hidden");
};
const hiddenEle = (element) => {
  element.classList.add("hidden");
};
const modalEle = document.querySelector(".modal");
const handleLogin = () => {
  let userName = document.querySelector("#userName").value;
  let passWord = document.querySelector("#passWord").value;
  let cautionEle = document.querySelector(".login-form .caution");
  if (userName === "" || passWord === "") {
    cautionEle.innerHTML = "Nhập đủ thông tin";
    showEle(cautionEle);
    return;
  }
  showEle(modalEle);

  let submitData = {
    type: "login",
    data: {
      user: userName,
      password: passWord
    }
  };

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      hiddenEle(modalEle);
      if (data.status) {
        showEle(document.querySelector(".nav"))
        showEle(document.querySelector("#searchStore"));
        hiddenEle(document.querySelector(".login-form"));
        return;
      }
      if (!data.status) {
        cautionEle.innerHTML = "thông tin đăng nhập sai";
        hiddenEle(modalEle);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Đăng nhập không thành công, hãy thử lại");
      hiddenEle(modalEle);
    });
};

let userNameInput = document.querySelector("#userName");
let passWordInput = document.querySelector("#passWord");
let loginBtn = document.querySelector("#loginBtn");
let cautionEle = document.querySelector(".login-form .caution");
loginBtn.addEventListener("click", handleLogin);
userNameInput.addEventListener("input", () => {
  hiddenEle(cautionEle);
});
passWordInput.addEventListener("input", () => {
  hiddenEle(cautionEle);
});
// nav function
let navEmp = document.querySelector("#navEmp")
let navStore = document.querySelector("#navStore")

navEmp.addEventListener('click',()=>{
  hiddenEle(document.querySelector('#searchStore'))
  showEle(document.querySelector('#searchEmp'))
  navEmp.classList.add('nav-active')
  navStore.classList.remove('nav-active')
})

navStore.addEventListener('click',()=>{
  showEle(document.querySelector('#searchStore'))
  hiddenEle(document.querySelector('#searchEmp'))
  navStore.classList.add('nav-active')
  navEmp.classList.remove('nav-active')
})


// search infor function
let searchSiteInput = document.querySelector("#searchSite");
let searchNameInput = document.querySelector("#searchName");
let searchAddInput = document.querySelector("#searchAdd");
let searchBtn = document.querySelector("#searchBtn");
let cautionSearchEle = document.querySelector(".search-form .caution");

const renderSearchStoreData = (data) => {
  const searchResultEle = document.querySelector(".search-result");
  data.result.forEach((item) => {
    searchResultEle.innerHTML =
      searchResultEle.innerHTML +
      `
    <div class="search-result-item">
        <div class="infor-group">
          <div class="infor">
            <span class="infor-title">Site</span>
            <p class="infor-detail">${item.site}</p>
          </div>
          <div class="infor">
            <span class="infor-title">Tên CH</span>
            <p class="infor-detail">${item.siteName}</p>
          </div>
          <div class="infor">
            <span class="infor-title">KSTT</span>
            <p class="infor-detail">${item.KSTT}</p>
          </div>
          <div class="infor">
            <span class="infor-title">Địa chỉ</span>
            <p class="infor-detail">
                <a href="https://maps.google.com/?q=${item.lat},${item.long}"><i class="fas fa-map-marker-alt"></i></a>
                ${item.address}
            </p>
          </div>  
        </div>
          <i class="fas fa-angle-down"></i>
        
        <div class="search-result--accordian">
          <div class="infor-group">
            <div class="infor">
              <span class="infor-title">CHT</span>
              <p class="infor-detail">${item.CHT}</p>
            </div>
            <div class="infor">
              <span class="infor-title">SDT</span>
              <p class="infor-detail">${item.CHTPhone}</p>
            </div>
          </div>
          <div class="infor-group">
            <div class="infor">
              <span class="infor-title">QLKV</span>
              <p class="infor-detail">${item.QLKV}</p>
            </div>
            <div class="infor">
              <span class="infor-title">GDV</span>
              <p class="infor-detail">${item.GDV}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  addArrowFunction();
};

const addArrowFunction = () => {
  let searchItemEleList = document.querySelectorAll(".search-result-item");

  searchItemEleList.forEach((item) => {
    let arrowEle = item.querySelector(".fa-angle-down");
    arrowEle.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
};

const handleSearch = () => {
  if (
    searchNameInput.value === "" &&
    searchSiteInput.value === "" &&
    searchAddInput.value === ""
  ) {
    cautionSearchEle.innerHTML = "Nhập thông tin để tìm kiếm";
    showEle(cautionSearchEle);
    return;
  }

  showEle(modalEle);

  let submitData = {
    type: "search",
    data: {
      site: searchSiteInput.value,
      siteName: searchNameInput.value,
      siteAdd: searchAddInput.value
    }
  };

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      hiddenEle(modalEle);
      renderSearchStoreData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra, hãy thử lại");
      hiddenEle(modalEle);
    });
};

searchSiteInput.addEventListener("input", () => {
  hiddenEle(cautionSearchEle);
});

searchNameInput.addEventListener("input", () => {
  hiddenEle(cautionSearchEle);
});

searchAddInput.addEventListener("input", () => {
  hiddenEle(cautionSearchEle);
});

searchBtn.addEventListener("click", handleSearch);

// handleSearchEmployee function

let searchDept = document.querySelector('#searchDept')
let searchPart = document.querySelector('#searchPart')
let searchPosition = document.querySelector('#searchPosition')
let searchEmpName = document.querySelector('#searchEmpName')
let searchEmpBtn = document.querySelector('#searchEmpBtn')

const renderSearchEmpData = (data) => {
  const searchResultEle = document.querySelector("#searchEmp .search-result");
  data.result.forEach((item) => {
    searchResultEle.innerHTML =
      searchResultEle.innerHTML +
      `
    <div class="search-result-item">
        <div class="infor-group">
          <div class="infor">
            <span class="infor-title">Site</span>
            <p class="infor-detail">${item.site}</p>
          </div>
          <div class="infor">
            <span class="infor-title">Tên CH</span>
            <p class="infor-detail">${item.siteName}</p>
          </div>
          <div class="infor">
            <span class="infor-title">KSTT</span>
            <p class="infor-detail">${item.KSTT}</p>
          </div>
          <div class="infor">
            <span class="infor-title">Địa chỉ</span>
            <p class="infor-detail">
                <a href="https://maps.google.com/?q=${item.lat},${item.long}"><i class="fas fa-map-marker-alt"></i></a>
                ${item.address}
            </p>
          </div>  
        </div>
          <i class="fas fa-angle-down"></i>
        
        <div class="search-result--accordian">
          <div class="infor-group">
            <div class="infor">
              <span class="infor-title">CHT</span>
              <p class="infor-detail">${item.CHT}</p>
            </div>
            <div class="infor">
              <span class="infor-title">SDT</span>
              <p class="infor-detail">${item.CHTPhone}</p>
            </div>
          </div>
          <div class="infor-group">
            <div class="infor">
              <span class="infor-title">QLKV</span>
              <p class="infor-detail">${item.QLKV}</p>
            </div>
            <div class="infor">
              <span class="infor-title">GDV</span>
              <p class="infor-detail">${item.GDV}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  addArrowFunction();
};