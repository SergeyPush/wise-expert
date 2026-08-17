import { ICONS, NavIcons } from '@/constants/icons.const';
import { CONTACTS } from '@/constants/contact.const';
import Wrapper from '@/components/Wrapper';
import ScrollReveal from '@/components/ScrollReveal';
import PhoneButton from './PhoneButton';
import SocialCard from './SocialCard';

// Дизайн B: вводный блок слева + сетка соцсетей 2×2 справа
const Contacts = () => {
  return (
    <section
      className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20"
      id="contacts"
    >
      {/* На мобайле карточка во всю ширину экрана (width=w-full),
          с md — обычная ширина Wrapper */}
      <Wrapper width="w-full md:w-11/12">
        <ScrollReveal>
          {/* скругление убрано на мобайле: карточка упирается в края экрана.
              px-4 на мобайле выравнивает контент по краю секций с Wrapper */}
          <div className="rounded-none md:rounded-3xl bg-color-light-gray px-4 py-6 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
              {/* Левая колонка — заголовок, текст, телефон-CTA */}
              <div>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-color-black md:text-4xl">
                  Звʼяжіться з нами будь-яким зручним способом
                </h2>
                <p className="mb-6 mt-3.5 max-w-[400px] text-base leading-relaxed text-color-muted">
                  Телефонуйте або пишіть у месенджери — підкажемо й порахуємо
                  вартість.
                </p>
                <PhoneButton
                  href={CONTACTS.phone}
                  label="Зателефонуйте нам"
                  phone={CONTACTS.phoneDisp}
                  Icon={ICONS.PHONE}
                />
              </div>

              {/* Правая колонка — плитки соцсетей */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {NavIcons.map((item, idx) => (
                  <SocialCard item={item} key={idx} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Wrapper>
    </section>
  );
};

export default Contacts;
