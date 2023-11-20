//Carolina Turner CSCE 242
const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({dest : __dirname + "/public/images"});

app.get("/" , (req,res)=>{
    res.sendFile(__dirname+ "/index.html");
});

let beverages = [
    {
        beverageId : 1,
        title :"Water",
        hot_or_iced:"Iced",
        price:"$0.00",
        fan_favorite:"No",
        recommendation: "N/A",
        flavors: ["N/A"],
        img: "images/water.jpg"
    },
    {   
        beverageId : 2,
        title :"Coffee",
        hot_or_iced:"Hot",
        price:"$4.00",
        fan_favorite:"Yes",
        recommendation: "Have your coffee with cream and sugar.",
        flavors: [" Caramel", " Vanilla", " Pumpkin Spice", "Mocha"],
        img: "images/coffee.jpg"
    },
    {   
        beverageId : 3,
        title :"Tea",
        hot_or_iced:"Hot",
        price:"$3.00",
        fan_favorite:"Yes",
        recommendation: "Try a green tea with lemon and honey.",
        flavors: [" Black", " Green"],
        img: "images/tea.jpg"
    },
    {
        beverageId : 4,
        title :"Milkshake",
        hot_or_iced:"Iced",
        price:"$5.00",
        fan_favorite:"Yes",
        recommendation: "Add our hot fudge topping!",
        flavors: [" Reese's Peanut Butter", " Oreo", " Classic Vanilla", " Classic Chocolate", "Peach"],
        img: "images/milkshake.jpg"
    },
    {
        beverageId : 5,
        title :"Soda",
        hot_or_iced:"Iced",
        price:"2 for $3.00",
        fan_favorite:"No",
        recommendation: "N/A",
        flavors: [" Coca-Cola"," Mr.Pibb", " Sprite", " Dr.Pepper"],
        img: "images/soda.jpg"
    },
    {
        beverageId : 6,
        title :"Celsius",
        hot_or_iced:"Iced",
        price:"$3.00",
        fan_favorite:"Yes",
        recommendation: "Raspberry Acai Green Tea Flavor",
        flavors: [" Raspberry Acai Green Tea"," Kiwi Guava", " Berry", " Orange"],
        img: "images/celsius.jpg"
    },
];


app.get("/api/beverages", (req, res) =>{  
    res.send(beverages);
  });


app.post("/api/beverages", upload.single("img"), (req,res)=>{
    const result = validateBeverage(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const beverage = {
        beverageId :beverages.length+1,
        title : req.body.title,
        hot_or_iced : req.body.hot_or_iced,
        price : req.body.price,
        fan_favorite : req.body.fan_favorite,
        recommendation : req.body.recommendation,
        flavors : req.body.flavors.split(","),
    };
     if (req.file){
        recipe.img="images/" + req.file.filename;
     }
    beverages.push(beverage);
    res.send(beverages);
});


app.put("api/beverages/:id",upload.single("img"), (req,res)=>{
    const id=parseInt(req.params.id);

    const beverage = beverages.find((b)=>b.beverageId==id);
    const result = validateBeverage(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    beverage.title=req.body.name;
    beverage.hot_or_iced=req.body.hot_or_iced;
    beverage.price=req.body.price;
    beverage.fan_favorite=req.body.fan_favorite;
    beverage.recommendation=req.body.recommendation;
    beverage.flavors=req.body.flavors;

    res.send(beverage);
});

app.delete("/api/beverages/:id", (req,res)=>{
    const id=parseInt(req.params.id);

    const beverage = beverages.find((b)=>b.beverageId==id);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const index=beverages.indexOf(beverage);
    beverages.splice(index, 1);
    res.send(beverage);
});
const validateBeverage = (beverage)=> {
    const schema = Joi.object({ //Joi Validation
        beverageId : Joi.allow(""),
        title : Joi.string().min(3).required(), //joi validating it must be string of length three and is required, "tea" is minimum length
        hot_or_iced : Joi.string().min(3), //not required if can be either or
        price : Joi.allow().required(),
        fan_favorite: Joi.allow(),
        recommendation : Joi.allow().required(),
        flavors :Joi.allow(),
    });
    return schema.validate(beverage);
  }

  app.listen(3000, ()=>{
    console.log("working!");

});