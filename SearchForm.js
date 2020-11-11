class SearchForm{
    constructor(form){
        this.form = form;
        this.input = form["search-input"];
        this.button = form["search-button"];
        this.spinner = document.getElementById('spinner');
        this.url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?";
        this.companyUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/";
        this.addEvents();
        this.checkQuery();
    }

    onSearch(callback){
        this.resultCallback = callback;
    }

    addEvents(){
        this.button.addEventListener('click',this.debounce(this,this.searchButtonClicked, 200));//User cant click multiple times
        this.input.addEventListener('input', this.debounce(this,this.searchButtonClicked, 900));
    }
    checkQuery(){
        let urlParams = new URLSearchParams(window.location.search);
        let query = urlParams.get('query');
        if(query!=null && query.length>0){
            this.input.value=query;
            this.searchButtonClicked();
        }
    }


    async searchButtonClicked(){
        this.startSpinner();
        let inputValue = this.input.value;
        window.history.pushState("", "", "index.html?query="+inputValue);
        let stocksList = document.getElementById('stocks-list');
        let searchUrl = this.url + "query="+inputValue + "&limit=10&exchange=NASDAQ";
        while(stocksList.firstChild){ //Clear list
            stocksList.removeChild(stocksList.firstChild);
        }
        if(inputValue){
            try{
                let response = await fetch(searchUrl);
                if (response.ok){
                    let arr = await response.json();
                    let fetches = [];
                    let companies="";
                    /*
                    We know than we have limit 10 companies 
                    and we can request only five at every api request 
                    P.S , in the end is not important for url
                    */
                    for(let i=0;i<arr.length;i++){
                        if(i===4 || i===arr.length-1){
                            companies+=arr[i].symbol+",";
                            fetches.push(companies);
                            companies="";
                        }else{
                            companies+=arr[i].symbol+",";
                        }
                    }
                    let urls = this.createFetchsUrl(fetches);
                    Promise.all(urls.map(u=>fetch(u))).then(responses =>
                        Promise.all(responses.map(res => res.json()))
                    ).then(json => {
                        this.resultCallback(json,inputValue);
                    })
                }else{
                    alert("HTTP-Error: " + response.status);
                }
            }catch{
                alert("Server Error: Please refresh your page")
                this.stopSpinner();
            }
        }
    
        this.stopSpinner();
    }
    
    createFetchsUrl(fetches){
        let urls = [];
        for(let i=0;i<fetches.length;i++){
            urls.push(this.companyUrl + fetches[i]);
        }
        return urls;
    }
    
    async getProfile(company){
        let response = await fetch(this.companyUrl+company);
        if(response.ok){
            let json = await response.json();
            return json[0];
        }else{
            alert("HTTP-Error: " + response.status);
        }
    }
    
    
    
    startSpinner(){
        this.spinner.style.display = "block";
    }
    stopSpinner(){
        this.spinner.style.display = "none";
    }


    //Debounce clears prev timeOut func if exists and replace it , Debounce code from google
    debounce(ctx,func, wait) {
        let timeout;
        let context = ctx;
        return function() {
            const executor = function() {
                timeout = null;
                func.apply(context);
            };
            clearTimeout(timeout);
            timeout = setTimeout(executor, wait);
        };
    }
}