const apiKey = `73f37f99a0e24d4f8d2ab459f539642b`
let newsList = [];

const menus = document.querySelectorAll(".menus button");

menus.forEach(menu => menu.addEventListener("click", (e) => getNewsByCategory(e)));

let url = null;
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
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
    // totalResult

    // page

    // pageSize
    
    // groupSize

    // pageGroup 1~5, 6~10...
    const pageGroup = Math.ceil(page / groupSize);
    // lastPage
    const lastPage = pageGroup * groupSize;
    // firstPage
    const firstPage = lastPage - (groupSize - 1);

    let paginationHTML = ``;

    for(let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
}
getLastestNews();

