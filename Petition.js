function validateEmail() {
	let name = document.getElementById("name").value.trim();
	if (name.length < 5 || name.length > 20) {
		alert("Name must be between 5 and 20 characters");
	}

	// Check if the email field is empty
	let email = document.getElementById("email").value.trim();
	if (!email.contains("@")) {
		alert("Email must contain @");
	}

  let state = document.getElementById("state").value.trim();
	if (state.length !== 2 || state !== state.toUpperCase()) {
		alert("State must be 2 uppercase characters");
	}
}