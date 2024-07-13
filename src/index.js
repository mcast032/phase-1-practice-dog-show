let editDogId = null;  // set dog to null


// domcontentloaed with fetch dog and submit form
document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();

    document.getElementById('dog-form').addEventListener('submit', event => {
        event.preventDefault();
        submitDogForm();
    });
});
// function fetch dogs
function fetchDogs() {
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
            renderDogTable(dogs);
        })
        .catch(error => console.error('Error fetching dogs:', error));
}
// function to render dogtable grab table emoty contents for each dog and append 
function renderDogTable(dogs) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    dogs.forEach(dog => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.textContent = dog.name;

        const breedTd = document.createElement('td');
        breedTd.textContent = dog.breed;

        const sexTd = document.createElement('td');
        sexTd.textContent = dog.sex;

        const editTd = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            populateForm(dog);
        });
        editTd.appendChild(editButton);

        tr.appendChild(nameTd);
        tr.appendChild(breedTd);
        tr.appendChild(sexTd);
        tr.appendChild(editTd);

        tbody.appendChild(tr);
    });
}

function populateForm(dog) {
    document.querySelector('input[name="name"]').value = dog.name;
    document.querySelector('input[name="breed"]').value = dog.breed;
    document.querySelector('input[name="sex"]').value = dog.sex;
    editDogId = dog.id;
}

function submitDogForm() {
    const name = document.querySelector('input[name="name"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const sex = document.querySelector('input[name="sex"]').value;

    const dogData = { name, breed, sex };

    if (editDogId) {
        fetch(`http://localhost:3000/dogs/${editDogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogData)
        })
        .then(response => response.json())
        .then(() => {
            editDogId = null; // Reset the editDogId
            fetchDogs(); // Re-fetch the dogs to update the table
        })
        .catch(error => console.error('Error updating dog:', error));
    }
}
