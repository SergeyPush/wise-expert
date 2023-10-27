import { ListIcons } from '@/constants/icons.const';
import Title from '../Title';
import Wrapper from '../Wrapper';
import ContactItem from './ContactItem';

const Contacts = () => {
  return (
    <Wrapper className="pb-10">
      <div id="contacts">
        <Title text="Як <b>нас</b> знайти?" />
        <ul className="md:flex gap-2 justify-around px-4 items-center">
          {ListIcons.map((icon, idx) => (
            <ContactItem item={icon} key={idx} />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Contacts;
