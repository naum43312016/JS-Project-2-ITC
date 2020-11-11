class CompareCompanies{
    constructor(){
        this.companies = [];
        this.companiesContainer = document.getElementById('companies-list');
        this.compareText = document.getElementById('compare-text');
        this.handleCompareButtonClick();
    }

    addCompany(company){
        let index = this.getCompanyIndexInList(company);
        if(index<0){
            this.companies.push(company);
            this.compareText.innerText = "Compare " + this.companies.length +" Companies";
            this.compareText.classList.remove("compare-text-before");
            this.createAndAppendCompanySpan(company);
        }
    }
    
    createAndAppendCompanySpan(company){
        let span = document.createElement('span');
        span.classList.add('btn','btn-info','btn-compare-margin');
        span.appendChild(document.createTextNode(company.symbol));
        let btn = document.createElement('button');
        btn.classList.add('close');
        btn.type = "button";
        btn.innerHTML = "&times;";
        btn.addEventListener('click',()=>{
            this.removeCompanyFromList(company);
        });
        span.appendChild(btn);
        this.companiesContainer.appendChild(span);
    }

    removeCompanyFromList(company){
        let index = this.getCompanyIndexInList(company);
        if(index>=0){
            this.companies.splice(index,1);
            this.companiesContainer.removeChild(this.companiesContainer.childNodes[index+1]);
            if(this.companies.length>0){
                this.compareText.innerText = "Compare " + this.companies.length +" Companies";
            }else{
                this.compareText.innerText = "Compare";
                this.compareText.classList.add('compare-text-before');
            }
        }
    }

    getCompanyIndexInList(company){
        for(let i=0;i<this.companies.length;i++){
            if(this.companies[i].symbol===company.symbol){
                return i;
            }
        }
        return -1;
    }

    handleCompareButtonClick(){
        this.compareText.addEventListener('click',(event)=>{
            let url = window.location.origin + "/JS-Project-2-ITC/company.html?symbol=";
            if(this.companies.length>0){
                for(let i=0;i<this.companies.length;i++){
                    if(i===this.companies.length-1){
                        url +=this.companies[i].symbol;
                    }else{
                        url +=this.companies[i].symbol + ",";
                    }
                }
                window.location = url;
            }
        })
    }

}