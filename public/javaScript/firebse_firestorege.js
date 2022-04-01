const db = firebase.firestore();
const USERS = "Users";

/* add user data to firestore */
function addData() {
	var nameUser =  $("#inputName").val();
    var ageUser =  $("#inputAge").val();
    var countryUser =  $("#inputCountry").val();
	
	// Add a new document in collection "Users"	
	db.collection(USERS).add({
		name: nameUser,
		age: ageUser,
		country: countryUser
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
		location.reload();
		//readData()
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
	
	var message = nameUser + " " + ageUser + " years old from "+ countryUser +", saved in the database.";
	
	alert(message);
}

/* get all data from firestore */
function readData(){
	var cnt = 0;
	db.collection(USERS).get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			cnt++;	
			console.log(doc.id, " => ", doc.data().name);
			
			var uId = "'"+doc.id+"'";
			var uName = "'"+doc.data().name+"'";
			
			$("#dataRow").before(
				'<tr>' +
					'<th scope="row">' + cnt + '</th>' +
					'<td>' + doc.data().name + '</td>' +
					'<td>' + doc.data().age + '</td>' + 
					'<td>' + doc.data().country + '</td>' +
					'<td>' +
						'<button type="button" class="btn btn-outline-primary" onclick="openPromt(' + uId + ', ' + uName + ')">' +
							'<img src="images/svg/pencil.svg"></img>' +
						'</button>' +
					'</td>' +
					'<td>' +
						'<button type="button" class="btn btn-outline-primary" onclick="removeUser(' + uId + ')">' +
							'<img src="images/svg/bucket.svg">' +
						'</button>' +
					'</td>' +
				'</tr>'
			);
		});
	});
}

/* open promt with input a new country for change it on the user data */
function openPromt(userId, userName){
	console.log("Hello world!");
	
	var country = prompt("Change user country of " + userName);
	
	if (country && country != null && country != "")
		updateUserCountry(userId, country);
}

/* update user country via user id */
function updateUserCountry(userId, userNewCountry){
	console.log("Hello world!");
	
	// To update country :
	db.collection(USERS).doc(userId).update({
		"country": userNewCountry
	})
	.then(() => {
		console.log("Document successfully updated!");
		location.reload();
	});
}

/* remove user from data via user id */
function removeUser(userId){
	
	db.collection(USERS).doc(userId).delete().then(() => {
		console.log("Document successfully deleted!");
		location.reload();
	}).catch((error) => {
		console.error("Error removing document: ", error);
	});
	
	alert("removeUser");
}
