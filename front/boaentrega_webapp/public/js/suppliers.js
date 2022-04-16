function sendInfoToForm(supplierDoc){
    window.location.replace("http://localhost:7070/gsl/suppliers/form?document=" + supplierDoc);
}

function retryLoadData(go){
    if(go == true)
        window.location.reload();
}

function exportData(data){
    console.log(data);

    fetch("http://localhost:7070/gsl/suppliers/load-export",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: data
        })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));

    window.open("/export/data.xlsx", "_blank");
}