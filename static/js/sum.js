window.addEventListener("load", () => {
	const params = new URL(document.location).searchParams;
	const name = params.get("cname");
	const amount = params.get("*tpv");

	document.getElementById("amt").innerHTML = name;
	document.getElementById("sname").innerHTML = amount;
});
