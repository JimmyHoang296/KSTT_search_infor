const URL =
  "https://script.google.com/macros/s/AKfycbyBTd54B-a6LAw5woI1DFKu-mbTNCAMqnwn4arJAJuPsuFsejtGzQfeQmbCQqbqciBq/exec";

// login function
const showEle = (element) => {
  element.classList.remove("hidden");
};
const hiddenEle = (element) => {
  element.classList.add("hidden");
};

const handleLogin = () => {
  let userName = document.querySelector("#userName").value;
  let passWord = document.querySelector("#passWord").value;
  let cautionEle = document.querySelector(".login-form .caution");
  if (userName === "" || passWord === "") {
    cautionEle.innerHTML = "Nhập đủ thông tin";
    showEle(cautionEle);
    return;
  }

  loginBtn.disabled = true; // disabled button

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
      if (data.status) {
        showEle(document.querySelector(".search"));
        hiddenEle(document.querySelector(".login-form"));
        return;
      }
      loginBtn.disabled = false;
      if (!data.status) {
        cautionEle.innerHTML = "thông tin đăng nhập sai";
        showEle(cautionEle);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Đăng nhập không thành công, hãy thử lại");
      loginBtn.disabled = false;
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

// search infor function
let searchSiteInput = document.querySelector("#searchSite");
let searchNameInput = document.querySelector("#searchName");
let searchBtn = document.querySelector("#searchBtn");
let cautionSearchEle = document.querySelector(".search-form .caution");

const renderSearchData = (data) => {
  const searchResultEle = document.querySelector(".search-result");
  console.log(data);
  data.result.forEach((item) => {
    searchResultEle.innerHTML =
      searchResultEle.innerHTML +
      `
    <div class="search-result-item">
        <div class="infor-group">
          <div class="infor">
            <span class="infor-title">site</span>
            <p class="infor-detail">${item.site}</p>
          </div>
          <div class="infor">
            <span class="infor-title">tên CH</span>
            <p class="infor-detail">${item.siteName}</p>
          </div>
          <div class="infor">
            <span class="infor-title">KSTT</span>
            <p class="infor-detail">${item.KSTT}</p>
          </div>
          <i class="fas fa-angle-down"></i>
        </div>
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
              <span class="infor-title">GDV</span>
              <p class="infor-detail">${item.QLKV}</p>
            </div>
            <div class="infor">
              <span class="infor-title">GDM</span>
              <p class="infor-detail">${item.GDV}</p>
            </div>
          </div>
          <div class="infor-group">
            <div class="infor">
              <span class="infor-title">Địa chỉ</span>
              <p class="infor-detail">${item.address}</p>
            </div>
            <div class="infor">
              <a href="#">
                <i class="fas fa-map-marker-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  });
};

const handleSearch = () => {
  if (searchNameInput.value === "" && searchSiteInput.value === "") {
    cautionSearchEle.innerHTML = "Nhập thông tin để tìm kiếm";
    showEle(cautionSearchEle);
    return;
  }

  searchBtn.disabled = true; //disable button when submit

  let submitData = {
    type: "search",
    data: {
      site: searchSiteInput.value,
      siteName: searchNameInput.value
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
      renderSearchData(data);
      searchBtn.disabled = false;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra, hãy thử lại");
      searchBtn.disabled = false;
    });
};

searchSiteInput.addEventListener("input", () => {
  hiddenEle(cautionSearchEle);
});

searchNameInput.addEventListener("input", () => {
  hiddenEle(cautionSearchEle);
});

searchBtn.addEventListener("click", handleSearch);
