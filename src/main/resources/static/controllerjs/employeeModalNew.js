
// window.onload = function () {
//     console.log('Browser Onload');
//     const employeeTable = document.querySelector('#tableEmployee')
//     console.log(employeeTable);

// }

// access browser onload event

window.addEventListener('load', () => {

    //call table refresh function
    refreshEmployeeTable();
    //call form refreash function
    refreshEmployeeForm()
})

//create function for refreash table record
const refreshEmployeeTable = () => {
    //create array for store employee data list5
    // employees = [
    //     {
    //         id: 1, number: 'EMP001', fullname: 'Hirusha1 Fernando', nic: '991661700V',
    //         mobile: '0775371591', email: 'hirushafernando121@gmail.com',
    //         // dob:'2023/12/08',
    //         employeeStatus_id: { id: 1, name: 'Working' },
    //         designation_id: { id: 1, name: 'Manager' },
    //         hasUserAccount: true

    //     },

    //     {
    //         id: 2, number: 'EMP002', fullname: 'Hirusha2 Fernando', nic: '991661701V',
    //         mobile: '0775371592', email: 'hirushafernando122@gmail.com',
    //         // dob:'2023/12/08',
    //         employeeStatus_id: { id: 2, name: 'Resign' },
    //         designation_id: { id: 1, name: 'Cashier' },
    //         hasUserAccount: false
    //     },

    //     {
    //         id: 3, number: 'EMP003', fullname: 'Hirusha3 Fernando', nic: '991661702V',
    //         mobile: '0775371593', email: 'hirushafernando123@gmail.com',
    //         // dob:'2023/12/08',
    //         employeeStatus_id: { id: 1, name: 'Working' },
    //         designation_id: { id: 1, name: 'Store-Manager' },
    //         hasUserAccount: true
    //     },

    //     {
    //         id: 4, number: 'EMP004', fullname: 'Hirusha4 Fernando', nic: '991661704V',
    //         mobile: '0775371594', email: 'hirushafernando124@gmail.com',
    //         // dob:'2023/12/08',
    //         employeeStatus_id: { id: 3, name: 'Deleted' },
    //         designation_id: { id: 1, name: 'Manager' },
    //         hasUserAccount: false
    //     }
    // ];
    // employees = [];
    // let request =  $.ajax({url:'/employee/findall', method:'GET', dataType:'json'});
    // request.done(function(data){
    //     console.log("successfully"+data);
    //     employees = data;
    //     console.log(employees);
    // });
    // request.fail(function(xrRes, status){
    //     console.log("field" + status);
    // })
    employees = [];
    $.ajax('/employee/findall',{
        async: false,
        dataType:'json',
        success:function(data, status, ahr){
            console.log("success"+status + " " + ahr);
            employees =data;
        },
        error:function(ahr, status, errormsg){
            console.log("Fail"+ errormsg+" "+ status);
            employees = [];
        }
    })

    designations = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Cashier' }, { id: 3, name: 'As-Manager' }]

    // selectDesignation.innerHTML = '';
    // const optionMsg = document.createElement('option');
    // optionMsg.innerText = 'Select Designation';
    // optionMsg.selected = 'selected';
    // optionMsg.disabled = 'disabled';
    // selectDesignation.appendChild(optionMsg)

    // designations.forEach(element => {
    //     const option = document.createElement('option');
    //     option.innerText = element.name;
    //     option.value = JSON.stringify(element);
    //     selectDesignation.appendChild(option);
    // })
    fillDataIntoSelect(selectDesignation, "Select Designation", designations, 'name')


    selCivil = [{ id: 1, name: 'Married' }, { id: 2, name: 'Single' }]

    // selectStatus.innerHTML = '';
    // const optionMsg2 = document.createElement('option');
    // optionMsg2.innerText = 'Select Civil Status';
    // optionMsg2.selected = 'selected';
    // optionMsg2.disabled = 'disabled';
    // selectStatus.appendChild(optionMsg2)

    // selCivil.forEach(element => {
    //     const option = document.createElement('option');
    //     option.innerText = element.name;
    //     option.value = JSON.stringify(element);
    //     selectStatus.appendChild(option);
    // })
    fillDataIntoSelect(selectStatus, "Select Status", selCivil, 'name')


    Empstatuses = [{ id: 1, name: 'Working ' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Delete' }]

    selectEStatus.innerHTML = '';
    const optionMsg1 = document.createElement('option');
    optionMsg1.innerText = 'Select Designation';
    optionMsg1.selected = 'selected';
    optionMsg1.disabled = 'disabled';
    selectEStatus.appendChild(optionMsg1)

    Empstatuses.forEach(element => {
        const option = document.createElement('option');
        option.innerText = element.name;
        option.value = JSON.stringify(element);
        selectEStatus.appendChild(option);
    })
    const displayProperty = [
        { property: 'empno', dataType: 'string' },
        { property: 'fullname', dataType: 'string' },
        { property: 'nic', dataType: 'string' },
        { property: 'mobile', dataType: 'string' },
        { property: 'email', dataType: 'string' },
        // { property: 'dob', dataType: 'string' },
        // {property:'employeeStatus_id.name',dataType:'object'},
        { property: getEmployeeStatus, dataType: 'function' },
        { property: getEmpDesign, dataType: 'function' },
        { property: getHasUserAccount, dataType: 'function' },
        // { property: "hasUserAccount", dataType: 'boolean' },

    ]

    //call fill data into table function
    // fillDataIntoTable(tableId,dataList, display property List, refillFunctionName, deleteFunctionName, printFunctionName,buttonVisibility)
    fillDataIntoTable(tableEmployee, employees, displayProperty, refillEmployeeForm, deleteButtonFunction, printEmployee, true)
    // Initialize DataTables on the tableEmployee
    $(document).ready(function () {
        $('#tableEmployee').DataTable({
            paging: true, // Enable pagination
            searching: true, // Enable search
        });
    });

    // // full name validation
    // inputFullName1.addEventListener('keyup', () => {
    //     // employee.fullname = this.value;
    //     textValidation(inputFullName1, '^([A-Z][a-z]{2,30}[\\s])+([A-Z][a-z]{2,30}){1}$', 'employee', 'fullname')
    // }
    // )
    // //landphone validation
    // inputLand.addEventListener('keyup', () => {
    //     textValidation(inputLand, '^[0][12345689][0-9]{8}$');
    // }
    // )
    // // email validation
    // inputEmail.addEventListener('keyup', () => {
    //     textValidation(inputEmail, '^[A-Za-z0-9]{6,20}[@][a-z]{3,10}[.][a-z]{2,3}$');
    // }
    // )
    // // nic validation
    // inputNIC.addEventListener('keyup', () => {
    //     textValidation(inputNIC, '^(([0-9]{9}[VvXxSs])|([0-9]{12}))$');
    // }
    // )
    // //select validatin
    // selectDesignation.addEventListener('change', () => {
    //     selectFieldValidation(selectDesignation, '')
    // })

}

const getEmployeeStatus = (rowOb) => {

    if (rowOb.employeestatus_id.name == 'Working') {

        return '<p class="working-status">' + rowOb.employeestatus_id.name + '</p>';
    }
    if (rowOb.employeestatus_id.name == 'Resign') {

        return '<p class="resign-status">' + rowOb.employeestatus_id.name + '</p>';
    }
    if (rowOb.employeestatus_id.name == 'Deleted') {

        return '<p class="deleted-status">' + rowOb.employeestatus_id.name + '</p>';
    }
}

//create function for refreashForm area
const refreshEmployeeForm = () => {
    //create empty object
    employee = {};
    // get data list for select element
    designations = [
        { id: 1, name: "Manager" },
        { id: 2, name: "Cashier" },
        { id: 3, name: "Store-Manager" },
    ]
    fillDataIntoSelect(selectDesignation, 'Select Designation', designations, 'name')

    //need to empty all element
    inputNIC.value = '';
    inputDob.value = '';
    selectStatus.value = ''


    //set min value
    //min = current date newDate()
    //max = current date + 14 days
    inputDob.min = '2023-09-01';
    inputDob.max = '2023-09-30';

    //need to set default color
    inputNIC.classList.remove("is-valid");
    inputNIC.style.border = '1px solid #ced4da'
    inputDob.classList.remove("is-valid");
    inputDob.style.border = '1px solid #ced4da'
}

const getEmpDesign = (rowOb) => {
    if (rowOb.designation_id.name == 'Manager') {
        return '<p class="working-status">' + rowOb.designation_id.name + '</p>';
    }
    if (rowOb.designation_id.name == 'Store-Manager') {
        return '<p class="resign-status">' + rowOb.designation_id.name + '</p>';
    }
    if (rowOb.designation_id.name == 'Cashier') {
        return '<p class="deleted-status">' + rowOb.designation_id.name + '</p>';
    }
}

const getHasUserAccount = (rowOb) => {
    console.log(rowOb);
    if (rowOb.hasUserAccount) {
        return '<p class="working-status">' + 'yes' + '</p>';
    } else {
        return '<p class="deleted-status">' + 'no' + '</p>';
    }
}

const deleteButtonFunction = (rowindex) => {
    const userConfirm = confirm('Are you sure you want to delete');
    if (userConfirm) {
        alert('Employee delete succefully');
        // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

        refreshEmployeeTable()

    } else {

    }
}

//function of generate calling name values
const generateCallingNameValues = () => {
    const callingnames = document.querySelector('#dtaList');
    callingnames.innerHTML = '';

    callingNamePartList = inputFullName1.value.split(' ');
    console.log(callingNamePartList);
    callingNamePartList.forEach(item => {
        const option = document.createElement('option');
        option.value = item;

        callingnames.appendChild(option);
    })
}

//create function for validate calling name
const txtCallingNameValidator = (feild) => {
    const callingNameValue = feild.value;
    console.log(callingNamePartList);
    let cnameExt = false;
    for (let element of callingNamePartList) {
        if (element == callingNameValue) {
            cnameExt = true;
            break;
        }
    };
    // let exInddex = callingNamePartList.map(cname => cname).indexOf(callingNameValue);


    if (cnameExt) {
        //valid
        feild.style.border = '2px solid green'
        employee.callingnames = "callingNameValue"
    } else {
        //invalid
        feild.style.border = '2px solid red'
        employee.callingnames = "null"
    }
}

//create function for check form error
//need to check all required property values
const checkError = () => {
    let errors = '';
    console.log(employee);
    // if (inputFullName1.value == "") 
    if (employee.fullname == null) {
        errors = errors + "Please enter a valid fullname";
        // inputFullName1.style.border = '2px solid red';
        inputFullName1.classList.add("is-invalid");
    } else {
        inputFullName1.classList.remove("is-invalid");
        inputFullName1.classList.add("is-valid");
    }
    if (employee.callingnames == null) {
        errors = errors + "Please enter a valid callingnames";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }
    if (employee.nic == null) {
        errors = errors + "Please enter a valid nic";
        // inputFullName1.style.border = '2px solid red';
        inputNIC.classList.add("is-invalid");
    }
    if (employee.mobile == null) {
        errors = errors + "Please enter a valid mobile";
        // inputFullName1.style.border = '2px solid red';
        inputMobNo.classList.add("is-invalid");
    }
    if (employee.landno == null) {
        errors = errors + "Please enter a valid land";
        // inputFullName1.style.border = '2px solid red';
        inputLandNo.classList.add("is-invalid");
    }
    if (employee.email == null) {
        errors = errors + "Please enter a valid email";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }

    return errors;
}

//create function for add button
const buttonEmpAdd = () => {
    // console.log("hi");
    //1.need to check form error ---> checkError()
    let formErrors = checkError()
    if (formErrors == "") {
        // alert("no errors")
        //2.need to check user confirmation
        let userConfirm = window.confirm("Are you sure?" +
            employee.fullname +
            employee.nic +
            employee.email +
            employee.mobile +
            employee.landno +
            employee.designation_id +
            employee.civilstatus +
            employee.employeestatus_id)
        if (userConfirm) {
            //3.pass data into backend
            let serverResponse;
            $.ajax('/employee',{
                async: false,
                type: "POST",
                data:JSON.stringify(employee),
                contentType:'application/json',
                success:function(data, status, ahr){
                    console.log("success"+status + " " + ahr);
                    serverResponse =data;
                },
                error:function(ahr, status, errormsg){
                    console.log("Fail"+ errormsg+" "+ status);
                    serverResponse = errormsg;
                }
            })
            //4.check backend response
            if (serverResponse == "OK") {
                alert("Save successfully...!" + serverResponse)
                refreshEmployeeTable();
                refreshEmployeeForm();
                //need hide modal
                $('#empForm').modal('hide');

            } else {
                alert("Save not succefully  .." + serverResponse)
            }

        }
    } else {
        alert("formErrors: " + formErrors)
    }
}

const refillEmployeeForm = (item) => {
    $('#empForm').modal('show');

    // employee = employees[rowindex]; // No 'let' declaration, directly update the outer 'employee'
    console.log(item);
}



const printEmployee = (rowindex) => {

}