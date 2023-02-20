import React from 'react';

interface Children {
  children: React.ReactNode;
}
const Wrapper = ({ children }: Children) => {
  return <div className="w-11/12 lg:w-4/5 mx-auto">{children}</div>;
};

export default Wrapper;
