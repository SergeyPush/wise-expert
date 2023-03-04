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
    <div className={'pt-8 pb-10 lg:pt-14 lg:pb-14'}>
      <Wrapper>
        <Title text={clients.title} className={'mb-24'} />
        <ClientsSwiper clients={clients} />
      </Wrapper>
    </div>
  );
};

export default Clients;
