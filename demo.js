function saveToBackEnd(event) {

    event.preventDefault();

    price = event.target.chooseprice.value;
    dish = event.target.choosedish.value;
    table = event.target.table.value;


    obj = {
        price,
        dish,
        table
    }

    axios.post('https://crudcrud.com/api/ce82664f9c734a13a46d0cbcb8744936/applicationData', obj)
    .then((response) => {
        showUserOnScreen(response.data)
        document.getElementById('price').value = '';
        document.getElementById('dish').value = '';
        document.getElementById('table').value = '';
    })
    .catch((error) => {
        console.log(error);
        document.body.innerHTML =document.body.innerHTML + "<h4> Something Went wrong </h4>"
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/ce82664f9c734a13a46d0cbcb8744936/applicationData')
    .then((response) => {
        for(var i = 0; i<response.data.length; i++)
        {
            showUserOnScreen(response.data[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

function showUserOnScreen(obj) {

    
    const childElemnt = `<li id = ${obj._id}> ${obj.price} - ${obj.dish} - ${obj.table}
    <button onclick = deleteuser('${obj._id}','${obj.table}')> Delete Dish </button>
    </li>`
    if(obj.table === 'table1')
    {
        const parentElement = document.getElementById('ordertable1')
        parentElement.innerHTML = parentElement.innerHTML + childElemnt

    }
    else if(obj.table === 'table2')
    {
        const parentElement = document.getElementById('ordertable2')
        parentElement.innerHTML = parentElement.innerHTML + childElemnt
    }
    else if(obj.table === 'table3')
    {
        const parentElement = document.getElementById('ordertable3')
        parentElement.innerHTML = parentElement.innerHTML + childElemnt
    }
    
}

function deleteuser(objId, objtable) {
    axios.delete(`https://crudcrud.com/api/ce82664f9c734a13a46d0cbcb8744936/applicationData/${objId}`)
    .then((response) => {
        removeUserfromScreen(objId, objtable)
    })
    .catch(err => console.log(err))
}

function removeUserfromScreen(objId, objtable){
    if(objtable === 'table1')
    {
        const parentElement = document.getElementById('ordertable1')
        const childNodeTobeDeleted = document.getElementById(objId)
        parentElement.removeChild(childNodeTobeDeleted)
        console.log("Deleted 1")

    }
    else if(objtable === 'table2')
    {
        const parentElement = document.getElementById('ordertable2')
        const childNodeTobeDeleted = document.getElementById(objId)
        if(childNodeTobeDeleted){
            parentElement.removeChild(childNodeTobeDeleted)
            console.log("Deleted 2")
        }
        
    }
    else if(objtable === 'table3')
    {
        const parentElement = document.getElementById('ordertable3')
        const childNodeTobeDeleted = document.getElementById(objId)
        if(childNodeTobeDeleted){
            parentElement.removeChild(childNodeTobeDeleted)
        }
        console.log("Deleted 3")
        
    }
}