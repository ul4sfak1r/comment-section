const firstCommentButton = document.getElementById('first-comment-button');
const wrapperDiv = document.querySelector('.wrapper');
const commentSection = document.querySelector('.comment-section');
let pictureURL = null;
const firstName = null;
const lastName = null;
let usersINFO = [];

document.addEventListener('DOMContentLoaded', () => {
	Object.keys(localStorage).forEach(key => {
		const parsedData = JSON.parse(localStorage.getItem(key));

		commentSection.insertAdjacentHTML('beforeEnd', `
			<div class="comment">
				<img src="${parsedData.pictureURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg?20200423155822'}">
				${parsedData.firstName}
				${parsedData.lastName}
				<div>${parsedData.comment}</div>
			</div>
		`);  
	})  
})

wrapperDiv.addEventListener('click', (event) => {
	const uniqueKey = `user_${Date.now()}`;

	if (event.target == firstCommentButton) {
		firstCommentButton.classList.add('hidden');

		wrapperDiv.insertAdjacentHTML('afterBegin', `
			<div id="input-div">
				<input type="text" required placeholder="Name" id="name">
				<input type="text" required placeholder="Surname" id="surname">
				<input type="file" required id="picture-url">
				<button class="btn btn-primary send-btn">SEND</button>
			</div>
		`)

		document.getElementById('picture-url').addEventListener('change', (event) => {
			const file = event.target.files[0]; //The file uploaded
			const reader = new FileReader(); //This object is going to read the file

			reader.addEventListener('load', () => { //Once the reader finished taking out the file and converting it into a 64 Data URL, we can do something with that string
				pictureURL = reader.result; //Base 64 Data URL
			})

			reader.readAsDataURL(file);
		})
	}

	if (event.target == document.querySelector('.send-btn')) {
		document.getElementById('input-div').classList.add('hidden');

		const firstName = document.getElementById('name').value.trim();
		const lastName = document.getElementById('surname').value.trim();

		wrapperDiv.insertAdjacentHTML('afterBegin', `
			<div class="comment">
				<img src="${pictureURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg?20200423155822'}">
				<textarea placeholder="Write a comment" cols="40" rows="3"></textarea>
				<button class="btn btn-primary post-comment-btn">SEND</button>
			</div>
		`)
	}

	if (event.target == document.querySelector('.post-comment-btn')) {
		const comment = document.querySelector('textarea').value.trim();

		let user = {
			firstName: document.getElementById('name').value.trim(),
			lastName: document.getElementById('surname').value.trim(),
			comment,
			pictureURL
		}

		commentSection.insertAdjacentHTML('afterBegin', `
			<div class="comment">
				<img src="${user.pictureURL  || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg?20200423155822'}">
				${user.firstName}
				${user.lastName}
				<div>${user.comment}</div>
			</div>
		`);  	

		document.querySelector('textarea').value = '';

		localStorage.setItem(`${uniqueKey}`, JSON.stringify(user));
	}
})