// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [text, setText] = useState("");


// function sendEmail(e) {
//     e.preventDefault();
//     emailjs
//         .sendForm(
//             'service_5zy92m9',
//             'template_stso7ey',
//             e.target,
//             'jv4UQP-Dmq_CnX4Ov'
//         )
//         .then(
//             (result) => {
//                 console.log(result.text);
//             },
//             (error) => {
//                 console.log(error.text);
//             }
//         );
//     e.target.reset();
//     alert(
//         "Email send successfully!"
//     );
// }



// function sendEmail() {
//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "sender@email_address.com",
//         Password: "Enter your password",
//         To: 'receiver@email_address.com',
//         From: "sender@email_address.com",
//         Subject: "Sending Email using javascript",
//         Body: "Well that was easy!!",
//     })
//         .then(function (message) {
//             alert("mail sent successfully")
//         });
// }