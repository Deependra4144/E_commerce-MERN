class ApiResponse {
    constructor(
        statusCode,
        data,
        message = 'success',
        totalProducts
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.totalProducts = totalProducts
    }
}

export { ApiResponse }