

new Vue({
  el: '#app',
  data: {
    search: '',
    MovieQuotes: [],
    GameQuotes: [],
    quotes_list: [],
    visibleQuotesList: [],
    currentPage: 0,
    paginationLimit: 15,
    allQuotes: [],
    sorted: false
  },
  mounted(){
    fetch("https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json")
    .then(response => response.json())
    .then((data) => {
      this.quotes_list = data;
      this.allQuotes = data;
    })
    .then(this.updateVisibleQuotes)
    .then(this.grabMovieQuotes)
    .then(this.grabGameQuotes);
  },
  methods:{
    totalPages(){
      return  Math.ceil(this.quotes_list.length / this.paginationLimit);
    },
    showPreviousLink(){
      return this.currentPage == 0 ? false : true;
    },
    showNextLink(){
      return this.currentPage == [this.totalPages() - 1] ? false : true
    },

    updatePage(pageNumber){
      this.currentPage = pageNumber;
      this.updateVisibleQuotes();
    },
    updateVisibleQuotes() {
      // Paginates the quotes_list using paginationLimit
      this.visibleQuotesList = this.quotes_list.slice(this.currentPage * this.paginationLimit, (this.currentPage * this.paginationLimit) + this.paginationLimit)
      if (this.visibleQuotesList.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage+1);
      }
    },
    grabAllAQuotes(){
      this.currentPage = 0;
      this.quotes_list = [];
      this.quotes_list = this.allQuotes;
      this.updateVisibleQuotes();
    },
    grabMovieQuotes(){
      this.MovieQuotes = this.quotes_list.filter((quote) =>{
        return quote.theme.match('movies')
      })
    },
    grabGameQuotes(){
      this.GameQuotes= this.quotes_list.filter((quote) =>{
        return quote.theme.match('games')
      })
    },
    showMovieQuotes(){
      this.currentPage = 0;
      this.quotes_list = [];
      this.quotes_list = this.MovieQuotes;
      this.updateVisibleQuotes();
    },
    showGameQuotes(){
      this.currentPage = 0;
      this.quotes_list = [];
      this.quotes_list = this.GameQuotes;
      this.updateVisibleQuotes();
    },
    sortQuotes(){
      this.quotes_list.sort(function(a, b) {
        if (a.quote > b.quote) {
          return 1;
        }
        if (a.quote < b.quote) {
          return -1;
        }
          return 0;
      });
    },
    sortToggle(){
      if (this.sorted == false) {
        this.sortQuotes();
        this.sorted = true;
      }
      else if (this.sorted == true) {
        this.quotes_list.sort(function() { return 0.5 - Math.random() });
        this.sorted = false;
      }
      this.updateVisibleQuotes();
    }
  },
  computed:{
    // Filters quotes by looping through quotes_list and matching whats in search bar
    filteredQuotes: function () {
      return this.visibleQuotesList.filter((quote) =>{
        return quote.quote.match(this.search)
      })
    },

  },
})
