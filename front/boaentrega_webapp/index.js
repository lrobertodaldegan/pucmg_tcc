//EXTERNAL MODULES
const express = require("express");
const path = require("path");

//VARIABLES
const app = express();
const port = process.env.PORT || "7070";

//CONFIGURATION
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.get("/", (req, res) => res.render("pages/home", {title: "Home"}));
app.get("/clients", (req, res) => res.render("pages/clients", {title: "Clientes"}));
app.get("/stores", (req, res) => res.render("pages/stores", {title: "Estoque"}));
app.get("/settings", (req, res) => res.render("pages/settings", {title: "Configurações"}));
app.get("/suppliers", (req, res) => {
    var data = {
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
//Routes Error handlin
app.all('*', (req, res) => {
    res.status(404).render('pages/error', {title: "Ops! Algo deu errado!"});
});

//SERVER ACTIVATION
app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});