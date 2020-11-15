(async function(){
    const urlParams = new URLSearchParams(window.location.search);
    const symbol = urlParams.get('symbol');
    if(symbol){
        let symbols = symbol.split(",");
        let colSize = getColumnSizeByCompaniesQuantity(symbols);
        for(let i=0;i<symbols.length;i++){
            const compInfo = new CompanyInfo(document.getElementById('main-container'),symbols[i],colSize);
            await compInfo.load();
            await compInfo.addChart();
        }
    }
})();

function getColumnSizeByCompaniesQuantity(symbols){
    if(symbols.length<2) return "col-lg-12";
    if(symbols.length===2) return "col-lg-6";
    return "col-lg-4";
}