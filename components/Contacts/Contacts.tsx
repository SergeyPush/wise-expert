import { ListIcons } from '@/constants/icons.const';
import Title from '../Title';
import Wrapper from '../Wrapper';
import ContactItem from './ContactItem';
import ScrollReveal from '@/components/ScrollReveal';

const Contacts = () => {
  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20" id="contacts">
      <Wrapper>
        <ScrollReveal>
          <Title text="Як <b>нас</b> знайти?" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="bg-color-white rounded-2xl shadow-soft p-6 md:p-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {ListIcons.map((icon, idx) => (
                <ContactItem item={icon} key={idx} />
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </Wrapper>
    </section>
  );
};

export default Contacts;
