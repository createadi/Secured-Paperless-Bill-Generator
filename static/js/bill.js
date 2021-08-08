// Add product

$(document).ready(function () {
	$("#login_button").on("click", function (e) {
		var pname = $("#pname").val();
		var price = $("#price").val();
		var obj = { proname: pname, proprice: price };
		var myJSON = JSON.stringify(obj);
		$.ajax({
			url: "/addpro",
			type: "post",
			contentType: "application/json",
			dataType: "json",
			data: myJSON,
		}).done(function (result) {
			console.log("completed");
		});
		e.preventDefault();
	});
});

// -------------------------------------------------------------------------------------------------------------------

// Add Customer
$(document).ready(function () {
	$("#Add_Customer").on("click", function (e) {
		var cname = $("#cname").val();
		var cmob = $("#cmob").val();
		var cadd = $("#cadd").val();
		var obj = { cusname: cname, cusmob: cmob, cusadd: cadd };
		var myJSON = JSON.stringify(obj);
		$.ajax({
			url: "/addcus",
			type: "post",
			contentType: "application/json",
			dataType: "json",
			data: myJSON,
		}).done(function (result) {
			console.log("completed");
		});
		e.preventDefault();
	});
});

// ----------------------------------------------------------------------------------------------------------------------

// for all mathematical price, totalprice and discount before clicking submit button

var price = "";
var priceall = "";
var discount = "";
document.getElementById("*pri").addEventListener("keyup", function () {
	price = document.getElementById("*pri").value;
	document.getElementById("*tpri").value = price * priceall - discount;
});

document.getElementById("*qua").addEventListener("keyup", function () {
	priceall = document.getElementById("*qua").value;

	document.getElementById("*tpri").value = price * priceall - discount;
});

document.getElementById("*dis").addEventListener("keyup", function () {
	discount = document.getElementById("*dis").value;

	document.getElementById("*tpri").value = price * priceall - discount;
});

// -----------------------------------------------------------------------------------------------------------------------------

// for printing table when we click submit button

var sum = 0;
document.getElementById("*psubmit").addEventListener("click", func);
function func() {
	if (document.getElementById("*pname").value == "") {
		document.getElementById("*pname").style.border = "2px solid red";
		setTimeout(function () {
			document.getElementById("*pname").style.border = "2px solid black";
		}, 2000);
	} else if (document.getElementById("*pri").value == "") {
		document.getElementById("*pri").style.border = "2px solid red";
		setTimeout(function () {
			document.getElementById("*pri").style.border = "2px solid black";
		}, 2000);
	} else if (document.getElementById("*qua").value == "") {
		document.getElementById("*qua").style.border = "2px solid red";
		setTimeout(function () {
			document.getElementById("*qua").style.border = "2px solid black";
		}, 2000);
	} else if (document.getElementById("*dis").value == "") {
		document.getElementById("*dis").style.border = "2px solid red";
		setTimeout(function () {
			document.getElementById("*dis").style.border = "2px solid black";
		}, 2000);
	} else if (document.getElementById("*tpri").value == "") {
		document.getElementById("*tpri").style.border = "2px solid red";
		setTimeout(function () {
			document.getElementById("*tpri").style.border = "2px solid black";
		}, 2000);
	} else {
		let a = document.getElementById("*pname").value;
		let b = document.getElementById("*pri").value;
		let c = document.getElementById("*qua").value;
		let d = document.getElementById("*dis").value;
		let e = document.getElementById("*tpri").value;

		var table = document.getElementById("content");
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);

		var index,
			index1,
			table11 = document.getElementById("table");
		for (var i = 0; i < table.rows.length; i++) {
			table.rows[i].onclick = function () {
				index = this.rowIndex;

				// console.log(index);
				var l = document
					.getElementById("content")
					.rows[index].cells.item(4).innerHTML;
				// console.log(l);
				sum = sum - l;
				console.log(sum);
				if (sum == 0) {
				}
				document.getElementById("*tpv").innerHTML = "Total Payment - " + sum;
				document.getElementById("content").deleteRow(index);

				// indexc = this.rows[i].value;
			};
		}

		var total = parseInt(document.getElementById("*tpri").value);

		sum = sum + total;
		console.log(sum);
		// cell2.innerHTML = sum;
		document.getElementById("*tpv").innerHTML = "Total Payment - " + sum;

		cell1.innerHTML = a;
		cell2.innerHTML = b;
		cell3.innerHTML = c;
		cell4.innerHTML = d;
		cell5.innerHTML = e;
		cell6.innerHTML = `<a href="#"> delete </a>`;

		document.getElementById("*pname").value = "";
		document.getElementById("*pri").value = "";
		document.getElementById("*qua").value = "";
		document.getElementById("*dis").value = "";
		document.getElementById("*tpri").value = "";
	}
}

// ------------------------------------------------------------------------------------------------------------------------------

//printing table data in console and creating popup window

var billout = document.getElementById("billout");

var generatebill = document.getElementById("generate1");
generatebill.addEventListener("click", function () {
	billout.style.display = "block";
	var cn = document.getElementById("cname").value;
	var cm = document.getElementById("cmob").value;
	var ca = document.getElementById("cadd").value;

	var cdet = document.getElementsByClassName("cdet");
	cdet[0].innerHTML = cn;
	cdet[1].innerHTML = cm;
	cdet[2].innerHTML = ca;

	// var tablevalue = document.getElementById("content");
	// console.log(tablevalue);
	// for (var i = 0; i < tablevalue.rows.length; i++) {
	// 	for (var j = 0; j < tablevalue.rows.item(i).cells.length; j++) {
	// 		var first = tablevalue.rows[i].cells(j).innerHTML;
	// 		console.log(first);
	// 	}
	// }

	function showTableData() {
		document.getElementById("info").innerHTML = "";
		var myTab = document.getElementById("content");

		// LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
		for (i = 0; i < myTab.rows.length; i++) {
			con = "";

			// GET THE CELLS COLLECTION OF THE CURRENT ROW.
			var objCells = myTab.rows.item(i).cells;

			// LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
			for (var j = 0; j < objCells.length - 1; j++) {
				// info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
				con = con + " " + objCells.item(j).innerHTML;
			}
			// info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
			console.log(con);
		}
	}
	showTableData();

	// var total = parseInt(document.getElementById("*tpri").value);

	// 	sum = (sum+total);
	// 	console.log(sum);
	// 	cell2.innerHTML = sum;
	document.getElementById("tpcopy").innerHTML = "Total Payment - " + sum;
});

var billoutbutton = document.querySelector(".billoutbutton");
billoutbutton.addEventListener("click", function () {
	document.getElementById("billout").style.display = "none";
});

// for hiding add button

document.getElementById("Add_Customer").addEventListener("click", function () {
	this.style.display = "none";
	document.getElementById("customer_added").innerHTML = "Customer Added";
});

$(document).ready(function () {
	$("#send").on("click", function (e) {
		var obj = { prosum: sum };
		var myJSON = JSON.stringify(obj);
		$.ajax({
			url: "/send",
			type: "post",
			contentType: "application/json",
			dataType: "json",
			data: myJSON,
		}).done(function (result) {
			console.log("completed");
		});
		e.preventDefault();
	});
});
