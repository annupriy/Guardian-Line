"use client";
import React from "react";
import toast from "react-hot-toast";

const ContactForBanned = () => {
  const handleSupportMail = async (e: any) => {
    e.preventDefault();
    const { userName, pointOfContact, message } = e.target.elements;
    const formData = {
      userName: userName.value,
      pointOfContact: pointOfContact.value,
      message: message.value,
    };
    const response = await toast.promise(
      fetch("/api/supportMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }),
      {
        loading: "Sending...",
        success: "Message sent successfully",
        error: "Error sending message",
      }
    );
    if (response) {
      if (response.status === 200) {
        userName.value = "";
        pointOfContact.value = "";
        message.value = "";
      } else if (response.status === 401) {
        toast.error("Unauthorized");
      }
    } else {
      toast.error("Error sending message");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <h1
          className="text-4xl font-semibold text-gray-700 mb-8 text-center "
          style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
        >
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-zinc-600">
              Get in Touch
            </h2>
            <form onSubmit={handleSupportMail}>
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className="form-input mt-1 block w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your username"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pointOfContact"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Point of Contact
                </label>
                <input
                  type="text"
                  id="pointOfContact"
                  name="pointOfContact"
                  className="form-input mt-1 block w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your Point of Contact"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="form-textarea mt-1 block w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-600	">
              Contact Information
            </h2>
            <div className="text-gray-700">
              <p className="mb-2 flex items-center">
                <span className="font-semibold mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>{" "}
                  Address:
                </span>{" "}
                IIIT Lucknow, Uttar Pradesh, India
              </p>
              <div className="mb-2 flex">
                <span className="font-semibold mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>{" "}
                  Phone:
                </span>{" "}
                <div className="mb-2">
                  <div>+91-9636984353</div>
                  <div>+91-9818126297</div>
                  <div>+91-8847583701</div>
                </div>
              </div>
              <p className="mb-2 flex items-center">
                <span className="font-semibold mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>{" "}
                  Email:
                </span>{" "}
                guardianlineorg@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForBanned;
