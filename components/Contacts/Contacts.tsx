import { ListIcons } from '@/constants/icons.const';
import Title from '../Title';
import Wrapper from '../Wrapper';
import ContactItem from './ContactItem';

const Contacts = () => {
  return (
    <Wrapper className="pb-10">
      <div id="contacts">
        <Title text="Як <b>нас</b> знайти?" />
        <ul className="md:flex gap-4 justify-around flex-wrap px-4 lg:text-xl">
          {ListIcons.map((icon, idx) => (
            <ContactItem item={icon} key={idx} />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Contacts;
