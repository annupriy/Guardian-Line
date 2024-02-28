

import React from 'react';

const AboutUsInfo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-800">
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-center text-5xl font-bold mb-8 text-orange-200">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center border border-white rounded-lg p-6">
            <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-orange-200">Our Mission</h2>
              <p className="text-lg mb-4">
                Our mission at Guardian Line is to bridge the gap between those who have information about crimes and law enforcement authorities, all while prioritizing the safety and confidentiality of our users.
              </p>
            </div>
          </div>
          <div className="flex items-center border border-white rounded-lg p-6">
            <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-orange-200">What We Offer</h2>
              <p className="text-lg mb-4">
                Guardian Line offers a user-friendly interface that allows individuals to report crimes without revealing their identity. You can file a report with confidence, knowing that your anonymity is safeguarded.
              </p>
            </div>
          </div>
          <div className="flex items-center border border-white rounded-lg p-6">
            <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-orange-200">Volunteer Program</h2>
              <p className="text-lg mb-4">
                Guardian Line offers a volunteer program to further enhance the accuracy and reliability of the reports received. Join our volunteer network and contribute to ensuring that only genuine reports are forwarded to the appropriate authorities.
              </p>
            </div>
          </div>
          <div className="flex items-center border border-white rounded-lg p-6">
            <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-orange-200">Our Commitment to Privacy</h2>
              <p className="text-lg mb-4">
                At Guardian Line, privacy is paramount. We utilize state-of-the-art encryption and security measures to protect the identity of our users and the confidentiality of their reports.
              </p>
            </div>
          </div>
          <div className="flex items-center border border-white rounded-lg p-6">
            <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-orange-200">Get Involved</h2>
              <p className="text-lg mb-4">
                Whether you're seeking assistance, have information to share, or are interested in volunteering, Guardian Line welcomes your participation. Together, we can make a difference in combating crime and creating a safer environment for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfo;

