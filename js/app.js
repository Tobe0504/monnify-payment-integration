const form = document.getElementById("paymentForm");
const notification = document.getElementById("notification");
const button = document.querySelector("button");

const submitFormHandler = (e) => {
  button.innerHTML = "Loading...";
  notification.style.diaplay = "none";

  e.preventDefault();

  const fullname = e.target.fullname.value;
  const email = e.target.email.value;
  const description = e.target.description.value;

  if (!fullname || !email || !description) {
    console.log("Please fill the details");
    return;
  }

  MonnifySDK.initialize({
    amount: 100,
    currency: "NGN",
    reference: new String(new Date().getTime()),
    customerFullName: fullname,
    customerEmail: email,
    apiKey: "MK_TEST_YPL1UM2GTT",
    contractCode: "2769206239",
    paymentDescription: description,
    metadata: {
      name: fullname,
      age: 45,
    },

    onComplete: function (response) {
      console.log(response);
      notification.style.display = "block";
      notification.innerHTML = response?.message;
      notification.style.color = "#63ad0e";
      button.innerHTML = "Pay now";
    },
    onClose: function (data) {
      if (data?.responseMessage) {
        console.log(data);
        notification.style.display = "block";
        notification.innerHTML = data?.responseMessage;
        notification.style.color = "#dc362e";
      }

      button.innerHTML = "Pay now";
    },
  });
};

form.addEventListener("submit", submitFormHandler);
