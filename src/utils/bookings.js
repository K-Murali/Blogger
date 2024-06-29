import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { LiaOpencart } from "react-icons/lia";
import { BASE_URL } from "./api";
const BookTourButton = () => {
  const stripePromise = loadStripe(
    "pk_test_51PV9Cz1H0Uj4HDkb9wx1XZfXZFVgpOybOB5nCDu9Lnu12WCURnN9AwkJOprxkHAoyIOjFv8t6kW3ee3458xXldL800E4U5cmDN"
  );
  const booktour = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      };

      const response = await fetch(
        `${BASE_URL}/api/bookings/checkout-session/${localStorage.getItem(
          "id"
        )}`,
        options
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        throw new Error(`Expected JSON, got ${contentType}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Session data:", data);

      const stripe = await stripePromise;
      window.location.href = `${data.clientSecret.url}`;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <button
      className="  bg-green-500 btn-sm text-md hover:bg-green-400 text-white font-bold  rounded-full"
      onClick={booktour}
    >
      <div className="flex gap-3">
        <LiaOpencart className=" w-5  h-6" />
        Book Tour now
      </div>
    </button>
  );
};

export default BookTourButton;
