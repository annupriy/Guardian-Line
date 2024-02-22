import React from 'react';

const AboutUsInfo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="flex justify-center text-3xl font-semibold text-gray-800 mb-8">About Us</h1>
        <div className="text-gray-700">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus justo. Donec sed dolor sed libero feugiat aliquam. Sed in sagittis tellus, vel dignissim libero.
          </p>
          <p className="mb-4">
            Morbi pellentesque vestibulum dolor, sit amet consequat magna hendrerit vel. Vestibulum ut mauris a purus aliquet feugiat a non nisi. Suspendisse ullamcorper turpis et ultrices viverra.
          </p>
          <p className="mb-4">
            Nam porttitor, lorem non tempus hendrerit, elit justo finibus sem, nec viverra justo magna et ipsum. Sed vestibulum velit id lectus mattis, sed posuere orci ullamcorper.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfo;
