// const user_labels = [];

// class UserLabel {
//     constructor(id, name, is_me, lobby_ready) {
//         this.id = id;
//         this.name = name;
//         this.element = this.createElement(is_me);
//         this.lobby_ready = lobby_ready;
//     }

//     addReadyButton() {

//     }

//     addReadySign() {

//     }

//     createElement(is_me) {
//         const parent = document.getElementById('joined_users');
//         const user_element = document.createElement('div');
    
//         user_element.className = 'joined_user';
//         user_element.innerHTML = `
//             <span class="joined_user_name">${this.name}</span>
//             <span class="joined_user_icon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
//         `;
//             {/* <button type="button" id="ready_btn">Ready</button> */}
//         if (is_me) {
//             const ready_btn = document.createElement('button');
//             ready_btn.type = 'button';
//             ready_btn.id = 'ready_btn';
//             ready_btn.innerHTML = 'Ready';
//             ready_btn.addEventListener('click', (e) => {
//                 const response = await fetch(`http://localhost:5000/api/games/asdf/set_user_ready/${this.id}`, {
//                     method: 'PUT',
//                     body: {}
//                 }).then(function(response) {
//                     return response.json();
//                 }).then(function(data) {
//                     return data;
//                 });

                
//             })
//             user_element.append(ready_btn);
//         }
//         else {
//             const ready_el = document.createElement('span');
//             ready_el.innerHTML = 'Not ready';
//             user_element.append(ready_el);
//             if (this.lobby_ready) {
//                 ready_el.innerHTML = 'Ready';
//             }
//         }
//         parent.append(user_element);
//         user_labels.push(this);
//         return user_element;
//     }

//     removeElement() {
//         this.element.remove();
//         user_labels.splice(this);
//     }
// }

// const findUserLabelById = (id) => {
//     return (user) => {
//         return user.id === id;
//     }
// }

// export { UserLabel, user_labels, findUserLabelById }
