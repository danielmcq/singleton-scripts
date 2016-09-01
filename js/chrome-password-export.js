"use strict"

// Requires Chrome v51 or higher as of 2016/09/01
function exportPasswords (includeHeader = true, quoteValues = true) {
	const HEADERS = ["hostname","username","password","formSubmitURL","httpRealm","usernameField","passwordField"]

	let pm = PasswordManager.getInstance();
	let model = pm.savedPasswordsList_.dataModel;
	let pl = pm.savedPasswordsList_;

	// Trigger Chrome to prompt user for OS credentials before allowing access to its password store.
	for (let i = 0; i < model.length; i++) {
		PasswordManager.requestShowPassword(i);
	};

	function array2DtoCSV (array2D) {
		return array2D.map(row => row.map(col => {
			if (quoteValues) return `"${col}"`
			return col
		}).join(",")).join("\n")
	}

	function print () {
		let out = [];

		if (includeHeader) {
			out.push(HEADERS)
		}

		for (let i = 0; i < model.length; i++) {
			let item = pl.getListItemByIndex(i);
			let row = []

			row.push(model.array_[i].url) // hostname
			row.push(model.array_[i].username) // username
			row.push(item.childNodes[0].childNodes[2].childNodes[0].value.replace(/"/g, '""')) // password, escaped
			row.push(model.array_[i].url) // formSubmitURL
			row.push("") // httpRealm
			row.push("") // usernameField
			row.push("") // passwordField

			out.push(row)
		}
		console.log( array2DtoCSV(out) );
	}

	setTimeout(print, 2500);
}