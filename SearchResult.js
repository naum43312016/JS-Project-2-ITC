class SearchResult{
    constructor(resultElement,compareCompanies){
        this.resultElement = resultElement;
        this.compareCompanies = compareCompanies;
    }

    renderResults(companies,inputValue){
        for(let i=0;i<companies.length;i++){
            let array = companies[i];
            array.forEach(elem => {
                this.resultElement.appendChild(this.createResultLi(elem,inputValue));
            });
        }
    }


    compareHandler(elem){
        this.compareCompanies.addCompany(elem);
    }

    createResultLi(elem,inputValue){
        let change = elem.changes;
        let changeElement = this.getChangeElement(change);
        let companyName = this.checkSearchedPart(elem.companyName,inputValue);
        let symbol = this.checkSearchedPart(elem.symbol,inputValue);
        let li = document.createElement("li");
        li.classList.add("result-list-item");
        let img = document.createElement("img");
        img.src = elem.image; 
        img.setAttribute("id", "company-image-main");
        li.appendChild(img);
        let a = document.createElement("a");
        a.href = '/JS-Project-2-ITC/company.html?symbol=' + elem.symbol;
        a.classList.add("list-link");
        a.innerHTML = companyName + ". "+'<span class="symbol-text">'+"("+symbol+")"+ changeElement + '</span>';
        li.appendChild(a);
        let btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("btn-compare","btn","btn-info");
        btn.innerText = "Compare";
        btn.addEventListener("click",() => {
            this.compareHandler(elem);
        })
        li.appendChild(btn);
        return li;
    }

    //Check if searched part presents and add highlighted background
    checkSearchedPart(companyName,inputValue){
        let index = companyName.toLowerCase().indexOf(inputValue.toLowerCase());
            if(index >- 1){
                let len = inputValue.length;
                companyName = companyName.slice(0,index) + '<mark>' + companyName.slice(index,index+len) + '</mark>' + companyName.slice(index+len);
            }
            if(companyName.length>45){
                companyName = companyName.slice(0,45) + '...'
            }
        return companyName;
    }
    getChangeElement(change){
        if(change==null || change==undefined) return "";
        if(change>=0){
            return '<span class="green-text change-text-main">'+ "(" + change + "%)" + '</span>'
        }else{
            return '<span class="red-text change-text-main">'+ "(" + change + "%)" + '</span>'
        }
    }
}