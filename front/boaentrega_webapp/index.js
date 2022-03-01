//EXTERNAL MODULES
const express = require("express");
const session = require("express-session");
const path = require("path");
const axiosRequest = require('axios');
const bodyParser = require('body-parser');

//VARIABLES
const app = express();
const port = process.env.PORT || "7070";

let data = null;

//CONFIGURATION
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: 'boaEntregaTcc', resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({extended: false}));

//ROUTES
app.get("/", (req, res) => res.render("pages/home", {title: "Home"}));
app.get("/clients", (req, res) => res.render("pages/clients", {title: "Clientes"}));
app.get("/stores", (req, res) => res.render("pages/stores", {title: "Estoque"}));
app.get("/settings", (req, res) => res.render("pages/settings", {title: "Configurações"}));
app.get("/suppliers", (req, res) => {
    //TODO integrar com API
    data = {
        title: "Fornecedores",
        itens:[
            {
                code: 75949858,
                name: "Lucas",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "+5541995429288",
                zipcode: "83403350" 
            },
            {
                code: 75949858,
                name: "Roberto",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "",
                zipcode: "83403350"
            },

            {
                code: 75949858,
                name: "Lucas",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "+5541995429288",
                zipcode: "83403350" 
            },
            {
                code: 75949858,
                name: "Roberto",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "",
                zipcode: "83403350"
            },
            {
                code: 75949858,
                name: "Lucas",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "+5541995429288",
                zipcode: "83403350" 
            },
            {
                code: 75949858,
                name: "Roberto",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "",
                zipcode: "83403350"
            },
            {
                code: 75949858,
                name: "Lucas",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "+5541995429288",
                zipcode: "83403350" 
            },
            {
                code: 75949858,
                name: "Roberto",
                address: "Rua Rio Japurá, 415 - Bloco 10 Apartamento 42 - Roça Grande - Colombo/PR",
                phone: "",
                zipcode: "83403350"
            },
            
        ]
    };

    res.render("pages/suppliers", data)
});
app.get("/suppliers/form", (req, res) => {
    let obj = null;

    if(req.query.id != null){
        data.suppliers.forEach((item) => {
            if(item.id == req.query.id){
                obj = item;
                return;
            }
        });
    }

    res.render("pages/form/suppliers", obj);
});
app.post("/suppliers/save", (req, res) => {
    let obj = req.body;
    let itsNotOk = false;

    if(obj != null){
        if(obj.exists){
            axiosRequest.patch("url", obj)
                        .catch((err) => {
                            console.error(err);
                            itsNotOk = true;
                        });
        } else {
            axiosRequest.post("url", obj)
                        .catch((err) => {
                            console.error(err);
                            itsNotOk = true;
                        });
        }
    }

    if(itsNotOk) {
        req.session.error = "Houve um erro ao tentar salvar a operação. Tente novamente mais tarde!";
        res.redirect("/error");
    } else { 
        res.redirect("/suppliers");
    }
});

//Generic error route
app.all('/error', (req, res) => {
    let msg = req.session.error;

    res.status(500).render('pages/error', {
        title: "Ops! Algo deu errado!", 
        message: msg != null && msg != undefined ? msg : "Tente novamente mais tarde..."
    });
});

//Routes Error handlin
app.all('*', (req, res) => {
    res.status(404).render('pages/error', {
        title: "Ops! Algo deu errado!", 
        message: "O conteúdo que você procura não pôde ser encontrado! Tente novamente mais tarde..."
    });
});

//SERVER ACTIVATION
app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});