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

    axios.post('https://crudcrud.com/api/9f351587e00c4d1784af1e528a079a6f/applicationData', obj)
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
    axios.get('https://crudcrud.com/api/9f351587e00c4d1784af1e528a079a6f/applicationData')
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
    <button onclick = deleteuser('${obj._id}')> Delete Dish </button>
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

function deleteuser(objId) {
    axios.delete(`https://crudcrud.com/api/9f351587e00c4d1784af1e528a079a6f/applicationData/${objId}`)
    .then((response) => {
        removeUserfromScreen(objId)
    })
    .catch(err => console.log(err))
}

function removeUserfromScreen(objId){
    const parentElement= document.getElementById('listoftables')
    const childNodeTobeDeleted = document.getElementById(id)
    if(childNodeTobeDeleted){
        parentElement.removeChild(childNodeTobeDeleted)
    }
}