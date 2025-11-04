function salveaza_numar(event) {
  //here basically i prevented the form from refreshing my page
  event.preventDefault();
  //i start creating the row that needs to be added in my table based on the input data
  const newRow = document.createElement("tr");
  //creating the first cell of the row, which is checkbox for easier deletion of the item
  let checkbox = document.createElement("td");
  let checkbox_data = document.createElement("input");
  checkbox_data.setAttribute("type", "checkbox");
  checkbox_data.className = "selected_item";
  checkbox.appendChild(checkbox_data);
  newRow.appendChild(checkbox);

  //after that i created each cell for each element from the input

  const lastName = document.getElementById("Last_Name").value.trim();
  const firstName = document.getElementById("First_Name").value.trim();
  const phoneNumber = document.getElementById("Phone_Number").value.trim();

  //here i put them in a list for easier looping and append all of the cell to my created row
  const dataValues = [lastName, firstName, phoneNumber];
  for (const value of dataValues) {
    const dataCell = document.createElement("td");
    dataCell.textContent = value;
    newRow.appendChild(dataCell);
  }

  // Bellow I added the logic for storign the values in localstorage
  // here i create an object newPerson, that s gonna be added to my contacts localstorage
  const newPerson = {
    lastName: lastName,
    firstName: firstName,
    phoneNumber: phoneNumber,
  };
  //here i got my contacts from webstorage, like i deserialise it
  const items = JSON.parse(localStorage.getItem("contacts") || "[]");
  // added the newPerson object created
  items.push(newPerson);
  // Reserialised the localstorage for later fetching
  localStorage.setItem("contacts", JSON.stringify(items));
  // here ends the logic for storing the new contact into the list

  //Appending the new created row to my table
  const table_body = document.getElementsByTagName("tbody")[0];
  table_body.appendChild(newRow);

  // Updating the row count
  const total_row_count = table_body.rows.length;
  const footer = document.getElementById("table_footer");
  footer.textContent = "Numbers of persons: " + total_row_count;

  //clear inputs for next contact to be added
  document.getElementById("Last_Name").value = "";
  document.getElementById("First_Name").value = "";
  document.getElementById("Phone_Number").value = "";
}

function delete_person() {
  //loaded the table body to search through and the contact from local storage, to delete from there too if it s the case
  let items = JSON.parse(localStorage.getItem("contacts") || "[]");
  const table_body = document.getElementsByTagName("tbody")[0];
  let total_row_count = table_body.rows.length;

  //here the main reason i counted in reverse was dues to the fact that if i delete an item i can still get to the first one, as if i delete 1 item then the index would be pointing right
  for (let i = total_row_count - 1; i >= 0; i--) {
    const row = table_body.rows[i];
    const get_checkbox = row.cells[0].querySelector('input[type="checkbox"]');
    if (get_checkbox && get_checkbox.checked) {
      //here i extracted the elemtsn to search through the item in lcoal sotray to delete
      const lastName = row.cells[1].textContent;
      const firstName = row.cells[2].textContent;
      const phoneNumber = row.cells[3].textContent;
      items = items.filter((item) => !(item.lastName === lastName && item.firstName === firstName && item.phoneNumber === phoneNumber));
      //and here i remove the remove from row from table
      row.remove();
      //dropping the row_count
      total_row_count--;
    }
  }

  //making sure the list is updated too , like it s reserialised
  localStorage.setItem("contacts", JSON.stringify(items));

  //updating the number of rows from the footer
  const footer = document.getElementById("table_footer");
  footer.textContent = "Numbers of persons: " + total_row_count;
}

/*
object element contact
contact
{
    "lastname":lastname;
    "firstname":firstname;
    "phone_number":phonenumber;
}
*/

function retrieve_data_from_webstorage() {
  // here i read the latest data from localstorage.
  const items = JSON.parse(localStorage.getItem("contacts") || "[]");
  const table_body = document.getElementsByTagName("tbody")[0];
  table_body.innerHTML = ""; //to clear the current table body just to be sure;
  //iterating thorught the saved contacts to show them in table
  for (const elem of items) {
    //i create a new row
    const newRow = document.createElement("tr");

    //the new checkbox
    let checkbox = document.createElement("td");

    let checkbox_data = document.createElement("input");

    checkbox_data.setAttribute("type", "checkbox");

    checkbox_data.className = "selected_item";

    checkbox.appendChild(checkbox_data);

    newRow.appendChild(checkbox);

    //same as before grasping the data from my object but this time based on it creating the cellss
    const dataValues = [elem.lastName, elem.firstName, elem.phoneNumber];
    for (const value of dataValues) {
      const dataCell = document.createElement("td");
      dataCell.textContent = value;
      newRow.appendChild(dataCell);
    }

    //append new row and update row count
    table_body.appendChild(newRow);
    const footer = document.getElementById("table_footer");
    footer.textContent = "Numbers of persons: " + items.length;
  }
}
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("theme_btn");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.textContent = "Light Mode";
  } else {
    btn.textContent = "Dark Mode";
  }
}
//this event listener is used because:
// - i wanted to learn about event listener
// - because i wanted to have fetch the localstorage each time the page refreshes
window.addEventListener("DOMContentLoaded", retrieve_data_from_webstorage);
