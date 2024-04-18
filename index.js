const axios = require("axios")
// const { prismaClient } = require("./src")

async function run() {
  try {
    const data = await axios.get(`https://secure-cdn-api.bridestory.com/_public/v2/country/conditional_cities?bs-localization-bucket=ID&bs-translation-bucket=id`)
  
    console.log(data.data.countries)

    // const countries = data.data.countries
    // countries.forEach(async country => (
    //   await prismaClient.country.create({
    //     data: {
    //       id: country.id,
    //       iso: country.iso,
    //       name:country.name,

    //     }
    //   })
    // )) 
    
    
    
  } catch (err) {
    console.log(err)
  }
  
}

run()