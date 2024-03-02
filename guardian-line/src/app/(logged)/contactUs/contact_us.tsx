import React from 'react';

const ContactUsInfo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{marginTop:'120px'}}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-gray-700 mb-8 text-center " style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}}>Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-600">Get in Touch</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input mt-1 block w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input mt-1 block w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
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
            <h2 className="text-2xl font-semibold mb-4 text-zinc-600	">Contact Information</h2>
            <div className="text-gray-700">
              <p className="mb-2 flex items-center"><span className="font-semibold mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg> Address:</span> IIIT Lucknow, Uttar Pradesh, India</p>
              <p className="mb-2 flex items-center"><span className="font-semibold mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg> Phone:</span> +91-88xxxxxxx1</p>
              <p className="mb-2 flex items-center"><span className="font-semibold mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg> Email:</span> help@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsInfo;
