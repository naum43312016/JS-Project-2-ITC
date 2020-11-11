(async function() {
    const marquee = new Marquee(document.getElementById('text-container'));
    marquee.load();
    const form = new SearchForm(document.getElementById('form'));
    const compareCompanies = new CompareCompanies();
    const results = new SearchResult(document.getElementById('stocks-list'),compareCompanies);
    form.onSearch((companies,input) => {
        results.renderResults(companies,input);
    });
})()



