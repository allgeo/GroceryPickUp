import "./Search.scss";
const Search = () => {
    return (
        <>
        <div className="store-name">
            <h1>Store Name</h1>
        </div>
        <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Search Product" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <button type="button" class="btn btn-success">Search</button>
                </span>
        </div>
        </>

    );
}

export default Search;