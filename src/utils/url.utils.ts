
type Queries = 
    'mood-metric-tab'       | 
    'date-from'             | 
    'date-to'               | 
    'aggregation'           | 
    'group-by'              | 
    'include-total'         | 
    'numeric-aggregation-by' 

export function setQuery(key: Queries, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
}

export function getQuery(key: Queries) {
    const url = new URL(window.location.href);
    return url.searchParams.get(key)
}

export function deleteQuery(key: Queries) {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.replaceState({}, '', url);
}