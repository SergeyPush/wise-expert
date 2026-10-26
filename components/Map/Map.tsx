import React from 'react';
import { LuMapPin } from 'react-icons/lu';
import Wrapper from '@/components/Wrapper';

// Адрес Ужгорода: используется и в подписи, и в запросе карты
const UZHHOROD_ADDRESS = 'вул. Баб’яка, 1Б, Ужгород';

// Офисы компании: слева Киев, справа Ужгород (на мобиле — друг под другом)
const OFFICES = [
  {
    city: 'Київ',
    address: 'вул. Євгена Сверстюка, 11А, Київ',
    embedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.572991212966!2d30.598458015943905!3d50.44905389534626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf7accd6ff17%3A0x7a889252cb37bbee!2z0JHRg9GF0LPQsNC70YLQtdGA0YHRjNC60LAg0LrQvtC80L_QsNC90ZbRjyBXaXNFeHBlcnQ!5e0!3m2!1suk!2sua!4v1679848525218!5m2!1suk!2sua',
  },
  {
    city: 'Ужгород',
    address: UZHHOROD_ADDRESS,
    // Embed по адресу, без API-ключа
    embedSrc:
      'https://maps.google.com/maps?q=' +
      encodeURIComponent(UZHHOROD_ADDRESS) +
      '&z=16&hl=uk&output=embed',
  },
];

const Map = () => {
  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {OFFICES.map(({ city, address, embedSrc }) => (
            <div key={city} className="flex flex-col">
              {/* Шапка карточки: город + адрес */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-color-light-blue text-color-blue">
                  <LuMapPin className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block text-sm font-semibold uppercase tracking-wider text-color-blue mb-1">
                    {city}
                  </span>
                  <p className="text-base font-medium text-color-black leading-snug">
                    {address}
                  </p>
                </div>
              </div>

              {/* Карта; flex-1 выравнивает высоту карт, если адрес в одной колонке длиннее */}
              <div className="flex-1 rounded-2xl overflow-hidden shadow-soft">
                <iframe
                  src={embedSrc}
                  title={`Офіс WisExpert у місті ${city} на Google Картах`}
                  width="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[320px] md:h-[380px] lg:h-[400px]"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Map;
