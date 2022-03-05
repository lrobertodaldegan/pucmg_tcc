function sendInfoToForm(supplierDoc){
    window.location.replace("http://localhost:7070/sge/suppliers/form?document=" + supplierDoc);
}

function retryLoadData(go){
    if(go == true)
        window.location.reload();
}