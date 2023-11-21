// define function for fill data into select element



const fillDataIntoSelect = (fieldId,message, dataList, property)=>{
    fieldId.innerHTML = '';
    const optionMsg = document.createElement('option');
    optionMsg.value = ""
    optionMsg.innerText = message;
    optionMsg.selected = 'selected';
    optionMsg.disabled = 'disabled';
    fieldId.appendChild(optionMsg)
    
    dataList.forEach(element => {
        const option = document.createElement('option');
        option.innerText = element[property];
        option.value = JSON.stringify(element);
        fieldId.appendChild(option);
    })

}