--init client_tb
CREATE TABLE IF NOT EXISTS client_tb (
    id serial PRIMARY KEY,
    document VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR (200) NOT NULL,
    doc_type VARCHAR(5) NOT NULL,
    since TIMESTAMP,
    address VARCHAR(500),
    addr_number SMALLINT, 
    addr_complement VARCHAR(500),
    zipcode VARCHAR(15),
    phone VARCHAR(30)
);

INSERT INTO client_tb VALUES(
    1,
    '24793101000125',
    'Empresa TESTE',
    'CNPJ',
    NOW(),
    'Rua Aquidauana',
    108,
    'Bairro: Zona 07, Cidade: Cianorte, Estado: PR',
    '87208-100',
    '+55 044 99102-2354'
);
--end client_tb init supplier_tb
CREATE TABLE IF NOT EXISTS supplier_tb (
    id serial PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    trad_name VARCHAR(200) NOT NULL,
    document VARCHAR(15) UNIQUE NOT NULL,
    contact_name VARCHAR (200) NOT NULL,
    contact_phone VARCHAR (20) NOT NULL,
    contact_mail VARCHAR (50) NOT NULL,
    doc_type VARCHAR(5) NOT NULL,
    address VARCHAR(500),
    addr_number SMALLINT, 
    addr_complement VARCHAR(500),
    zipcode VARCHAR(15),
    phone VARCHAR(30),
    mail VARCHAR(50)
);

INSERT INTO supplier_tb VALUES(
    1,
    'Test Company SA',
    'Test Best Company',
    '23773201000115',
    'Employe',
    '+55 041 98103-2345',
    'employe@testco.com',
    'CNPJ',
    'Rua Aquidauana',
    108,
    'Bairro: Zona 07, Cidade: Cianorte, Estado: PR',
    '87208-100',
    '+55 044 3323-2345',
    'contact@testco.com'
);
--end supplier_tb init warehouse_tb
CREATE TABLE IF NOT EXISTS warehouse_tb (
    id serial PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    manager VARCHAR(200) NOT NULL,
    manager_mail VARCHAR(100) NOT NULL,
    capacity NUMERIC(8, 1) NOT NULL,
    address VARCHAR(500),
    addr_number SMALLINT, 
    addr_complement VARCHAR(500),
    zipcode VARCHAR(15),
    phone VARCHAR(30),
    mail VARCHAR(50)
);

INSERT INTO warehouse_tb VALUES(
    1,
    'BRPRGGH01',
    'Manager',
    'manager.ggh01@boaentrega.com.br',
    110.0,
    'Rua Aquidauana',
    110,
    'Bairro: Zona 07, Cidade: Cianorte, Estado: PR',
    '87208-100',
    '+55 044 3423-2355',
    'ggh01@boaentrega.com.br'
);
--end warehouse_tb init prod_catalog_tb
CREATE TABLE IF NOT EXISTS prod_catalog_tb (
    id serial PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(5000),
    type VARCHAR(50),
    category VARCHAR(50),
    batch_code VARCHAR(20), 
    expiration_date TIMESTAMP,
    height NUMERIC(5,3),
    width NUMERIC(5,3),
    depth NUMERIC(5,3),
    weight NUMERIC(5,3),
    qtd NUMERIC(8,1),
    capacity_size NUMERIC(8,1),
    visible BOOLEAN
);

INSERT INTO prod_catalog_tb VALUES(
    1,
    'A-0010-Z',
    'Product A 01 Model X - White',
    'Condition: New',
    null,
    'Eletronics',
    null,
    null,
    0.1,
    0.1,
    0.1,
    0.1,
    1000,
    0.1,
    'true'
);