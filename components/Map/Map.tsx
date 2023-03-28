import React from 'react';

const Map = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.572991212966!2d30.598458015943905!3d50.44905389534626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf7accd6ff17%3A0x7a889252cb37bbee!2z0JHRg9GF0LPQsNC70YLQtdGA0YHRjNC60LAg0LrQvtC80L_QsNC90ZbRjyBXaXNFeHBlcnQ!5e0!3m2!1sru!2sua!4v1679848525218!5m2!1sru!2sua"
        width="100%"
        height="500"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
