const search = {
    initialized: false,
    indexFile: '/search.index.gz',
    index: null,
    indexInitialized: false,
    resultsFile: '/search.results.gz',
    results: null,
    resultsInitialized: false,
    initialize: function() {
        let self = this;
        if (!self.initialized) {
            self.initialized = true;

            // Get the index
            var indexRequest = new XMLHttpRequest();
            indexRequest.open('GET', self.indexFile, true);
            indexRequest.responseType = 'arraybuffer';
            indexRequest.onload = function() {
                self.index = lunr.Index.load(JSON.parse(pako.inflate(new Uint8Array(this.response), { to: 'string' })));
                self.indexInitialized = true;
            };
            indexRequest.onerror = function() {
                console.debug(this.statusText);
                self.indexInitialized = true;
            }
            indexRequest.send(null);
            
            // Get the results
            if (self.resultsFile) {
                var resultsRequest = new XMLHttpRequest();
                resultsRequest.open('GET', self.resultsFile, true);
                resultsRequest.responseType = 'arraybuffer';
                resultsRequest.onload = function() {
                    self.results = JSON.parse(pako.inflate(new Uint8Array(this.response), { to: 'string' }));
                    self.resultsInitialized = true;
                };
                resultsRequest.onerror = function() {
                    console.debug(this.statusText);
                    self.resultsInitialized = true;
                }
                resultsRequest.send(null);
            } else {
                self.results = {};
                self.resultsInitialized = true;
            }
        }
    },
    search: function(queryString, callback, noTypeahead) {
        let self = this;
        self.initialize();

        // Wait for initialization
        if (!self.indexInitialized || !self.resultsInitialized) {
            setTimeout(() => {ret = self.search(queryString, callback)}, 100);
        }

        // Call callback with results
        if (self.index && callback) {
            callback(self.index
                .query(query => {
                    var parser = new lunr.QueryParser(queryString, query);
                    parser.parse();
                    if (!noTypeahead) {
                        query.clauses.forEach(clause => {
                            if (clause.wildcard === lunr.Query.wildcard.NONE && clause.usePipeline && clause.boost === 1 && clause.term.length > 2) {
                                clause.boost = 10;
                                query.term(clause.term, { usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING });
                            }
                        });
                    }
                })
                .map(function(searchResult) {
                return Object.assign(self.results[searchResult.ref], searchResult);
            }));
        }
    }
};