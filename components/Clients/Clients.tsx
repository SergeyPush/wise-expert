import React from 'react';
import Wrapper from '@/components/Wrapper';
import { IClients } from '@/interfaces/clients.interface';
import Title from '@/components/Title';
import ClientsSwiper from '@/components/Clients/ClientsSwiper';

interface ClientsInterface {
  clients: IClients;
}
const Clients = ({ clients }: ClientsInterface) => {
  return (
    <section className={'pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 bg-color-light-gray'} id={'clients'}>
      <Wrapper>
        <Title text={clients.title} />
        <div className="bg-color-white rounded-2xl p-6 md:p-8 shadow-soft">
          <ClientsSwiper clients={clients} />
        </div>
      </Wrapper>
    </section>
  );
};

export default Clients;
