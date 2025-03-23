const apiKey = `73f37f99a0e24d4f8d2ab459f539642b`
let newsList = [];

const menus = document.querySelectorAll(".menus button");

menus.forEach(menu => menu.addEventListener("click", (e) => getNewsByCategory(e)));

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
    try {
        url.searchParams.set("page",page); // -> &page=page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        ;
        const data = await response.json();
        console.log(data);
        if(response.status === 200) {
            
            if(data.articles.length === 0) {
                throw new Error("No result for this search");
            }

            newsList = data.articles;
            totalResult = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message);
    }
}

const getNewsByKeyword = async () => {
    const searchKeyword = document.getElementById("search-area").value;
    url = new URL(`https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${apiKey}`);  
    getNews(); 
}


const getLastestNews = async () => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    getNews(); 
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
    getNews(); 
}

let render = () => {
    const newsHTML = newsList.map(news => `            <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news.urlToImage}" alt="">
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>
                        ${news.description}
                    </p>
                    <div>
                        ${news.source.name} * ${news.publishedAt}
                    </div>
                </div>
            </div>`).join('');
    
    document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
}
 

const paginationRender = () => {
    // totalResult = dataSize

    // page = default:1

    // pageSize = 10
    
    // groupSize = 5

    // totalPages
    // 마지막 페이지그룹이 그룹 사이즈보다 작을 때
    const totalPages = Math.ceil(totalResult / pageSize);
    // pageGroup 1~5, 6~10...
    const pageGroup = Math.ceil(page / groupSize);
    // lastPage
    let lastPage = pageGroup * groupSize;

    if(lastPage > totalPages) {
        lastPage = totalPages;
    }
    // firstPage
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = "";
    let flag = true;
    for(let i = firstPage; i <= lastPage; i++) {
        if(i !== 1 && flag) {
            paginationHTML += `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;
            flag = false;
        }
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}"  onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`
    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews(page);
}

getLastestNews();

