var users = 'http://localhost:3000/users';

export default  function start() {
    getMembers(render)

}


start();
// get member
function getMembers(callback) {
    fetch(users)
            .then((response) => response.json())
            .then(callback)
}



// render table
function render(users) {
    var str = `
        <tr>
            <th>FullName</th>
            <th>Email</th>
            <th>Delete</th>
        </tr>
    `
   users.reduce((acc, user) =>{
        str += `
        <tr class="course-item${user.id}">
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><button onclick="deleteCourses(${user.id})">xoa</button></td>
        </tr>
        `
        //console.log(acc);
        return str
   },'')

   document.querySelector('#table').innerHTML = str
};


function deleteCourses(id) {
    var option = {
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    };
    fetch(users + '/' + id, option) 
        .then(function(response){
            return response.json()   
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item' + id);
            if(courseItem) {
                courseItem.remove()
            }
        })
}








