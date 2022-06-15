"use strict";
exports.__esModule = true;
var fuse_1 = require("./fuse");
var show = function (el) {
    el.style.display = 'block';
};
var hide = function (el) {
    el.style.display = 'none';
};
var Search = /** @class */ (function () {
    function Search() {
        this.searchInput = document.getElementById('search-query');
        this.searchResults = document.getElementById('search-results');
        this.articlesList = document.getElementById('content');
        this.filterItems = document.getElementsByClassName('filter-item');
        this.searchFilter = new Map();
        this.buildSearchValue = function (value) {
            var filter = [];
            if (this.searchFilter.size == 0 && value.length == 0) {
                return "";
            }
            this.searchFilter.forEach(function (v, k) {
                var object = {};
                if (v == "categories") {
                    object = {
                        categories: k
                    };
                }
                filter.push(object);
            });
            if (value != undefined && value.length != 0) {
                var orObject = {
                    $or: [
                        { title: value },
                        // fuse extended search, 'value is include-match
                        // more details: https://fusejs.io/examples.html#extended-search
                        { contents: "'" + value }
                    ]
                };
                filter.push(orObject);
            }
            return {
                $and: filter
            };
        };
        this.initFuse();
        this.bindInput();
        this.bindFilters();
    }
    Search.prototype.initFuse = function () {
        var _this = this;
        var fuseOptions = {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            useExtendedSearch: true,
            keys: [
                { name: "title", weight: 0.8 },
                { name: "contents", weight: 0.5 },
                { name: "tags", weight: 0.3 },
                { name: "categories", weight: 0.3 }
            ]
        };
        fetch('/index.json')
            .then(function (response) {
            if (response.status !== 200) {
                console.error('[' + response.status + ']Error:', response.statusText);
                return;
            }
            return response.json();
        })
            .then(function (pages) {
            var fuse = new fuse_1["default"](pages, fuseOptions);
            _this.fuse = fuse;
        })["catch"](function (err) {
            console.error('[Fetch]Error:', err);
        });
    };
    Search.prototype.bindInput = function () {
        var _this = this;
        this.searchInput.addEventListener("input", function () {
            var value = _this.searchInput.value;
            _this.executeSearch(_this.buildSearchValue(value));
        });
    };
    Search.prototype.bindFilters = function () {
        var _this = this;
        Array.from(this.filterItems).forEach(function (el) {
            el.addEventListener('click', function () {
                _this.filterSelect(el);
            });
        });
    };
    Search.prototype.executeSearch = function (value) {
        if ((typeof value === "string" && value.length != 0) || typeof value === "object") {
            hide(this.articlesList);
            show(this.searchResults);
        }
        else {
            hide(this.searchResults);
            show(this.articlesList);
        }
        var result = this.fuse.search(value);
        if (result.length > 0) {
            this.populateResults(result);
        }
        else {
            this.searchResults.innerHTML = '<p>Sorry, nothing matched that search.</p>';
        }
    };
    Search.prototype.populateResults = function (results) {
        var _this = this;
        this.searchResults.innerHTML = "";
        results.forEach(function (value) {
            var item = value.item;
            var html = "\n            <div class=\"post\">\n                <a href=\"".concat(item.permalink, "\">\n                    <div class=\"post-row\">\n                        <time>").concat(item.date, "</time>\n                        <h3>").concat(item.title, "</h3>\n                    </div>\n                </a>\n            </div>");
            _this.searchResults.innerHTML += html;
        });
    };
    Search.prototype.filterSelect = function (el) {
        var value = el.dataset.value;
        var type = el.dataset.type;
        if (el.classList.contains('active')) {
            this.searchFilter["delete"](value);
            el.classList.remove('active');
        }
        else {
            this.searchFilter.set(value, type);
            el.classList.add('active');
        }
        this.executeSearch(this.buildSearchValue(""));
    };
    return Search;
}());
window.addEventListener('load', function () {
    setTimeout(function () {
        new Search();
    }, 0);
});

