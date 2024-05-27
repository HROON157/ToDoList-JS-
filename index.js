const addList = (event) => {
     
    if (event.key === "Enter") {
    //    Hold the user entered value
        let grabValue = document.getElementById('toDoInput').value;
        
        if(grabValue== ''){
            alert('Please enter task');
            return;
        }

        // Create a container for the to-do item
        let toDoItem = document.createElement('div');
        toDoItem.className = 'todo-item';

        // Create label and set its content
        let label = document.createElement('label');
        label.htmlFor = grabValue;
        label.className = 'todo-label';
        label.appendChild(document.createTextNode(grabValue));

        // Create input field for editing
        let editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = grabValue;
        editInput.style.display = 'none';

        // Create checkbox
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        

        // Add event listener to the checkbox
        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                label.innerHTML = '<del>' + grabValue + '</del>';
            } else {
                label.innerHTML = grabValue;
            }
        });

        // Create dot button
        let dotButton = document.createElement('button');
        dotButton.className = 'dot-button';
        for (let i = 0; i < 3; i++) {
            let dot = document.createElement('div');
            dot.className = 'dot';
            dotButton.appendChild(dot);
        }

        // Create delete icon
        let deleteIcon = document.createElement('span');
        deleteIcon.className = 'delete-icon';
        deleteIcon.innerHTML = 'Delete';
        deleteIcon.style.display = 'none';

        // Create the edit icon
        let editIcon = document.createElement('span');
        editIcon.className = 'edit-icon';
        editIcon.innerHTML = 'Edit';
        editIcon.style.display = 'none';
        let editMode = false;

        // Add click event listener to the dot button
        dotButton.addEventListener('click', () => {
            const isVisible = deleteIcon.style.display === 'inline';
            if(isVisible){
                deleteIcon.style.display  = 'none';
                editIcon.style.display  = 'none';
            }
            else{
                deleteIcon.style.display = 'inline';
                editIcon.style.display  = 'inline'
            }
        });

        // Add click event listener to the edit icon
        editIcon.addEventListener('click', () => {
            if (!editMode) {
                // Enter edit mode
                label.style.display = 'none';
                editInput.style.display = 'inline';
                editMode = true;
            } else {
                // Exit edit mode and save changes
                grabValue = editInput.value;
                label.innerHTML = grabValue;
                label.style.display = 'inline';
                editInput.style.display = 'none';
                editMode = false;
            }
        });

        // Save changes when pressing Enter key on the edit input
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                editIcon.click();
            }
        });

        // Remove to-do item when user clicks on the delete icon
        deleteIcon.addEventListener('click', () => {
            document.getElementById('toDoList').removeChild(toDoItem);
        });

        // Append elements to the to-do item container
        toDoItem.appendChild(checkbox);
        toDoItem.appendChild(label);
        toDoItem.appendChild(editInput);
        toDoItem.appendChild(dotButton);
        toDoItem.appendChild(deleteIcon);
        toDoItem.appendChild(editIcon);

        // Append the to-do item to the to-do list
        document.getElementById('toDoList').appendChild(toDoItem);

        // Clear the input field
        document.getElementById('toDoInput').value = "";
    }
};

// Clear the completed tasks
const clearCompletedTasks = () => {
    let checkboxID = 'input[type="checkbox"]'
    let clearAllCompleted = document.getElementById("clearCompleted");
    clearAllCompleted.addEventListener('click', function() {
        let todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach((item) => {
            let checkbox = item.querySelector(checkboxID);
            if (checkbox.checked) {
                item.parentNode.removeChild(item);
            }
        });
    });
};

// If user clicks on clear All Completed without clicking on checkbox
/*
const clearCompletedTasks = () => {
    let items = document.querySelectorAll('.todo-item');
    items.forEach(item => {
        document.getElementById('toDoList').removeChild(item);
    });
};
*/