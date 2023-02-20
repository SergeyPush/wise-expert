import React from "react";
import { ILink } from "@/interfaces/link.interface";
import LinkItem from "@/components/Header/LinkItem";

const LINKS: ILink[] = [
  { id: 1, title: "Послуги", link: "" },
  { id: 2, title: "Ціни", link: "" },
  { id: 3, title: "Калькулятор вартості", link: "" },
  { id: 4, title: "Контакти", link: "" },
  { id: 5, title: "FAQ", link: "" },
];

const LinkList = () => {
  return (
    <ul className="lg:flex hidden flex-row gap-4 text-base font-bold ">
      {LINKS.map((item) => (
        <LinkItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default LinkList;
