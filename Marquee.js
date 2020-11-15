class Marquee{
    constructor(container){
        this.container = container;
    }


    //We check animation duration according to text inside marquee
    animateMarquee(){
        let len = parseInt(this.container.innerText.length);
        let animDuration = len/100*10000;
        this.container.animate([
            {transform : 'translateX(0)'},
            {transform : 'translateX(-100%)'},
        ],{
            duration: animDuration,
            iterations: Infinity
        });
    }

    async load(){
        let response = await fetch("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/actives");
        if (response.ok){
            let array = await response.json();
            array = array.map((elem)=>{
                return '<span class="company-name-marquee-text">' + elem.ticker
                + '<span class="company-price-marquee">' + " $" + elem.price + '</span></span> ';
            })
            array.forEach(elem => {
                this.container.innerHTML+=elem;
            });
            this.animateMarquee();
        }
    }
}