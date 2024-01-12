const app = require('./app')
const PORT = process.env.PORT || 4000



// Application listning
app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`)
})