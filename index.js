let users = [];

function HELLO() {
  let tablee = "";

  users.forEach((user) => {
    tablee += "<tr>";
    tablee += `<td>${user.name}</td>`;
    tablee += `<td>${user.email}</td>`;
    tablee += `<td>${user.password}</td>`;
    tablee += `<td>${user.dob}</td>`;
    tablee += `<td>${user.terms}</td>`;
    tablee += "</tr>";
  });

  document.getElementById("TableBody").innerHTML = tablee;
}

function calcAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    return age - 1;
  }
  
  return age;
}

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  const age = calcAge(dob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    alert("Invalid email address format.");
    return;
  }

  const user = {
    name,
    email,
    password,
    dob,
    terms: terms ? "true" : "false",
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  HELLO();
  document.getElementById("registrationForm").reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
    HELLO();
  }
});

document.getElementById("registrationForm").addEventListener("submit", handleSubmit);

document.getElementById("clearBtn").addEventListener("click", () => {
  users = [];
  localStorage.removeItem("users");
  HELLO();
});
