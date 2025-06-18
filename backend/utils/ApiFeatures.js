class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};

        // console.log('keyword is', keyword)

        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        // console.log('query copy', queryCopy)
        // Remove some fields for category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key => delete queryCopy[key])
        // console.log('query copy after', queryCopy)

        // Handle bracket notation in query parameters (e.g., price[gte], price[lt])
        const processedQuery = {};

        Object.keys(queryCopy).forEach(key => {
            if (key.includes('[') && key.includes(']')) {
                // Extract field name and operator from bracket notation
                const match = key.match(/^(.+)\[([^\]]+)\]$/);
                if (match) {
                    const fieldName = match[1];
                    const operator = match[2];
                    const value = queryCopy[key];

                    // Convert to number if it's a numeric value
                    const numValue = parseFloat(value);
                    const finalValue = !isNaN(numValue) ? numValue : value;

                    if (!processedQuery[fieldName]) {
                        processedQuery[fieldName] = {};
                    }
                    processedQuery[fieldName][`$${operator}`] = finalValue;
                }
            } else {
                // Handle regular query parameters
                processedQuery[key] = queryCopy[key];
            }
        });

        // console.log('Processed query:', processedQuery);
        this.query = this.query.find(processedQuery);
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this
    }
};

export { ApiFeatures }