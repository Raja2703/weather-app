const express=require("express")
const bodyParser=require("body-parser")
const https=require("https")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post("/data",(req,res)=>{
    const cityName=req.body.city
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d27ca16c7ec9d20a54eb733a54b63157`
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const icon=weatherData.weather[0].icon;
            const iconUrl=`https://api.openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>Temperature is ${weatherData.main.temp}</h1>`)
            res.write(`<img src="${iconUrl}">`)
            res.send()
        })
    })
})

app.listen("3000",()=>{
    console.log("Server is running on port 3000")
})