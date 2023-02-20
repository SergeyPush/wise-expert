import React, { FC } from "react";
import Header from "@/components/Header/Header";
import { DefaultSeo } from "next-seo";

interface Children {
  children: React.ReactNode;
}

const Layout: FC<Children> = ({ children }) => {
  return (
    <>
      <DefaultSeo
        title={"WisExpert"}
        description={"Amazing WisExpert company"}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
        additionalMetaTags={[
          { name: "Viewport", content: "width=device-width, initial-scale=1" },
        ]}
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;
