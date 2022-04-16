//EXTERNAL MODULES
const express = require("express");
const session = require("express-session");
const path = require("path");
const request = require('request');
const bodyParser = require('body-parser');

//VARIABLES
const app = express();
const port = process.env.PORT || "7070";
const contextPath = "/gsl/";
const endpointBase = "http://localhost:8000/";

const validateAuth = (session, res) => {
    if(!session.jwt){
        console.log("Ops! Houve uma tentativa de acessar uma página restrita por um usuário não authorizado ou não autenticado! Redirecionando para a página de login!");
        res.redirect(contextPath);
    }
};

//CONFIGURATION
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: 'boaEntregaTcc', resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({extended: false}));

//ROUTES
app.get(contextPath, (req, res) => res.render("pages/login", {title: "Login"}));
app.get(contextPath + "login-process", (req, res) => res.render("login_process"));
app.get(contextPath + "login/:jwt", (req, res) => {
    let jwt = req.params.jwt;

    console.log(jwt);

    if(!jwt){
        req.session.error = "Não foi possível encontrar o token de autenticação do usuário!";

        res.redirect(contextPath);
    } else {
        req.session.jwt = jwt;

        res.redirect(contextPath + "home");
    }
});
app.get(contextPath + "home", (req, res) => {
    validateAuth(req.session, res);

    res.render("pages/home", {title: "Home"});
});
app.get(contextPath + "clients", (req, res) => {
    validateAuth(req.session, res);

    res.render("pages/clients", {title: "Clientes"});
});
app.get(contextPath + "stores", (req, res) => {
    validateAuth(req.session, res);

    res.render("pages/stores", {title: "Estoque"});
});
app.get(contextPath + "settings", (req, res) => {
    validateAuth(req.session, res);
    
    res.render("pages/settings", {title: "Configurações"})
});
app.get(contextPath + "suppliers", (req, res) => {
    validateAuth(req.session, res);

    let requestData = {
        headers: {
            'content-type' : 'application/json',
            'Authorization': `Bearer ${req.session.jwt}`
        },
        url: endpointBase + "/supplier/v1/"
    };

    console.log(req.session.jwt);

    request.get(requestData, (err, response, body) => {
        let result = JSON.parse(body);

        if(Array.isArray(result)) {
            res.render("pages/suppliers", {title: "Fornecedores", suppliers: result});
        } else {
            //retry...
            request.get(requestData, (err, response, body) => {
                let result = JSON.parse(body);
        
                if(Array.isArray(result))
                    res.render("pages/suppliers", {title: "Fornecedores", suppliers: result});
                else
                    res.render("pages/suppliers", {title: "Fornecedores", suppliers: []});
            });

        }
    });
});
app.get(contextPath + "suppliers/form", (req, res) => {
    validateAuth(req.session, res);

    if(req.query.document){
        let requestData = {
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Bearer ${req.session.jwt}`
            },
            url: endpointBase + "/supplier/v1/" + req.query.document
        };

        request.get(requestData, (err, response, body) => {
            let result = JSON.parse(body);
    
            res.render("pages/form/suppliers", {title: "Fornecedor", supplier: result});
        });
    } else {
        res.render("pages/form/suppliers", {title: "Novo Fornecedor", supplier: {}});
    }
});
app.post(contextPath + "suppliers/save", (req, res) => {
    let obj = req.body;

    if(obj){
        if(obj.id && obj.id != ""){
            let requestData = {
                headers: {
                    'content-type' : 'application/json',
                    'Authorization': `Bearer ${req.session.jwt}`
                },
                body: JSON.stringify(obj),
                url: endpointBase + "supplier/v1/"
            };

            request.patch(requestData, (err, response, body) => {
                console.log('Response enviado ao tentar atualizar:');
                console.log(JSON.stringify(obj));
                console.log('Response obtido ao tentar atualizar: ');
                console.log(body);

                if(err) {
                    req.session.error = "Houve um erro ao tentar salvar a operação. Tente novamente mais tarde!";
                    res.redirect(contextPath + "error");
                } else { 
                    res.redirect(contextPath + "suppliers");
                }
            });
        } else {
            obj.id = null;

            let requestData = {
                headers: {
                    'content-type' : 'application/json',
                    'Authorization': `Bearer ${req.session.jwt}`
                },
                body: JSON.stringify(obj),
                url: endpointBase + "supplier/v1/"
            };

            request.post(requestData, (err, response, body) => {
                console.log('Response enviado ao tentar salvar:');
                console.log(JSON.stringify(obj));
                console.log('Response obtido ao tentar salvar: ');
                console.log(response.status);
                console.log(body);

                if(err) {
                    req.session.error = "Houve um erro ao tentar salvar a operação. Tente novamente mais tarde!";
                    res.redirect(contextPath + "error");
                } else { 
                    res.redirect(contextPath + "suppliers");
                }
            });
        }
    }
});
app.post(contextPath + "suppliers/load-export", (req, res) => {
    const xl = require('excel4node');
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Worksheet Name');
    
    let data = req.body;
    
    const headingColumnNames = [
        "Nome",
        "Email",
        "Celular",
    ]
    
    let headingColumnIndex = 1; //diz que começará na primeira linha
    headingColumnNames.forEach(heading => { //passa por todos itens do array
        // cria uma célula do tipo string para cada título
        ws.cell(1, headingColumnIndex++).string(heading);
    });
    
    let rowIndex = 2;

    data.forEach(record => {
        let columnIndex = 1;
        Object.keys(record).forEach(columnName =>{
            ws.cell(rowIndex,columnIndex++).string(record [columnName])
        });
        rowIndex++;
    }); 
    
    
    wb.write(path.join(__dirname, "public", "export") + 'data.xlsx');
});

app.get(contextPath + "logout", (req, res) => {
    req.session.regenerate((err) => console.error(err));

    res.redirect(contextPath);
});

//Generic error route
app.all(contextPath + 'error', (req, res) => {
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
app.listen(port, () => console.log(`Rodando na porta ${port}`));