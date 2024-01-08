const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./CategoryRouter')

const routes = (app) => {
    app.use('/api/product', ProductRouter)
    app.use('/api/category', CategoryRouter)
}   

module.exports = routes