import { ListIcons } from '@/constants/icons.const';
import Title from '../Title';
import Wrapper from '../Wrapper';
import ContactItem from './ContactItem';

const Contacts = () => {
  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20" id="contacts">
      <Wrapper>
        <Title text="Як <b>нас</b> знайти?" />
        <div className="bg-color-white rounded-2xl shadow-soft p-6 md:p-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {ListIcons.map((icon, idx) => (
              <ContactItem item={icon} key={idx} />
            ))}
          </ul>
        </div>
      </Wrapper>
    </section>
  );
};

export default Contacts;
