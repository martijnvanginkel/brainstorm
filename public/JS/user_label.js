const user_labels = [];

class UserLabel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.element = this.createElement();
    }

    createElement() {
        const parent = document.getElementById('joined_users');
        const user_element = document.createElement('div');
    
        user_element.className = 'joined_user';
        user_element.innerHTML = `
            <span class="joined_user_name">${this.name}</span>
            <span class="joined_user_icon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
            <button type="button" id="ready_btn">Ready</button>
        `;
        parent.append(user_element);
        user_labels.push(this);
        return user_element;
    }

    removeElement() {
        this.element.remove();
        user_labels.splice(this);
    }
}

const findUserLabelById = (id) => {
    return (user) => {
        return user.id === id;
    }
}

export { UserLabel, user_labels, findUserLabelById }
