/**
 * Люди компании как сущности schema.org.
 *
 * Один и тот же @id используется в трёх местах: в графе организации
 * (`pages/_document.tsx`), в `author` статей блога и в `Person` внутри
 * `reviewedBy`. Совпадение @id — то, из чего поисковики и LLM собирают
 * единую сущность «человек ↔ компания ↔ материалы»; без него автор каждой
 * статьи выглядит новым, никак не связанным с WisExpert человеком.
 */

export const ORGANIZATION_ID = 'https://wisexpert.com.ua/#organization';

export interface TeamMember {
  /** Стабильный @id — менять нельзя, на него ссылаются другие схемы */
  id: string;
  name: string;
  jobTitle: string;
  knowsAbout: string[];
  /**
   * Варианты написания имени в Contentful (там оно «Прізвище Ім'я»).
   * По ним author статьи связывается с этой записью.
   */
  aliases: string[];
}

export const TEAM: TeamMember[] = [
  {
    id: 'https://wisexpert.com.ua/#marina',
    name: 'Марина Пушковська',
    jobTitle: 'CEO, головний бухгалтер',
    knowsAbout: [
      'Бухгалтерський облік',
      'Оподаткування ФОП та ТОВ',
      'Податкова звітність',
      'Дія.City',
    ],
    aliases: ['Пушковська Марина', 'Марина Пушковська'],
  },
  // TODO: добавить остальных бухгалтеров — имя, должность, темы экспертизы.
  // Каждый попадёт в employee организации и сможет быть автором статей.
];

/** Person-узлы для @graph в _document. */
export const teamSchema = () =>
  TEAM.map((member) => ({
    '@type': 'Person',
    '@id': member.id,
    name: member.name,
    jobTitle: member.jobTitle,
    worksFor: { '@id': ORGANIZATION_ID },
    knowsAbout: member.knowsAbout,
    knowsLanguage: ['uk'],
  }));

/**
 * Ищет @id сотрудника по имени автора из Contentful.
 * Возвращает null для внешних авторов — их Person останется без @id.
 */
export const findTeamMemberId = (authorName: string): string | null => {
  const normalized = authorName.trim().toLowerCase();
  const member = TEAM.find((m) =>
    m.aliases.some((alias) => alias.toLowerCase() === normalized),
  );
  return member?.id ?? null;
};
